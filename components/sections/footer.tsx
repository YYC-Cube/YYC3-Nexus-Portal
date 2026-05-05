"use client"

import { Cloud } from "lucide-react"

import { useI18n } from "@/components/i18n-provider"
import { BRAND } from "@/components/lib/constants"

function Footer() {
  const { t } = useI18n()

  return (
    <footer id="联系" className="relative py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">{BRAND.name}</span>
            </div>
            <p className="text-white/30 text-xs tracking-[0.2em] text-center md:text-left">{t("footer.slogan.cn")}</p>
            <p className="text-white/20 text-xs tracking-wider">{t("footer.vision")}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href={`mailto:${BRAND.email}`} className="text-white/40 hover:text-white/70 text-sm transition-colors">{BRAND.email}</a>
            <div className="text-white/20 text-xs tracking-wider">{t("footer.copyright")}</div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-white/10 text-xs tracking-[0.3em] uppercase">{t("footer.techstack")}</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
