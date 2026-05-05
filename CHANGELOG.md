# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-05-03

### ✨ 新增

- Next.js 16.2.4 + React 19.2.5 + TypeScript 6.0.3 + Tailwind CSS 4 项目架构
- Spline 3D Hero 场景 + Canvas 粒子动画 + 视差效果 + 打字机文字
- Framer Motion 动画系统（ParallaxSection / AnimatedCounter / ScrollProgress）
- 10语言 i18n 自研纯函数翻译体系（zh-CN/en/zh-TW/ja/ko/fr/de/es/pt-BR/ar × 79键）
- dark/light 双主题系统（CSS 变量 + ThemeProvider + localStorage 持久化）
- AI Chat 集成（Ollama Qwen3:32B + SSE 流式响应 + zod 输入验证）
- 8位 AI Family 成员矩阵展示（Meta-Oracle/Bolero/Master/Sentinel/Prophet/Max-Code/chuping/FFFFFFF）
- 四层架构体系展示（评估层/转型层/规范层/架构层）
- 五高五标五化五维理念展示区
- shadcn/ui 60+ 基础组件库
- Docker standalone 多阶段构建 + docker-compose
- GitHub Actions CI/CD 流水线
- 安全头配置（CSP/HSTS/X-Frame-Options/X-XSS-Protection）
- 响应式设计（sm/md/lg + 移动端菜单）
- 项目文档架构引擎（YYC3-Nexus-Portal.py）+ 46文档/10目录

### 🐛 修复

- 修复 17 个 TypeScript 编译错误（chart.tsx recharts 3.x 类型 / resizable.tsx react-resizable-panels 4.x API / code-demo.tsx 无效 fill prop / i18n-client.ts 缺失模块）
- 修复 ESLint 9.x 配置缺失 → 创建 eslint.config.mjs（typescript-eslint）
- 修复 CI/CD `grep -v` 掩盖编译错误 → 移除错误过滤
- 修复 Turbopack 中文路径 UTF-8 多字节崩溃 → 切换 `next build --webpack`
- 修复 Chat API 无输入验证 → 添加 zod schema（role/content/model 验证）
- 修复 Chat API 无 rate limiting → 添加 20 req/min/IP 内存级限流
- 修复 `yyc3-mana` 目录持续重新生成 → Turbopack panic 残留缓存 + .gitignore

### ♻️ 优化

- 主组件从 680 行拆分为 7 个独立模块 + 28 行组装入口
  - `components/lib/constants.ts` — 数据常量
  - `components/lib/effects.tsx` — 视觉效果组件
  - `components/layout/navbar.tsx` — 导航布局
  - `components/sections/*.tsx` — 6 个页面区段
- 测试从 32 → 81 个（5个测试文件 / i18n+API+components+ratelimit+core）
- package.json 名称从 `my-v0-project` 修正为 `yyc3-nexus-portal`
- 质量评分从 72.5 → 86.8

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>
