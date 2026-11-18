// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

import { describe, expect, it } from "vitest"
import { cspDirectives, contentSecurityPolicy } from "@/lib/csp"

describe("Content Security Policy", () => {
  it("allows Spline WASM fetched from unpkg", () => {
    const connectSrc = cspDirectives.find((directive) => directive.startsWith("connect-src"))
    expect(connectSrc).toContain("https://unpkg.com")
    expect(connectSrc).toContain("https://*.spline.design")
  })

  it("keeps frame and object sources locked down", () => {
    expect(cspDirectives).toContain("frame-src 'none'")
    expect(cspDirectives).toContain("object-src 'none'")
  })

  it("joins all directives with semicolons", () => {
    expect(contentSecurityPolicy).toBe(cspDirectives.join("; "))
  })
})
