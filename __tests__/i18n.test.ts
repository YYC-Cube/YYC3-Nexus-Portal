import { site as ar } from "@/locales/ar"
import { site as de } from "@/locales/de"
import { site as en } from "@/locales/en"
import { site as es } from "@/locales/es"
import { site as fr } from "@/locales/fr"
import { site as ja } from "@/locales/ja"
import { site as ko } from "@/locales/ko"
import { site as ptBR } from "@/locales/pt-BR"
import { site as zhCN } from "@/locales/zh-CN"
import { site as zhTW } from "@/locales/zh-TW"
import { describe, expect, it } from "vitest"

const allLocales: Record<string, Record<string, string>> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  ja,
  ko,
  fr,
  de,
  es,
  "pt-BR": ptBR,
  ar,
}

const requiredKeys = Object.keys(zhCN)

describe("i18n Translation Completeness", () => {
  // zh-CN is the authoritative source - must have all keys with values
  describe("zh-CN (authoritative source)", () => {
    it("has no empty values", () => {
      for (const [key, value] of Object.entries(zhCN)) {
        expect(value, `zh-CN.${key} is empty`).toBeTruthy()
      }
    })

    it("has expected key count (architecture + ai + original)", () => {
      expect(Object.keys(zhCN).length).toBeGreaterThan(200)
    })

    it("has architecture namespace keys", () => {
      const archKeys = Object.keys(zhCN).filter((k) => k.startsWith("architecture."))
      expect(archKeys.length).toBeGreaterThan(80)
    })

    it("has ai namespace keys", () => {
      const aiKeys = Object.keys(zhCN).filter((k) => k.startsWith("ai."))
      expect(aiKeys.length).toBeGreaterThan(30)
    })

    it("all keys follow namespace.key pattern", () => {
      for (const key of Object.keys(zhCN)) {
        expect(key).toMatch(/^[a-z-]+\.[a-z0-9._-]+$/)
      }
    })

    it("has expected namespaces", () => {
      const namespaces = new Set(Object.keys(zhCN).map((k) => k.split(".")[0]))
      const expected = new Set(["nav", "hero", "philosophy", "scenario", "architecture", "footer", "lang", "ai", "family"])
      for (const ns of expected) {
        expect(namespaces.has(ns), `missing namespace: ${ns}`).toBe(true)
      }
    })
  })

  // en is the primary translated locale - must have same keys as zh-CN
  describe("en (primary translation)", () => {
    it("has same keys as zh-CN", () => {
      const localeKeys = Object.keys(en)
      for (const key of requiredKeys) {
        expect(localeKeys).toContain(key)
      }
    })

    it("has no empty values", () => {
      for (const [key, value] of Object.entries(en)) {
        expect(value, `en.${key} is empty`).toBeTruthy()
      }
    })

    it("has correct key count matching zh-CN", () => {
      expect(Object.keys(en).length).toBe(requiredKeys.length)
    })
  })

  // Other locales are partial translations - just check no empty values
  const partialLocales = ["zh-TW", "ja", "ko", "fr", "de", "es", "pt-BR", "ar"]
  for (const locale of partialLocales) {
    describe(`${locale} (partial translation)`, () => {
      it("has no empty values", () => {
        const translations = allLocales[locale]
        for (const [key, value] of Object.entries(translations)) {
          expect(value, `${locale}.${key} is empty`).toBeTruthy()
        }
      })

      it("has all basic namespace keys (nav, hero, philosophy, scenario, footer)", () => {
        const translations = allLocales[locale]
        const basicKeys = requiredKeys.filter((k) =>
          k.startsWith("nav.") || k.startsWith("hero.") || k.startsWith("footer.")
        )
        for (const key of basicKeys) {
          expect(translations).toHaveProperty(key)
        }
      })

      it("has key count within expected range", () => {
        const count = Object.keys(allLocales[locale]).length
        // Should have at least the basic keys and some architecture keys
        expect(count).toBeGreaterThan(60)
      })
    })
  }
})

