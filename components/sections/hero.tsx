"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Eye } from "lucide-react"
import { lazy, Suspense, useEffect } from "react"

import { useI18n } from "@/components/i18n-provider"
import { BRAND } from "@/components/lib/constants"
import { ParticleField, TypewriterText } from "@/components/lib/effects"

const SplineScene = lazy(() =>
  import("@/components/ui/splite").then((m) => ({ default: m.SplineScene }))
)

function HeroSection() {
  const { t } = useI18n()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const bgX = useTransform(springX, [0, 1920], [-20, 20])
  const bgY = useTransform(springY, [0, 1080], [-20, 20])

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ParticleField />
      <motion.div className="absolute inset-0 grid-background opacity-20" style={{ x: bgX, y: bgY }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-[1]" />
      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-xs tracking-widest uppercase">{t("hero.badge")}</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-white">{t("hero.title.line1")}</span><br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t("hero.title.line2")}</span>
            </h1>
            <p className="mt-6 text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-light">
              <TypewriterText text={BRAND.sloganEn} delay={800} speed={30} />
            </p>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">{t("hero.description")}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.a href="#场景" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <span className="relative z-10">{t("hero.cta.explore")}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a href="#架构" className="inline-flex items-center gap-2 text-white/60 hover:text-white px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-sm tracking-wide transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Eye className="w-4 h-4" />
                <span>{t("hero.cta.architecture")}</span>
              </motion.a>
            </div>
          </motion.div>
          <motion.div className="flex-1 w-full max-w-xl lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px] relative" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
            <motion.div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5" style={{ rotateX: bgY, rotateY: bgX }} animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Suspense fallback={<div className="w-full h-full bg-black/50 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" /></div>}>
                <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
              </Suspense>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  )
}

export { HeroSection }
