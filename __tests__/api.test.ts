import { describe, expect, it } from "vitest"
import { z } from "zod"

const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(4000),
})

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  model: z.string().default("qwen3:32b"),
})

describe("Chat API Validation", () => {
  it("accepts valid chat request", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "Hello" }],
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.model).toBe("qwen3:32b")
      expect(result.data.messages).toHaveLength(1)
    }
  })

  it("accepts with custom model", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "Hello" }],
      model: "llama3:8b",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.model).toBe("llama3:8b")
    }
  })

  it("rejects empty messages array", () => {
    const result = chatRequestSchema.safeParse({
      messages: [],
    })
    expect(result.success).toBe(false)
  })

  it("rejects messages without content", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "" }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects invalid role", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "admin", content: "Hello" }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects content exceeding 4000 chars", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(4001) }],
    })
    expect(result.success).toBe(false)
  })

  it("accepts content at exactly 4000 chars", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: "x".repeat(4000) }],
    })
    expect(result.success).toBe(true)
  })

  it("rejects more than 50 messages", () => {
    const messages = Array.from({ length: 51 }, (_, i) => ({
      role: "user" as const,
      content: `Message ${i}`,
    }))
    const result = chatRequestSchema.safeParse({ messages })
    expect(result.success).toBe(false)
  })

  it("accepts all three valid roles", () => {
    for (const role of ["user", "assistant", "system"] as const) {
      const result = chatRequestSchema.safeParse({
        messages: [{ role, content: "Test" }],
      })
      expect(result.success).toBe(true)
    }
  })

  it("rejects non-string content", () => {
    const result = chatRequestSchema.safeParse({
      messages: [{ role: "user", content: 123 }],
    })
    expect(result.success).toBe(false)
  })

  it("rejects missing messages field", () => {
    const result = chatRequestSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
