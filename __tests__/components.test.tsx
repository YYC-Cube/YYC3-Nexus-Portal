import { describe, expect, it, vi, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import React from "react"

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

Object.defineProperty(window, "matchMedia", {
  value: (query: string) => ({
    matches: query.includes("dark"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

describe("Theme Provider", () => {
  beforeEach(() => {
    localStorageMock.clear()
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.removeAttribute("data-theme")
  })

  it("ThemeProvider renders children", async () => {
    const { ThemeProvider } = await import("@/components/theme-provider")
    const { container } = render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    )
    expect(container.querySelector("[data-testid='child']")).toBeTruthy()
  })

  it("useTheme throws outside ThemeProvider", async () => {
    const { useTheme } = await import("@/components/theme-provider")
    const Console = console
    Console.error = vi.fn()
    expect(() => {
      const Comp = () => {
        useTheme()
        return null
      }
      render(<Comp />)
    }).toThrow("useTheme must be used within ThemeProvider")
  })
})

describe("I18n Provider", () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it("I18nProvider renders children", async () => {
    const { I18nProvider } = await import("@/components/i18n-provider")
    const { container } = render(
      <I18nProvider>
        <div data-testid="child">Hello</div>
      </I18nProvider>
    )
    expect(container.querySelector("[data-testid='child']")).toBeTruthy()
  })

  it("useI18n throws outside I18nProvider", async () => {
    const { useI18n } = await import("@/components/i18n-provider")
    const Console = console
    Console.error = vi.fn()
    expect(() => {
      const Comp = () => {
        useI18n()
        return null
      }
      render(<Comp />)
    }).toThrow("useI18n must be used within I18nProvider")
  })
})

describe("Utils", () => {
  it("cn() merges class names", async () => {
    const { cn } = await import("@/lib/utils")
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("cn() handles conditional classes", async () => {
    const { cn } = await import("@/lib/utils")
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
  })

  it("cn() handles tailwind merge conflicts", async () => {
    const { cn } = await import("@/lib/utils")
    expect(cn("px-4", "px-6")).toBe("px-6")
  })
})

describe("BRAND constants", () => {
  it("site exports are valid", async () => {
    const zhCN = await import("@/locales/zh-CN")
    expect(zhCN.site).toBeDefined()
    expect(Object.keys(zhCN.site).length).toBeGreaterThan(0)
  })

  it("en exports are valid", async () => {
    const en = await import("@/locales/en")
    expect(en.site).toBeDefined()
    expect(Object.keys(en.site).length).toBeGreaterThan(0)
  })
})
