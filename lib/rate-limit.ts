// ============================================================
// YYC³（YanYuCloudCube™ · 注册商标）
// 言启象限 | 语枢未来 · Words Initiate Quadrants, Language Serves as Core for Future
// 万象归元于云枢 | 深栈智启新纪元
// All things converge in cloud pivot; Deep stacks ignite a new era of intelligence
// ============================================================
// Copyright (c) 2026 YanYuCloudCube™（YYC³）| admin@0379.email
// ============================================================

export const RATE_LIMIT_WINDOW = 60_000
export const RATE_LIMIT_MAX = 20

export interface RateLimitEntry {
  count: number
  resetAt: number
}

export function createRateLimiter(
  max: number = RATE_LIMIT_MAX,
  windowMs: number = RATE_LIMIT_WINDOW,
) {
  const map = new Map<string, RateLimitEntry>()

  return {
    check(ip: string, now: number = Date.now()): boolean {
      if (map.size > 10_000) {
        for (const [key, val] of map) {
          if (now > val.resetAt) map.delete(key)
        }
      }
      const entry = map.get(ip)
      if (!entry || now > entry.resetAt) {
        map.set(ip, { count: 1, resetAt: now + windowMs })
        return true
      }
      if (entry.count >= max) return false
      entry.count++
      return true
    },
    reset(ip: string): void {
      map.delete(ip)
    },
    get size(): number {
      return map.size
    },
  }
}

export const chatRateLimiter = createRateLimiter()
