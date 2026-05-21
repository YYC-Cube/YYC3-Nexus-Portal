<div align="center">

# YYC³ Nexus Portal

**言渝云枢 · 智能交互门户**

*YYC³ AI Family 3D 交互展示门户*

[![YYC³ Standard](https://img.shields.io/badge/YYC³-Standard-blue?style=flat-square)](https://github.com/YYC-Cube)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.5-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square&logo=github&logoColor=white)](https://portal.yyc3.top)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)

🌐 **[portal.yyc3.top](https://portal.yyc3.top)** · 📦 **[v0.2.0](CHANGELOG.md)** · 📖 **[开发文档](docs/DEVELOPER.md)**

</div>

---

## ✦ 项目简介

YYC³ Nexus Portal 是 YanYuCloudCube 团队打造的智能交互门户，以 **「五高五标五化五维」** 核心框架为驱动，融合 3D 沉浸式场景、10 语言国际化、本地 AI 推理对话等前沿技术，构建面向 AI 时代的智能应用展示范式。

**核心理念** — *言启象限，语枢未来。万象归元于云枢，深栈智启新纪元。*

---

## ✦ 技术栈

| 分类 | 技术 | 版本 | 说明 |
|:-----|:-----|:-----|:-----|
| **框架** | Next.js | 16.2.4 | App Router + Static Export + Standalone |
| | React | 19.2.5 | Client Components + Dynamic Import |
| | TypeScript | 6.0.3 | strict mode + bundler resolution |
| **样式** | Tailwind CSS | 4 | 原子化 CSS + CSS Variables 主题 |
| | shadcn/ui | new-york | 60+ Radix UI primitives |
| | Framer Motion | 12 | 声明式动画 + 视差效果 |
| **3D** | Spline | latest | 沉浸式 3D Hero 场景 |
| **AI** | Ollama | Qwen3:32B | 本地推理 + SSE 流式对话 |
| **国际化** | @yyc3/i18n | 自研 | 10 语言 × 79 键纯函数翻译体系 |
| **质量** | Vitest | 4.1.5 | 单元测试 + V8 覆盖率 |
| | ESLint | 9.x | typescript-eslint |
| **部署** | GitHub Pages | Actions | 静态导出 → portal.yyc3.top |
| | Docker | standalone | 多阶段构建 → :3200 |

---

## ✦ 快速开始

```bash
# 克隆仓库
git clone https://github.com/YYC-Cube/YYC3-Nexus-Portal.git
cd YYC3-Nexus-Portal

# 安装依赖 (需要 Node.js >= 22, pnpm)
pnpm install

# 启动开发服务器
pnpm dev                        # → http://localhost:3000
```

<details>
<summary><strong>质量门禁命令</strong></summary>

```bash
pnpm lint                       # ESLint 代码检查
pnpm exec tsc --noEmit          # TypeScript 类型检查
pnpm test                       # Vitest 单元测试
pnpm build                      # webpack 生产构建 (standalone 模式)
BUILD_MODE=export pnpm build    # 静态导出 (GitHub Pages 模式)
```

</details>

---

## ✦ 核心功能

| 功能 | 描述 |
|:-----|:-----|
| 🎨 **Spline 3D Hero** | 沉浸式 3D 场景 + Canvas 粒子动画 + 视差滚动 |
| 🌍 **10 语言 i18n** | 自研纯函数翻译体系，zh-CN 权威源，支持 RTL |
| 🤖 **AI Chat** | Ollama Qwen3:32B 本地推理 + SSE 流式响应 + zod 验证 |
| 🌗 **双主题系统** | dark/light 切换 + CSS Variables + localStorage 持久化 |
| 🏛️ **理念交互** | 五高五标五化五维框架 + 四层架构展示 |
| 👥 **AI Family** | 8 位智能体矩阵可视化展示 |
| 📱 **响应式设计** | sm/md/lg 断点 + 移动端汉堡菜单 |

---

## ✦ AI Family 智能体矩阵

| 成员 | 代号 | 角色 | 能力域 |
|:-----|:-----|:-----|:-------|
| **Meta-Oracle** | 元神谕 | 自适应决策引擎 | 多模态推理 + 策略优化 |
| **Bolero** | 博雷洛 | 个性化推荐引擎 | 用户画像 + 智能匹配 |
| **Master** | 大师 | 代码质量优化大师 | 静态分析 + 重构建议 |
| **Sentinel** | 哨兵 | 全程安全监控 | 威胁检测 + 合规审计 |
| **Prophet** | 预言 | 趋势预测引擎 | 时序分析 + 趋势预判 |
| **Max-Code** | 极代码 | 50+端点 API 后端 | 全栈生成 + 接口编排 |
| **chuping** | 触屏 | 去界面化 AI 助手 | 语音交互 + 无感操控 |
| **FFFFFFF** | 七合工坊 | 4-in-1 Workstation | 多任务聚合 + 流程编排 |

---

## ✦ 项目架构

```
YYC3-Nexus-Portal/
├── app/                        # Next.js App Router
│   ├── page.tsx                # 客户端入口 (I18nProvider + ThemeProvider)
│   ├── layout.tsx              # 根布局 (SEO metadata + Analytics)
│   ├── globals.css             # Tailwind 4 主题变量
│   ├── robots.ts               # SEO robots (portal.yyc3.top)
│   ├── sitemap.ts              # Sitemap (portal.yyc3.top)
│   └── api/chat/route.ts       # Ollama SSE 流式 API
│
├── components/
│   ├── new-yorker-spline.tsx   # 主页面组装入口 (Dynamic Import)
│   ├── i18n-provider.tsx       # i18n React Context + useI18n Hook
│   ├── theme-provider.tsx      # dark/light 主题 Context
│   ├── chat-widget.tsx         # AI 聊天浮窗组件
│   ├── lib/                    # 常量 + 视觉效果
│   ├── layout/                 # 布局组件 (Navbar)
│   ├── sections/               # 页面区段
│   │   ├── hero.tsx            #   Hero 3D 场景
│   │   ├── philosophy.tsx      #   五维理念
│   │   ├── scenario.tsx        #   场景展示
│   │   ├── architecture.tsx    #   四层架构
│   │   ├── ai-family.tsx       #   AI Family + 知识库
│   │   └── footer.tsx          #   页脚
│   └── ui/                     # 60+ shadcn/ui 组件
│
├── locales/                    # 10 语言翻译文件 (zh-CN 权威源)
├── lib/                        # 工具函数 (cn / i18n-client)
├── hooks/                      # 自定义 Hooks
├── __tests__/                  # 单元测试
├── public/                     # 静态资源 (favicon / 图标)
└── docs/                       # 项目文档体系
```

---

## ✦ 部署

| 方式 | 触发/命令 | 环境 | 地址 |
|:-----|:----------|:-----|:-----|
| **GitHub Pages** | push `main` → CI/CD | 静态导出 | [portal.yyc3.top](https://portal.yyc3.top) |
| **Docker** | `docker-compose up -d` | standalone | `http://localhost:3200` |
| **手动导出** | `BUILD_MODE=export pnpm build` | `out/` | 本地静态文件 |

### CI/CD 流水线

```
push/PR ──→ ⚡ Quality Gates
            │  ├─ ESLint (0 errors)
            │  ├─ TypeScript (0 errors)
            │  ├─ Vitest (all pass)
            │  └─ Build (webpack compiled)
            │
            ├── [main] ──→ 🏗️ Build Static ──→ 🚀 Deploy GitHub Pages ──→ portal.yyc3.top
            │
            └── [main] ──→ 🐳 Docker Build (standalone, GHA cache)
```

---

## ✦ 文档体系

| 文档 | 说明 |
|:-----|:-----|
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南 — 分支策略、提交规范、质量门禁 |
| [SECURITY.md](SECURITY.md) | 安全策略 — 安全头、CSP、漏洞报告 |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | 行为准则 — 社区行为规范 |
| [CHANGELOG.md](CHANGELOG.md) | 变更日志 — 版本迭代记录 |
| [docs/DEVELOPER.md](docs/DEVELOPER.md) | 开发者指南 — 详细开发说明 |
| [docs/nexus-portal-docs/](docs/nexus-portal-docs/) | 项目文档架构 — 全链路文档体系 |
| [docs/i18n-integration-context.md](docs/i18n-integration-context.md) | i18n 集成上下文 |
| [docs/document_registry.json](docs/document_registry.json) | 文档注册表 |

---

## ✦ 五维驱动框架

本项目以 **五维评价体系** 驱动 **五高架构** 落地 **五标体系** 实现 **五化转型**：

| 维度 | 架构 | 体系 | 转型 |
|:-----|:-----|:-----|:-----|
| 时间维度 | 高可用 | 标准化 | 流程化 |
| 空间维度 | 高性能 | 规范化 | 数字化 |
| 属性维度 | 高安全 | 自动化 | 工具化 |
| 事件维度 | 高扩展 | 可视化 | 服务化 |
| 关联维度 | 高智能 | 智能化 | 生态化 |

---

## ✦ License

[MIT](LICENSE) © 2025-2026 YYC³ Team

---

<div align="center">

**YanYuCloudCube** — 言启象限 · 语枢未来

*Words Initiate Quadrants, Language Serves as Core for Future*

*万象归元于云枢 | 深栈智启新纪元*

*All things converge in cloud pivot; Deep stacks ignite a new era of intelligence*

</div>
