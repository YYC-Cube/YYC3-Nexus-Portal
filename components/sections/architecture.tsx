"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Zap,
  Lock,
  ArrowUpRight,
  Brain,
  Clock,
  Box,
  Cpu,
  Activity,
  Link2,
  FileText,
  LayoutGrid,
  Bot,
  BarChart3,
  Workflow,
  Database,
  Wrench,
  Server,
  ChevronDown,
} from "lucide-react"
import { useEffect, useState } from "react"

import { useI18n } from "@/components/i18n-provider"
import { ParallaxSection } from "@/components/lib/effects"

interface DimensionItem {
  icon: React.ElementType
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  tagsKey: string
  gradient: {
    bg: string
    border: string
    text: string
    glow: string
    iconBg: string
  }
}

const DIMENSION_CONFIGS: Record<string, DimensionItem[]> = {
  wugao: [
    {
      icon: Shield,
      titleKey: "architecture.wugao.0.title",
      subtitleKey: "architecture.wugao.0.subtitle",
      descriptionKey: "architecture.wugao.0.description",
      tagsKey: "architecture.wugao.0.tags",
      gradient: {
        bg: "from-emerald-500/10 to-green-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-300",
        glow: "rgba(16,185,129,0.2)",
        iconBg: "bg-emerald-500/20",
      },
    },
    {
      icon: Zap,
      titleKey: "architecture.wugao.1.title",
      subtitleKey: "architecture.wugao.1.subtitle",
      descriptionKey: "architecture.wugao.1.description",
      tagsKey: "architecture.wugao.1.tags",
      gradient: {
        bg: "from-amber-500/10 to-orange-500/10",
        border: "border-amber-500/30",
        text: "text-amber-300",
        glow: "rgba(245,158,11,0.2)",
        iconBg: "bg-amber-500/20",
      },
    },
    {
      icon: Lock,
      titleKey: "architecture.wugao.2.title",
      subtitleKey: "architecture.wugao.2.subtitle",
      descriptionKey: "architecture.wugao.2.description",
      tagsKey: "architecture.wugao.2.tags",
      gradient: {
        bg: "from-rose-500/10 to-red-500/10",
        border: "border-rose-500/30",
        text: "text-rose-300",
        glow: "rgba(244,63,94,0.2)",
        iconBg: "bg-rose-500/20",
      },
    },
    {
      icon: ArrowUpRight,
      titleKey: "architecture.wugao.3.title",
      subtitleKey: "architecture.wugao.3.subtitle",
      descriptionKey: "architecture.wugao.3.description",
      tagsKey: "architecture.wugao.3.tags",
      gradient: {
        bg: "from-sky-500/10 to-blue-500/10",
        border: "border-sky-500/30",
        text: "text-sky-300",
        glow: "rgba(14,165,233,0.2)",
        iconBg: "bg-sky-500/20",
      },
    },
    {
      icon: Brain,
      titleKey: "architecture.wugao.4.title",
      subtitleKey: "architecture.wugao.4.subtitle",
      descriptionKey: "architecture.wugao.4.description",
      tagsKey: "architecture.wugao.4.tags",
      gradient: {
        bg: "from-violet-500/10 to-purple-500/10",
        border: "border-violet-500/30",
        text: "text-violet-300",
        glow: "rgba(139,92,246,0.2)",
        iconBg: "bg-violet-500/20",
      },
    },
  ],
  wubiao: [
    {
      icon: FileText,
      titleKey: "architecture.wubiao.0.title",
      subtitleKey: "architecture.wubiao.0.subtitle",
      descriptionKey: "architecture.wubiao.0.description",
      tagsKey: "architecture.wubiao.0.tags",
      gradient: {
        bg: "from-blue-500/10 to-indigo-500/10",
        border: "border-blue-500/30",
        text: "text-blue-300",
        glow: "rgba(59,130,246,0.2)",
        iconBg: "bg-blue-500/20",
      },
    },
    {
      icon: LayoutGrid,
      titleKey: "architecture.wubiao.1.title",
      subtitleKey: "architecture.wubiao.1.subtitle",
      descriptionKey: "architecture.wubiao.1.description",
      tagsKey: "architecture.wubiao.1.tags",
      gradient: {
        bg: "from-cyan-500/10 to-teal-500/10",
        border: "border-cyan-500/30",
        text: "text-cyan-300",
        glow: "rgba(6,182,212,0.2)",
        iconBg: "bg-cyan-500/20",
      },
    },
    {
      icon: Bot,
      titleKey: "architecture.wubiao.2.title",
      subtitleKey: "architecture.wubiao.2.subtitle",
      descriptionKey: "architecture.wubiao.2.description",
      tagsKey: "architecture.wubiao.2.tags",
      gradient: {
        bg: "from-green-500/10 to-emerald-500/10",
        border: "border-green-500/30",
        text: "text-green-300",
        glow: "rgba(34,197,94,0.2)",
        iconBg: "bg-green-500/20",
      },
    },
    {
      icon: BarChart3,
      titleKey: "architecture.wubiao.3.title",
      subtitleKey: "architecture.wubiao.3.subtitle",
      descriptionKey: "architecture.wubiao.3.description",
      tagsKey: "architecture.wubiao.3.tags",
      gradient: {
        bg: "from-pink-500/10 to-rose-500/10",
        border: "border-pink-500/30",
        text: "text-pink-300",
        glow: "rgba(236,72,153,0.2)",
        iconBg: "bg-pink-500/20",
      },
    },
    {
      icon: Brain,
      titleKey: "architecture.wubiao.4.title",
      subtitleKey: "architecture.wubiao.4.subtitle",
      descriptionKey: "architecture.wubiao.4.description",
      tagsKey: "architecture.wubiao.4.tags",
      gradient: {
        bg: "from-purple-500/10 to-violet-500/10",
        border: "border-purple-500/30",
        text: "text-purple-300",
        glow: "rgba(168,85,247,0.2)",
        iconBg: "bg-purple-500/20",
      },
    },
  ],
  wuhua: [
    {
      icon: Workflow,
      titleKey: "architecture.wuhua.0.title",
      subtitleKey: "architecture.wuhua.0.subtitle",
      descriptionKey: "architecture.wuhua.0.description",
      tagsKey: "architecture.wuhua.0.tags",
      gradient: {
        bg: "from-orange-500/10 to-amber-500/10",
        border: "border-orange-500/30",
        text: "text-orange-300",
        glow: "rgba(249,115,22,0.2)",
        iconBg: "bg-orange-500/20",
      },
    },
    {
      icon: Database,
      titleKey: "architecture.wuhua.1.title",
      subtitleKey: "architecture.wuhua.1.subtitle",
      descriptionKey: "architecture.wuhua.1.description",
      tagsKey: "architecture.wuhua.1.tags",
      gradient: {
        bg: "from-teal-500/10 to-cyan-500/10",
        border: "border-teal-500/30",
        text: "text-teal-300",
        glow: "rgba(20,184,166,0.2)",
        iconBg: "bg-teal-500/20",
      },
    },
    {
      icon: Link2,
      titleKey: "architecture.wuhua.2.title",
      subtitleKey: "architecture.wuhua.2.subtitle",
      descriptionKey: "architecture.wuhua.2.description",
      tagsKey: "architecture.wuhua.2.tags",
      gradient: {
        bg: "from-lime-500/10 to-green-500/10",
        border: "border-lime-500/30",
        text: "text-lime-300",
        glow: "rgba(132,204,22,0.2)",
        iconBg: "bg-lime-500/20",
      },
    },
    {
      icon: Wrench,
      titleKey: "architecture.wuhua.3.title",
      subtitleKey: "architecture.wuhua.3.subtitle",
      descriptionKey: "architecture.wuhua.3.description",
      tagsKey: "architecture.wuhua.3.tags",
      gradient: {
        bg: "from-slate-500/10 to-gray-500/10",
        border: "border-slate-500/30",
        text: "text-slate-300",
        glow: "rgba(100,116,139,0.2)",
        iconBg: "bg-slate-500/20",
      },
    },
    {
      icon: Server,
      titleKey: "architecture.wuhua.4.title",
      subtitleKey: "architecture.wuhua.4.subtitle",
      descriptionKey: "architecture.wuhua.4.description",
      tagsKey: "architecture.wuhua.4.tags",
      gradient: {
        bg: "from-indigo-500/10 to-blue-500/10",
        border: "border-indigo-500/30",
        text: "text-indigo-300",
        glow: "rgba(99,102,241,0.2)",
        iconBg: "bg-indigo-500/20",
      },
    },
  ],
  wuwei: [
    {
      icon: Clock,
      titleKey: "architecture.wuwei.0.title",
      subtitleKey: "architecture.wuwei.0.subtitle",
      descriptionKey: "architecture.wuwei.0.description",
      tagsKey: "architecture.wuwei.0.tags",
      gradient: {
        bg: "from-yellow-500/10 to-amber-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-300",
        glow: "rgba(234,179,8,0.2)",
        iconBg: "bg-yellow-500/20",
      },
    },
    {
      icon: Box,
      titleKey: "architecture.wuwei.1.title",
      subtitleKey: "architecture.wuwei.1.subtitle",
      descriptionKey: "architecture.wuwei.1.description",
      tagsKey: "architecture.wuwei.1.tags",
      gradient: {
        bg: "from-fuchsia-500/10 to-pink-500/10",
        border: "border-fuchsia-500/30",
        text: "text-fuchsia-300",
        glow: "rgba(217,70,239,0.2)",
        iconBg: "bg-fuchsia-500/20",
      },
    },
    {
      icon: Cpu,
      titleKey: "architecture.wuwei.2.title",
      subtitleKey: "architecture.wuwei.2.subtitle",
      descriptionKey: "architecture.wuwei.2.description",
      tagsKey: "architecture.wuwei.2.tags",
      gradient: {
        bg: "from-red-500/10 to-rose-500/10",
        border: "border-red-500/30",
        text: "text-red-300",
        glow: "rgba(239,68,68,0.2)",
        iconBg: "bg-red-500/20",
      },
    },
    {
      icon: Activity,
      titleKey: "architecture.wuwei.3.title",
      subtitleKey: "architecture.wuwei.3.subtitle",
      descriptionKey: "architecture.wuwei.3.description",
      tagsKey: "architecture.wuwei.3.tags",
      gradient: {
        bg: "from-emerald-500/10 to-green-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-300",
        glow: "rgba(16,185,129,0.2)",
        iconBg: "bg-emerald-500/20",
      },
    },
    {
      icon: Link2,
      titleKey: "architecture.wuwei.4.title",
      subtitleKey: "architecture.wuwei.4.subtitle",
      descriptionKey: "architecture.wuwei.4.description",
      tagsKey: "architecture.wuwei.4.tags",
      gradient: {
        bg: "from-violet-500/10 to-purple-500/10",
        border: "border-violet-500/30",
        text: "text-violet-300",
        glow: "rgba(139,92,246,0.2)",
        iconBg: "bg-violet-500/20",
      },
    },
  ],
}

type TabType = "wugao" | "wubiao" | "wuhua" | "wuwei"

function DimensionCard({
  item,
  index,
  t,
  isExpanded,
  onToggle,
}: {
  item: DimensionItem
  index: number
  t: (key: string) => string
  isExpanded: boolean
  onToggle: () => void
}) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      layout
    >
      <motion.div
        className={`relative rounded-2xl border ${item.gradient.border} bg-gradient-to-br ${item.gradient.bg} backdrop-blur-xl overflow-hidden cursor-pointer`}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={onToggle}
      >
        {/* Hover glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at 50% 0%, ${item.gradient.glow}, transparent 70%)`,
          }}
        />

        <div className="relative p-5 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Icon */}
              <motion.div
                className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${item.gradient.iconBg} flex items-center justify-center`}
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${item.gradient.text}`} />
              </motion.div>

              {/* Title */}
              <div>
                <h3 className={`text-base md:text-lg font-semibold ${item.gradient.text}`}>
                  {t(item.titleKey)}
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-0.5">
                  {t(item.subtitleKey)}
                </p>
              </div>
            </div>

            {/* Toggle button */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className={`w-5 h-5 ${isExpanded ? item.gradient.text : "text-white/30"}`} />
            </motion.div>
          </div>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/10">
                  {/* Description */}
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4">
                    {t(item.descriptionKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {t(item.tagsKey)
                      .split("|")
                      .map((tag: string, i: number) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-2.5 py-1 text-[10px] md:text-xs rounded-lg bg-white/[0.05] border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-colors"
                        >
                          {tag}
                        </motion.span>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ArchitectureSection() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<TabType>("wugao")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])

  const tabs: { key: TabType; labelKey: string; descKey: string }[] = [
    { key: "wugao", labelKey: "architecture.tabs.wugao", descKey: "architecture.tabs.wugao.desc" },
    { key: "wubiao", labelKey: "architecture.tabs.wubiao", descKey: "architecture.tabs.wubiao.desc" },
    { key: "wuhua", labelKey: "architecture.tabs.wuhua", descKey: "architecture.tabs.wuhua.desc" },
    { key: "wuwei", labelKey: "architecture.tabs.wuwei", descKey: "architecture.tabs.wuwei.desc" },
  ]

  const currentItems = DIMENSION_CONFIGS[activeTab]

  return (
    <section id="架构" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.1}>
          {/* Title Section */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
              {t("architecture.label")}
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {t("architecture.title")}
            </h2>
            <p className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm md:text-base max-w-3xl mx-auto leading-relaxed px-2">
              {t("architecture.description")}
            </p>
          </motion.div>
        </ParallaxSection>

        {/* Tab Navigation */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setExpandedCard(null)
                }}
                className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "text-white bg-white/10 border border-white/20"
                    : "text-white/40 hover:text-white/60 hover:bg-white/5 border border-transparent"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t(tab.labelKey)}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab description */}
          <motion.p
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white/40 text-xs md:text-sm mt-4 max-w-2xl mx-auto"
          >
            {t(tabs.find((tab) => tab.key === activeTab)?.descKey || "")}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-4 md:gap-6 ${
              isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            }`}
          >
            {currentItems.map((item, index) => (
              <DimensionCard
                key={`${activeTab}-${index}`}
                item={item}
                index={index}
                t={t}
                isExpanded={expandedCard === index}
                onToggle={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {["云原生架构", "Turbopack 构建", "GitOps 流水线", "Edge Computing", "微服务治理"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/40 text-xs hover:text-white/60 hover:border-white/20 transition-all cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}

export { ArchitectureSection }
