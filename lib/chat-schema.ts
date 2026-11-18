// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

import { z } from "zod"

export const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(4000),
})

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  model: z
    .string()
    .max(128)
    .regex(/^[a-zA-Z0-9_.:-]+$/)
    .default("qwen3:32b"),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
