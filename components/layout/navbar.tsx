"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Globe, Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { useI18n } from "@/components/i18n-provider"
import { BRAND } from "@/components/lib/constants"
import { useTheme } from "@/components/theme-provider"

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  if (!mounted) return <div className="w-8 h-8" />
  return (
    <button onClick={toggleTheme} className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300" aria-label="Toggle theme">
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
        {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </button>
  )
}

function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales, localeLabels } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }} className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[160px] z-50">
            {supportedLocales.map((loc) => (
              <button key={loc} onClick={() => { setLocale(loc); setOpen(false) }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${loc === locale ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                {localeLabels[loc]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 z-[100] origin-left" style={{ scaleX }} />
}

function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    { key: "nav.architecture", hash: "架构" },
    { key: "nav.scenarios", hash: "场景" },
    { key: "nav.philosophy", hash: "理念" },
    { key: "nav.contact", hash: "联系" },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 yyc-nav ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/yyc3-dist/yanyu_cloud_128x128.png" alt="YYC³" className="w-full h-full object-contain" />
          </div>
          <span className="text-white font-bold text-base sm:text-lg tracking-tight">{BRAND.name}</span>
          <span className="hidden sm:inline text-white/40 text-[10px] sm:text-xs tracking-widest uppercase ml-1 sm:ml-2">{BRAND.fullName}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.key} href={`#${item.hash}`} className="text-white/60 hover:text-white text-sm transition-colors duration-300 tracking-wide">{t(item.key)}</a>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/80 hover:text-white" aria-label={t("nav.menu")}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.key} href={`#${item.hash}`} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white text-base py-2">{t(item.key)}</a>
              ))}
              <div className="pt-2 border-t border-white/10 flex items-center gap-3"><LanguageSwitcher /><ThemeToggle /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export { Navbar, ScrollProgress }
