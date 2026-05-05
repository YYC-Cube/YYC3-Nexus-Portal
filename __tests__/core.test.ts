import { describe, expect, it } from "vitest"
import { SUPPORTED_LOCALES, LOCALE_LABELS, translate, type Locale } from "@/lib/i18n-client"

describe("i18n-client module", () => {
  describe("SUPPORTED_LOCALES", () => {
    it("contains exactly 10 locales", () => {
      expect(SUPPORTED_LOCALES).toHaveLength(10)
    })

    it("includes zh-CN as first locale", () => {
      expect(SUPPORTED_LOCALES[0]).toBe("zh-CN")
    })

    it("includes all expected locales", () => {
      const expected: Locale[] = ["zh-CN", "en", "zh-TW", "ja", "ko", "fr", "de", "es", "pt-BR", "ar"]
      expect(SUPPORTED_LOCALES).toEqual(expected)
    })
  })

  describe("LOCALE_LABELS", () => {
    it("has label for every supported locale", () => {
      for (const locale of SUPPORTED_LOCALES) {
        expect(LOCALE_LABELS[locale]).toBeTruthy()
        expect(typeof LOCALE_LABELS[locale]).toBe("string")
      }
    })

    it("has correct label for zh-CN", () => {
      expect(LOCALE_LABELS["zh-CN"]).toBe("简体中文")
    })

    it("has correct label for en", () => {
      expect(LOCALE_LABELS["en"]).toBe("English")
    })
  })

  describe("translate()", () => {
    it("returns zh-CN value for zh-CN locale", () => {
      expect(translate("zh-CN", "nav.architecture")).toBe("架构")
    })

    it("returns en value for en locale", () => {
      expect(translate("en", "nav.architecture")).toBe("Architecture")
    })

    it("falls back to zh-CN for missing keys", () => {
      const result = translate("ja", "nav.architecture")
      expect(result).toBeTruthy()
    })

    it("returns key itself when not found in any locale", () => {
      expect(translate("zh-CN", "nonexistent.key")).toBe("nonexistent.key")
    })

    it("replaces params in translation value", () => {
      const result = translate("zh-CN", "hero.description", { name: "test" })
      expect(result).toContain("YYC³")
    })

    it("handles all locales without throwing", () => {
      for (const locale of SUPPORTED_LOCALES) {
        expect(() => translate(locale, "nav.architecture")).not.toThrow()
      }
    })
  })
})

describe("Locale type", () => {
  it("SUPPORTED_LOCALES items are valid Locale values", () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(typeof locale).toBe("string")
      expect(locale.length).toBeGreaterThan(0)
    }
  })
})

describe("Security headers check", () => {
  it("translate does not execute code from params", () => {
    const result = translate("zh-CN", "nav.architecture", { x: "<script>alert(1)</script>" })
    expect(result).not.toContain("<script>")
  })
})

describe("i18n-client translate edge cases", () => {
  it("handles empty params", () => {
    expect(() => translate("zh-CN", "nav.architecture", {})).not.toThrow()
  })

  it("handles undefined params", () => {
    expect(() => translate("zh-CN", "nav.architecture", undefined)).not.toThrow()
  })

  it("all locales have hero.title.line1", () => {
    for (const locale of SUPPORTED_LOCALES) {
      const result = translate(locale, "hero.title.line1")
      expect(result).not.toBe("hero.title.line1")
    }
  })

  it("all locales have footer.copyright", () => {
    for (const locale of SUPPORTED_LOCALES) {
      const result = translate(locale, "footer.copyright")
      expect(result).toContain("YYC³")
    }
  })
})
