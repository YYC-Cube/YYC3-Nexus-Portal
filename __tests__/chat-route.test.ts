// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

import { afterEach, describe, expect, it, vi } from "vitest"
import { POST } from "@/app/api/chat/route"

function makeRequest(body: string): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  })
}

function validBody(): string {
  return JSON.stringify({ messages: [{ role: "user", content: "你好" }] })
}

function ndjsonStream(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk))
      controller.close()
    },
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("Chat API route", () => {
  it("returns 400 for malformed JSON", async () => {
    const response = await POST(makeRequest("not json"))
    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({ error: "Invalid JSON" })
  })

  it("returns 400 for invalid request body", async () => {
    const response = await POST(makeRequest(JSON.stringify({ messages: [] })))
    expect(response.status).toBe(400)
  })

  it("propagates upstream error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("boom", { status: 500 })))
    const response = await POST(makeRequest(validBody()))
    expect(response.status).toBe(500)
  })

  it("returns 504 when upstream times out", async () => {
    const timeout = Object.assign(new Error("timeout"), { name: "TimeoutError" })
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(timeout))
    const response = await POST(makeRequest(validBody()))
    expect(response.status).toBe(504)
  })

  it("reassembles split NDJSON lines and emits exactly one DONE frame", async () => {
    const upstream = ndjsonStream([
      '{"message":{"content":"你"},"done":false}\n',
      '{"message":{"content":"好"},"do',
      'ne":true}\n',
    ])
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(upstream, { status: 200 })))

    const response = await POST(makeRequest(validBody()))
    expect(response.status).toBe(200)
    expect(response.headers.get("Content-Type")).toBe("text/event-stream")

    const text = await response.text()
    expect(text).toContain('data: {"content":"你"}')
    expect(text).toContain('data: {"content":"好"}')
    expect(text.match(/data: \[DONE\]/g)).toHaveLength(1)
  })

  it("emits DONE when upstream closes without a done event", async () => {
    const upstream = ndjsonStream(['{"message":{"content":"未完成"},"done":false}\n'])
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(upstream, { status: 200 })))

    const response = await POST(makeRequest(validBody()))
    const text = await response.text()
    expect(text).toContain('data: {"content":"未完成"}')
    expect(text).toContain("data: [DONE]")
  })
})
