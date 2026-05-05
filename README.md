# YYC³ Nexus Portal

**言渝云枢 · 智能交互门户** — YYC³ AI Family 3D 交互展示门户

[![YYC³ Standard](https://img.shields.io/badge/YYC³-Standard-blue)](https://github.com/YYC-Cube)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.5-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.2.4 | App Router + API Routes |
| React | 19.2.5 | Server/Client Components |
| TypeScript | 6.0.3 | strict mode |
| Tailwind CSS | 4 | 原子化 + 暗黑模式 |
| Spline | 3D | 沉浸式 3D 场景 |
| Framer Motion | 12 | 声明式动画 |
| shadcn/ui | latest | 60+ Radix UI 组件 |
| Vitest | 4.1.5 | 81 tests / 5 files |
| Ollama | Qwen3:32B | 本地 AI 推理 |
| i18n | 自研 | 10 语言 x 79 键 |

## 快速开始

```bash
# 克隆 & 安装
git clone https://github.com/YYC-Cube/YYC3-Nexus-Portal.git
cd YYC3-Nexus-Portal
pnpm install

# 开发
pnpm dev                    # http://localhost:3000

# 质量门禁
pnpm lint                   # ESLint
pnpm exec tsc --noEmit      # TypeScript
pnpm test                   # Vitest (81 tests)
pnpm build                  # webpack 生产构建

# Docker
docker-compose up -d        # http://localhost:3200
```

## 核心功能

- Spline 3D Hero 场景 + Canvas 粒子动画
- 10 语言自研 i18n 翻译体系
- AI Chat Ollama Qwen3:32B SSE 流式对话
- dark/light 双主题系统
- 五高五标五化五维理念交互展示
- 四层架构 评估/转型/规范/架构
- AI Family 8 位智能体矩阵
- 响应式 sm/md/lg + 移动端菜单

## AI Family

| 成员 | 代号 | 角色 |
|------|------|------|
| Meta-Oracle | 元神谕 | 自适应决策引擎 |
| Bolero | 博雷洛 | 个性化推荐引擎 |
| Master | 大师 | 代码质量优化大师 |
| Sentinel | 哨兵 | 全程安全监控 |
| Prophet | 预言 | 趋势预测引擎 |  
| Max-Code | 极代码 | 50+端点 API 后端 |
| chuping | 触屏 | 去界面化 AI 助手 |
| FFFFFFF | 七合工坊 | 4-in-1 Workstation |

## 质量门禁

| 门禁 | 标准 | 状态 |
|------|------|------|
| TypeScript | 0 errors | Pass |
| ESLint | 0 errors | Pass |
| Vitest | 81/81 pass | Pass |
| Build | webpack compiled | Pass |

## 项目结构

```
app/
├── page.tsx              Client Entry
├── layout.tsx            Root Layout
├── globals.css           Tailwind 4 + 主题变量
└── api/chat/route.ts     Ollama SSE API

components/
├── new-yorker-spline.tsx 主页面组装入口 (31行)
├── lib/                  constants + effects
├── layout/               navbar (导航/主题/语言)
├── sections/             hero/philosophy/scenario/architecture/ai-family/footer
├── chat-widget.tsx       AI 聊天
└── ui/                   60+ shadcn/ui

locales/                  10语言 x 79键
__tests__/                81 tests / 5 files
docs/                     项目文档
```

## 文档

| 文档 | 路径 |
|------|------|
| 项目文档架构 | [docs/nexus-portal-docs/](docs/nexus-portal-docs/) |
| 开发者指南 | [docs/DEVELOPER.md](docs/DEVELOPER.md) |
| i18n 集成上下文 | [docs/i18n-integration-context.md](docs/i18n-integration-context.md) |
| 文档注册表 | [docs/document_registry.json](docs/document_registry.json) |

## 开发指南

详见 [DEVELOPER.md](docs/DEVELOPER.md)

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT
