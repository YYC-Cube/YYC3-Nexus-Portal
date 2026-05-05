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
  Shield,
  Sparkles,
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
  { id: "meta-oracle", name: "Meta-Oracle", nameCn: "元·神谕", role: "Decision Engine", desc: "自适应决策引擎，根据上下文动态调整策略", icon: Brain, gradient: "from-violet-500 to-purple-600", stats: { reasoning: 95, planning: 90, orchestration: 88 } },
  { id: "bolero", name: "Bolero", nameCn: "博·雷洛", role: "Personalization", desc: "个性化推荐引擎，精准匹配用户偏好", icon: Sparkles, gradient: "from-pink-500 to-rose-600", stats: { accuracy: 92, speed: 88, coverage: 85 } },
  { id: "master", name: "Master", nameCn: "大·师", role: "Quality Optimizer", desc: "代码质量优化大师，持续提升工程标准", icon: Code2, gradient: "from-cyan-500 to-blue-600", stats: { quality: 96, coverage: 90, automation: 85 } },
  { id: "sentinel", name: "Sentinel", nameCn: "哨·兵", role: "Security Monitor", desc: "全程安全监控，纵深防御体系守护者", icon: Shield, gradient: "from-amber-500 to-orange-600", stats: { detection: 94, response: 91, compliance: 89 } },
  { id: "prophet", name: "Prophet", nameCn: "预·言", role: "Trend Predictor", desc: "趋势预测引擎，AI驱动的未来洞察", icon: Eye, gradient: "from-emerald-500 to-green-600", stats: { accuracy: 88, foresight: 92, adaptation: 86 } },
  { id: "max-code", name: "Max-代码", nameCn: "极·代码", role: "API Backend", desc: "50+端点API后端，全栈服务基础设施", icon: Cpu, gradient: "from-indigo-500 to-blue-600", stats: { endpoints: 50, uptime: 99, latency: 92 } },
  { id: "chuping", name: "chuping", nameCn: "触·屏", role: "Zero UI Assistant", desc: "去界面化AI助手，手势/语音/3D视觉交互", icon: MessageSquare, gradient: "from-teal-500 to-cyan-600", stats: { multimodal: 90, privacy: 95, immersion: 88 } },
  { id: "fffffff", name: "FFFFFFF", nameCn: "七合工坊", role: "4-in-1 Workstation", desc: "聊天室+协同平台+开发工具+会议中心", icon: Wrench, gradient: "from-fuchsia-500 to-pink-600", stats: { modules: 4, integration: 91, scalability: 87 } },
]

export const KNOWLEDGE_ASSETS = [
  { label: "AI Skills", value: "120+", icon: Sparkles, desc: "Prompt Skills Library" },
  { label: "API Endpoints", value: "50+", icon: Cpu, desc: "Max-代码 Backend" },
  { label: "MCP Tools", value: "30+", icon: Wrench, desc: "Model Context Protocol" },
  { label: "Languages", value: "10", icon: Globe, desc: "i18n Coverage" },
]
