// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

import { chatRequestSchema } from "@/lib/chat-schema"
import { chatRateLimiter } from "@/lib/rate-limit"

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434"

const configuredTimeout = Number(process.env.OLLAMA_TIMEOUT_MS ?? 30_000)
const OLLAMA_TIMEOUT_MS =
  Number.isFinite(configuredTimeout) && configuredTimeout > 0 ? configuredTimeout : 30_000

const TRUST_PROXY_HEADERS = process.env.TRUST_PROXY_HEADERS === "true"

function getClientIp(request: Request): string {
  if (!TRUST_PROXY_HEADERS) return "unknown"
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  if (forwarded) return forwarded
  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request)
  if (!chatRateLimiter.check(clientIp)) {
    return Response.json({ error: "Rate limit exceeded. Max 20 requests per minute." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
  }

  const { messages, model } = parsed.data

  let response: Response
  try {
    response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, stream: true }),
      signal: AbortSignal.timeout(OLLAMA_TIMEOUT_MS),
    })
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "TimeoutError"
    return Response.json(
      { error: isTimeout ? "Ollama request timeout" : "Ollama request failed" },
      { status: isTimeout ? 504 : 502 },
    )
  }

  if (!response.ok) {
    return Response.json({ error: "Ollama request failed" }, { status: response.status })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let doneSent = false
      const send = (text: string) => controller.enqueue(encoder.encode(text))

      const handleLine = (rawLine: string) => {
        const line = rawLine.trim()
        if (!line || doneSent) return
        try {
          const event = JSON.parse(line) as {
            message?: { content?: string }
            done?: boolean
          }
          const content = event.message?.content
          if (content) send(`data: ${JSON.stringify({ content })}\n\n`)
          if (event.done) {
            send("data: [DONE]\n\n")
            doneSent = true
          }
        } catch {
          // 忽略单行解析失败，继续处理后续帧
        }
      }

      try {
        const reader = response.body?.getReader()
        if (!reader) return

        const decoder = new TextDecoder()
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          let newlineIndex = buffer.indexOf("\n")
          while (newlineIndex !== -1) {
            handleLine(buffer.slice(0, newlineIndex))
            buffer = buffer.slice(newlineIndex + 1)
            newlineIndex = buffer.indexOf("\n")
          }
        }
        handleLine(buffer + decoder.decode())
      } catch {
        // 上游中断时向下游发送终止帧，避免客户端无限等待
      } finally {
        if (!doneSent) send("data: [DONE]\n\n")
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