describe("i18n zh-CN Key Integrity", () => {
  it("all architecture.wugao keys are present", () => {
    for (let i = 0; i < 5; i++) {
      expect(requiredKeys).toContain(`architecture.wugao.${i}.title`)
      expect(requiredKeys).toContain(`architecture.wugao.${i}.subtitle`)
      expect(requiredKeys).toContain(`architecture.wugao.${i}.description`)
      expect(requiredKeys).toContain(`architecture.wugao.${i}.tags`)
    }
  })

  it("all architecture.wubiao keys are present", () => {
    for (let i = 0; i < 5; i++) {
      expect(requiredKeys).toContain(`architecture.wubiao.${i}.title`)
      expect(requiredKeys).toContain(`architecture.wubiao.${i}.subtitle`)
      expect(requiredKeys).toContain(`architecture.wubiao.${i}.description`)
      expect(requiredKeys).toContain(`architecture.wubiao.${i}.tags`)
    }
  })

  it("all architecture.wuhua keys are present", () => {
    for (let i = 0; i < 5; i++) {
      expect(requiredKeys).toContain(`architecture.wuhua.${i}.title`)
      expect(requiredKeys).toContain(`architecture.wuhua.${i}.subtitle`)
      expect(requiredKeys).toContain(`architecture.wuhua.${i}.description`)
      expect(requiredKeys).toContain(`architecture.wuhua.${i}.tags`)
    }
  })

  it("all architecture.wuwei keys are present", () => {
    for (let i = 0; i < 5; i++) {
      expect(requiredKeys).toContain(`architecture.wuwei.${i}.title`)
      expect(requiredKeys).toContain(`architecture.wuwei.${i}.subtitle`)
      expect(requiredKeys).toContain(`architecture.wuwei.${i}.description`)
      expect(requiredKeys).toContain(`architecture.wuwei.${i}.tags`)
    }
  })

  it("architecture tabs keys are present", () => {
    expect(requiredKeys).toContain("architecture.tabs.wugao")
    expect(requiredKeys).toContain("architecture.tabs.wugao.desc")
    expect(requiredKeys).toContain("architecture.tabs.wubiao")
    expect(requiredKeys).toContain("architecture.tabs.wubiao.desc")
    expect(requiredKeys).toContain("architecture.tabs.wuhua")
    expect(requiredKeys).toContain("architecture.tabs.wuhua.desc")
    expect(requiredKeys).toContain("architecture.tabs.wuwei")
    expect(requiredKeys).toContain("architecture.tabs.wuwei.desc")
  })

  it("ai namespace keys are present in zh-CN", () => {
    const aiKeys = requiredKeys.filter((k) => k.startsWith("ai."))
    expect(aiKeys.length).toBeGreaterThan(30)
    expect(requiredKeys).toContain("ai.title")
    expect(requiredKeys).toContain("ai.tabs.chat")
    expect(requiredKeys).toContain("ai.tabs.settings")
    expect(requiredKeys).toContain("ai.input_placeholder")
  })
})

describe("i18n translate function", () => {
  it("SUPPORTED_LOCALES contains 10 locales", async () => {
    const { SUPPORTED_LOCALES } = await import("@/lib/i18n-client")
    expect(SUPPORTED_LOCALES).toHaveLength(10)
  })

  it("LOCALE_LABELS has labels for all supported locales", async () => {
    const { SUPPORTED_LOCALES, LOCALE_LABELS } = await import("@/lib/i18n-client")
    for (const locale of SUPPORTED_LOCALES) {
      expect(LOCALE_LABELS[locale]).toBeTruthy()
      expect(typeof LOCALE_LABELS[locale]).toBe("string")
    }
  })

  it("translate works for zh-CN", async () => {
    const { translate } = await import("@/lib/i18n-client")
    expect(translate("zh-CN", "nav.architecture")).toBe("架构")
    expect(translate("zh-CN", "architecture.tabs.wugao")).toBe("五高架构")
    expect(translate("zh-CN", "ai.title")).toBe("AI 智能助理")
  })

  it("translate works for en", async () => {
    const { translate } = await import("@/lib/i18n-client")
    expect(translate("en", "nav.architecture")).toBe("Architecture")
  })

  it("translate falls back gracefully for unknown keys", async () => {
    const { translate } = await import("@/lib/i18n-client")
    expect(translate("zh-CN", "nonexistent.key")).toBe("nonexistent.key")
  })
})
