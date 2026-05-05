import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function createRateLimiter(max: number, windowMs: number) {
  const map = new Map<string, { count: number; resetAt: number }>()
  return {
    check(ip: string): boolean {
      const now = Date.now()
      const entry = map.get(ip)
      if (!entry || now > entry.resetAt) {
        map.set(ip, { count: 1, resetAt: now + windowMs })
        return true
      }
      if (entry.count >= max) return false
      entry.count++
      return true
    },
    reset(ip: string) { map.delete(ip) },
  }
}

describe("Rate Limiter", () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it("allows first request", () => {
    const rl = createRateLimiter(3, 60_000)
    expect(rl.check("1.2.3.4")).toBe(true)
  })

  it("allows up to max requests", () => {
    const rl = createRateLimiter(3, 60_000)
    expect(rl.check("1.2.3.4")).toBe(true)
    expect(rl.check("1.2.3.4")).toBe(true)
    expect(rl.check("1.2.3.4")).toBe(true)
  })

  it("blocks requests exceeding max", () => {
    const rl = createRateLimiter(3, 60_000)
    rl.check("1.2.3.4")
    rl.check("1.2.3.4")
    rl.check("1.2.3.4")
    expect(rl.check("1.2.3.4")).toBe(false)
  })

  it("resets after window expires", () => {
    const rl = createRateLimiter(2, 60_000)
    rl.check("1.2.3.4")
    rl.check("1.2.3.4")
    expect(rl.check("1.2.3.4")).toBe(false)
    vi.advanceTimersByTime(61_000)
    expect(rl.check("1.2.3.4")).toBe(true)
  })

  it("tracks IPs independently", () => {
    const rl = createRateLimiter(1, 60_000)
    expect(rl.check("1.1.1.1")).toBe(true)
    expect(rl.check("2.2.2.2")).toBe(true)
    expect(rl.check("1.1.1.1")).toBe(false)
    expect(rl.check("2.2.2.2")).toBe(false)
  })

  it("reset clears tracking for IP", () => {
    const rl = createRateLimiter(1, 60_000)
    rl.check("1.1.1.1")
    expect(rl.check("1.1.1.1")).toBe(false)
    rl.reset("1.1.1.1")
    expect(rl.check("1.1.1.1")).toBe(true)
  })
})

describe("Constants module", () => {
  it("BRAND has required fields", async () => {
    const { BRAND } = await import("@/components/lib/constants")
    expect(BRAND.name).toBe("YYC³")
    expect(BRAND.fullName).toBe("YanYuCloudCube")
    expect(BRAND.email).toBeTruthy()
  })

  it("SCENARIO_ICONS has 4 entries", async () => {
    const { SCENARIO_ICONS } = await import("@/components/lib/constants")
    expect(SCENARIO_ICONS).toHaveLength(4)
  })

  it("SCENARIO_GRADIENTS has 4 entries", async () => {
    const { SCENARIO_GRADIENTS } = await import("@/components/lib/constants")
    expect(SCENARIO_GRADIENTS).toHaveLength(4)
  })

  it("AI_FAMILY_MEMBERS has 8 entries", async () => {
    const { AI_FAMILY_MEMBERS } = await import("@/components/lib/constants")
    expect(AI_FAMILY_MEMBERS).toHaveLength(8)
    for (const m of AI_FAMILY_MEMBERS) {
      expect(m.id).toBeTruthy()
      expect(m.name).toBeTruthy()
      expect(m.icon).toBeTruthy()
      expect(m.gradient).toBeTruthy()
      expect(m.stats).toBeDefined()
    }
  })

  it("KNOWLEDGE_ASSETS has 4 entries", async () => {
    const { KNOWLEDGE_ASSETS } = await import("@/components/lib/constants")
    expect(KNOWLEDGE_ASSETS).toHaveLength(4)
  })
})
