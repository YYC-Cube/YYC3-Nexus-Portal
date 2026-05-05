"use client"

import { motion } from "framer-motion"

import { useI18n } from "@/components/i18n-provider"
import { ParallaxSection } from "@/components/lib/effects"

function ArchitectureSection() {
  const { t } = useI18n()
  const wuGao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wugao.${i}`))
  const wuBiao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wubiao.${i}`))
  const wuHua = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuhua.${i}`))
  const wuWei = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuwei.${i}`))

  const layers = [
    { titleKey: "architecture.eval.title", subtitleKey: "architecture.eval.subtitle", items: wuWei, color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/20", textColor: "text-amber-400" },
    { titleKey: "architecture.transform.title", subtitleKey: "architecture.transform.subtitle", items: wuHua, color: "from-emerald-500/20 to-green-500/20", border: "border-emerald-500/20", textColor: "text-emerald-400" },
    { titleKey: "architecture.standard.title", subtitleKey: "architecture.standard.subtitle", items: wuBiao, color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20", textColor: "text-cyan-400" },
    { titleKey: "architecture.arch.title", subtitleKey: "architecture.arch.subtitle", items: wuGao, color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/20", textColor: "text-violet-400" },
  ]

  return (
    <section id="架构" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 text-xs tracking-[0.3em] uppercase">{t("architecture.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("architecture.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("architecture.description")}</p>
          </motion.div>
        </ParallaxSection>
        <div className="flex flex-col gap-4">
          {layers.map((layer, index) => (
            <motion.div key={layer.titleKey} initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <motion.div className={`relative p-5 md:p-6 rounded-xl border ${layer.border} bg-gradient-to-r ${layer.color} backdrop-blur-sm`} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className={`text-xs tracking-widest uppercase ${layer.textColor} font-medium`}>{t(layer.titleKey)}</div>
                    <div className="text-white/70 text-sm font-medium mt-0.5">{t(layer.subtitleKey)}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60">{item}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ArchitectureSection }
