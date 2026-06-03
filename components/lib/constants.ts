"use client"

import {
  Bot,
  Brain,
  Code2,
  Cpu,
  Eye,
  Globe,
  Layers,
  MessageSquare,
  Navigation2,
  Shield,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react"

export const BRAND = {
  name: "YYC³",
  fullName: "YanYuCloudCube",
  sloganEn: "Words Initiate Quadrants, Language Serves as Core for Future",
  email: "admin@0379.email",
  year: "2025-2026",
}

export const SCENARIO_ICONS = [Bot, Brain, Layers, Shield]

export const SCENARIO_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
]

export const AI_FAMILY_MEMBERS = [
  { id: "tianshu", name: "TianShu", nameCn: "元启·天枢", role: "Chief Commander", desc: "全局编排与决策中枢，统筹AI Family协同运作", icon: Brain, gradient: "from-violet-500 to-purple-600", stats: { reasoning: 95, orchestration: 92, decision: 90 } },
  { id: "zhiyun", name: "ZhiYun", nameCn: "智云·守护", role: "Security Officer", desc: "安全审计与纵深防御，守护系统全链路安全", icon: Shield, gradient: "from-amber-500 to-orange-600", stats: { detection: 94, response: 91, compliance: 89 } },
  { id: "gewu", name: "GeWu", nameCn: "格物·宗师", role: "Quality Officer", desc: "代码质量与工程标准，持续提升代码质量与可维护性", icon: Code2, gradient: "from-cyan-500 to-blue-600", stats: { quality: 96, coverage: 90, automation: 85 } },
  { id: "chuangxiang", name: "ChuangXiang", nameCn: "创想·灵韵", role: "Creative Officer", desc: "创意生成与多模态设计，赋能内容创作与视觉设计", icon: Sparkles, gradient: "from-pink-500 to-rose-600", stats: { creativity: 93, generation: 90, design: 88 } },
  { id: "yanqi", name: "YanQi", nameCn: "言启·千行", role: "Navigator", desc: "意图识别与任务路由，精准理解用户需求并分派任务", icon: Navigation2, gradient: "from-indigo-500 to-blue-600", stats: { intent: 92, routing: 90, accuracy: 88 } },
  { id: "yushu", name: "YuShu", nameCn: "语枢·万物", role: "Thinker", desc: "LLM数据洞察与分析，深度挖掘数据价值与业务洞察", icon: MessageSquare, gradient: "from-teal-500 to-cyan-600", stats: { insight: 91, analysis: 89, depth: 86 } },
  { id: "yujian", name: "YuJian", nameCn: "预见·先知", role: "Prophet", desc: "趋势预测与未来洞察，AI驱动的预测分析与前瞻决策", icon: Eye, gradient: "from-emerald-500 to-green-600", stats: { foresight: 92, accuracy: 88, adaptation: 86 } },
  { id: "zhiyu", name: "ZhiYu", nameCn: "知遇·伯乐", role: "Recommender", desc: "个性化推荐引擎，精准匹配用户偏好与内容资源", icon: Star, gradient: "from-fuchsia-500 to-pink-600", stats: { accuracy: 92, match: 88, coverage: 85 } },
]

export const KNOWLEDGE_ASSETS = [
  { label: "AI Skills", value: "120+", icon: Sparkles, desc: "Prompt Skills Library" },
  { label: "API Endpoints", value: "50+", icon: Cpu, desc: "YYC³ API Backend" },
  { label: "MCP Tools", value: "30+", icon: Wrench, desc: "Model Context Protocol" },
  { label: "Languages", value: "10", icon: Globe, desc: "i18n Coverage" },
]
