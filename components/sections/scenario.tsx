"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { useI18n } from "@/components/i18n-provider"
import { SCENARIO_ICONS, SCENARIO_GRADIENTS } from "@/components/lib/constants"
import { ParallaxSection } from "@/components/lib/effects"

function ScenarioSection() {
  const { t } = useI18n()

  return (
    <section id="场景" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase">{t("scenario.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("scenario.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("scenario.description")}</p>
          </motion.div>
        </ParallaxSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((index) => {
            const Icon = SCENARIO_ICONS[index]
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <motion.div className="group relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden cursor-pointer" whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.15)" }} transition={{ duration: 0.3 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${SCENARIO_GRADIENTS[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${SCENARIO_GRADIENTS[index]} mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{t(`scenario.${index}.title`)}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t(`scenario.${index}.desc`)}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/30 group-hover:text-white/60 transition-colors text-xs">
                    <span>{t("scenario.learn_more")}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { ScenarioSection }
