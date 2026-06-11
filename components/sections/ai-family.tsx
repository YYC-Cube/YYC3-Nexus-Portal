"use client"

import { motion } from "framer-motion"

import { useI18n } from "@/components/i18n-provider"
import { AI_FAMILY_MEMBERS, KNOWLEDGE_ASSETS } from "@/components/lib/constants"
import { ParallaxSection } from "@/components/lib/effects"

function AIFamilySection() {
  const { t } = useI18n()

  return (
    <section id="ai-family" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-fuchsia-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase">{t("family.label")}</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">{t("family.title")}</h2>
            <p className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("family.description")}</p>
          </motion.div>
        </ParallaxSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {AI_FAMILY_MEMBERS.map((member, index) => {
            const Icon = member.icon
            return (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                <motion.div className="group relative h-full p-5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden cursor-pointer yyc-card" whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.15)" }} transition={{ duration: 0.25 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${member.gradient}`}>
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm leading-tight">{member.name}</div>
                      <div className="text-white/30 text-xs">{member.nameCn}</div>
                    </div>
                  </div>
                  <div className="text-white/30 text-[10px] tracking-widest uppercase mb-2">{member.role}</div>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{member.desc}</p>
                  <div className="space-y-1.5">
                    {Object.entries(member.stats).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-white/30 text-[10px] w-16 capitalize">{key}</span>
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div className={`h-full bg-gradient-to-r ${member.gradient} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${val}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + index * 0.06 }} />
                        </div>
                        <span className="text-white/40 text-[10px] w-7 text-right">{val}</span>
                      </div>
                    ))}
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

function KnowledgeSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden yyc-section">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {KNOWLEDGE_ASSETS.map((asset, index) => {
            const Icon = asset.icon
            return (
              <motion.div key={asset.label} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] yyc-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <Icon className="w-6 h-6 text-white/30 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{asset.value}</div>
                <div className="mt-1 text-white/60 text-sm font-medium">{asset.label}</div>
                <div className="mt-0.5 text-white/25 text-xs">{asset.desc}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { AIFamilySection, KnowledgeSection }
