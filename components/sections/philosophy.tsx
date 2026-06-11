"use client"

import { BarChart3, Eye, Layers, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { useI18n } from "@/components/i18n-provider"
import { ParallaxSection, AnimatedCounter } from "@/components/lib/effects"

function PhilosophyBar({ items, label, icon: Icon }: { items: string[]; label: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-1">
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item, i) => (
          <motion.span key={item} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="px-3 py-1.5 text-xs tracking-wider rounded-full bg-white/5 border border-white/10 text-white/70">
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function PhilosophySection() {
  const { t } = useI18n()
  const wuGao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wugao.${i}`))
  const wuBiao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wubiao.${i}`))
  const wuHua = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuhua.${i}`))
  const wuWei = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuwei.${i}`))

  return (
    <section id="理念" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <ParallaxSection speed={0.15}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-violet-400 text-xs tracking-[0.3em] uppercase">{t("philosophy.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("philosophy.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("philosophy.description")}</p>
          </motion.div>
        </ParallaxSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <PhilosophyBar items={wuGao} label={t("philosophy.wugao.label")} icon={Zap} />
          <PhilosophyBar items={wuBiao} label={t("philosophy.wubiao.label")} icon={BarChart3} />
          <PhilosophyBar items={wuHua} label={t("philosophy.wuhua.label")} icon={Layers} />
          <PhilosophyBar items={wuWei} label={t("philosophy.wuwei.label")} icon={Eye} />
        </div>
        <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          {(["sla", "qps", "coverage", "members"] as const).map((stat) => (
            <div key={stat} className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                <AnimatedCounter target={stat === "sla" ? 99 : stat === "qps" ? 10000 : stat === "coverage" ? 80 : 8} suffix={t(`philosophy.stat.${stat}.value`).replace(/\d/g, "") || (stat === "sla" ? ".99%" : stat === "qps" ? "+" : stat === "coverage" ? "%+" : "+")} />
              </div>
              <div className="mt-2 text-white/40 text-xs tracking-wider">{t(`philosophy.stat.${stat}`)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { PhilosophySection }
