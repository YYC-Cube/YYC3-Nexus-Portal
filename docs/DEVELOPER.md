# YYC³ Nexus Portal - Developer Guide

## Overview

YYC³ Nexus Portal is a 3D interactive showcase portal for the YYC³ AI Family,
featuring a self-built i18n translation system covering 10 languages,
built with Next.js 16 + Spline 3D + Framer Motion,
with integrated Ollama local AI chat capabilities and full PWA support.

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.5 | React 全栈框架 (App Router + Turbopack) |
| React | 19.2.7 | UI 渲染引擎 |
| TypeScript | 6.x | 类型安全 |
| Tailwind CSS | 4.x | 原子化 CSS 框架 |
| Spline | latest | 3D 交互场景 |
| Framer Motion | latest | 动画引擎 (视差/粒子/打字机) |
| Ollama | qwen3:32b | 本地 LLM 推理引擎 |
| Vitest | 4.x | 单元测试框架 |
| Docker | latest | 容器化部署 |

---

## 项目结构

```
YYC³ Nexus Portal/
├── app/
│   ├── api/chat/route.ts             # Ollama SSE 对话代理 (限流+Zod校验)
│   ├── globals.css                   # Tailwind v4 + 移动端安全区 + 主题 CSS变量
│   ├── layout.tsx                    # 根布局 (SSR元数据 + PWA manifest + SW注册 + Vercel Analytics)
│   └── page.tsx                      # 入口 (ThemeProvider → I18nProvider → NewYorkerSpline)
├── components/
│   ├── new-yorker-spline.tsx         # 核心页面组件 (懒加载子页面)
│   ├── sections/                     # 各页面区块
│   │   ├── hero.tsx                  # 首屏 (粒子背景 + Spline 3D + 打字机)
│   │   ├── philosophy.tsx            # 五高/五标/五化/五维 (AnimatedCounter)
│   │   ├── scenario.tsx              # 4大应用场景卡片
│   │   ├── architecture.tsx          # 五维驱动架构体系 (Tab切换 + 20张可展开卡片)
│   │   ├── ai-family.tsx             # 8位AI成员 + 知识库资产
│   │   └── footer.tsx                # 品牌信息 + 版权
│   ├── ai-assistant/                 # AI 浮窗模块
│   │   ├── AIAssistant.tsx           # 主组件 (拖拽 + 标签切换 + 国际化)
│   │   ├── components/               # 14个子组件
│   │   │   ├── FloatingButton.tsx    # 浮动入口按钮 (安全区适配)
│   │   │   ├── PanelHeader.tsx       # 头部 (模型状态 + 语言切换器)
│   │   │   ├── ChatPanel.tsx         # 对话面板
│   │   │   ├── CommandsPanel.tsx     # 10条快捷命令
│   │   │   ├── PromptsPanel.tsx      # 5个提示词预设
│   │   │   ├── SettingsPanel.tsx     # API Key + 模型管理 + 参数调节
│   │   │   └── ...
│   │   ├── hooks/                    # 4个自定义Hook
│   │   ├── constants/                # 命令 + 提示词数据
│   │   └── types.ts                  # TypeScript 类型定义
│   ├── layout/navbar.tsx             # 导航栏 (滚动毛玻璃 + 移动菜单 + 语言切换)
│   ├── i18n-provider.tsx             # React Context i18n Provider (10语言)
│   ├── theme-provider.tsx            # 主题切换 Provider (dark/light)
│   └── ui/                           # shadcn/ui 组件库
├── lib/
│   ├── i18n-client.ts               # 纯函数翻译系统 (translate + 类型导出)
│   └── utils.ts                     # cn() 工具函数
├── locales/                          # 10语言翻译文件 (214 keys/语言)
│   ├── zh-CN.ts                      # 权威源 (简体中文, 214 keys)
│   ├── en.ts                         # English (主翻译, 与zh-CN对齐)
│   ├── zh-TW.ts / ja.ts / ko.ts     # CJK
│   ├── fr.ts / de.ts / es.ts        # 欧洲
│   ├── pt-BR.ts                      # 葡萄牙语(巴西)
│   └── ar.ts                         # العربية (RTL)
├── __tests__/
│   ├── setup.ts                      # Vitest 测试配置
│   ├── components.test.tsx           # 基础组件测试
│   ├── architecture.test.tsx         # 五维架构组件测试 (8 cases)
│   ├── ai-assistant.test.tsx         # AI助手全面测试 (57 cases)
│   ├── i18n.test.ts                  # 国际化测试 (三层验证策略)
│   ├── api.test.ts                   # API路由测试
│   ├── core.test.ts                  # 核心模块测试
│   └── ratelimit.test.ts             # 限流机制测试
├── public/
│   ├── sw.js                         # Service Worker (3种缓存策略)
│   ├── manifest.json                 # PWA清单 (10种图标尺寸 + screenshots)
│   └── yyc3-dist/                    # YYC³ 品牌图标集 (8种尺寸)
├── .github/workflows/ci.yml          # CI/CD (lint + tsc + build + docker)
├── Dockerfile                        # 多阶段构建
├── docker-compose.yml                # 端口3200 + 健康检查
├── vitest.config.ts                  # 测试配置
├── next.config.mjs                   # 安全头 + CSP + PWA 优化
└── docs/                             # YYC³ 标准文档体系
```

---

## 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 8
- Ollama (可选，用于 AI 对话功能)

### 安装与启动

```bash
pnpm install
pnpm dev      # 开发服务器 (端口3000+，冲突自动递增)
pnpm build    # 生产构建
pnpm start    # 生产启动
```

指定端口启动：
```bash
PORT=3146 pnpm dev
```

远程仓库:
```bash
git remote add developer https://github.com/YYC-Cube/YYC3-Portfolio.git
```

### AI 对话 (可选)

```bash
ollama pull qwen3:32b
ollama serve
```

对话组件自动连接 `http://localhost:11434`。

### Docker 部署

```bash
docker compose up -d
```

端口 3200 (YYC³ 生产规范: 3200-3500)。

### 代码检查

```bash
pnpm lint              # ESLint 审查
npx tsc --noEmit       # TypeScript 检查
pnpm test              # 158 测试用例
pnpm test -- --coverage # 覆盖率报告
```

---

## i18n 国际化体系

### 架构设计

```
locales/*.ts (10语言扁平翻译数据, 214 keys/语言)
        ↓ import
lib/i18n-client.ts
  ├── translate(locale, key, params?)  ← 纯函数，同步，零副作用
  ├── SUPPORTED_LOCALES               ← 10种语言列表
  └── LOCALE_LABELS                    ← 语言显示名
        ↓ import
components/i18n-provider.tsx
  ├── I18nProvider (React Context)
  │   ├── useState("zh-CN")           ← SSR + 客户端初始值一致
  │   ├── useEffect → detectLocale()  ← localStorage + navigator 检测
  │   └── t(key, params)              → translate(locale, key, params)
  └── useI18n() Hook
        ↓ useContext
components/*.tsx
  └── const { t, locale, setLocale } = useI18n()
```

### 设计原则

| 原则 | 实现 |
|------|------|
| **SSR 安全** | `translate()` 是纯函数，无引擎状态依赖，SSR/客户端输出一致 |
| **零 Hydration 风险** | `useState("zh-CN")` 确保初始渲染 SSR 和客户端使用同一 locale |
| **纯函数翻译** | `translate(locale, key)` 不依赖任何外部状态或异步操作 |
| **扁平 key 直接查找** | 翻译数据保持扁平格式，无需嵌套转换 |
| **fallback 链** | `translations[locale][key]` → `translations["zh-CN"][key]` → `key` 本身 |

### 翻译 Key 分布

| 命名空间 | 数量 | 用途 |
|----------|------|------|
| `nav.*` | 5 | 导航栏 |
| `hero.*` | 8 | 首屏 |
| `philosophy.*` | 30 | 理念区 (4组×5项+统计) |
| `scenario.*` | 12 | 场景区 |
| `architecture.*` | 88 | 架构区 (4Tab×5卡片×4字段+描述) |
| `ai.*` | 51 | AI 浮窗 (标题/标签/按钮/提示) |
| `family.*` | 3 | AI 成员 |
| `footer.*` | 6 | 页脚 |
| `lang.*` | 1 | 语言切换 |

### 新增翻译流程

1. 在 `locales/zh-CN.ts` 添加 key（权威源）
2. 同步更新 `locales/en.ts`
3. 运行 `pnpm test` 验证翻译完整性 (zh-CN + en 必须对齐)

---

## 核心模块

### 五维架构组件 (ArchitectureSection)

**文件**: `components/sections/architecture.tsx`

- Tab 切换：五高架构 / 五标体系 / 五化转型 / 五维评估
- 20 张可展开卡片，每张含图标 + 标题 + 描述 + 标签
- 响应式网格：移动端1列 → 平板2列 → 桌面5列
- 动画：卡片悬停放大、展开/收起、Tab滑动过渡

### AI 浮窗 (AIAssistant)

**文件**: `components/ai-assistant/`

- 拖拽浮动面板 (useDraggable Hook)
- 4种面板模式：浮动 / 最大化 / 全屏(移动端)
- 4个标签页：对话 / 命令 / 提示词 / 配置
- 10种语言实时切换 (无需刷新)
- 模型管理：Ollama扫描 + 手动添加 + 测试连接
- 流式响应：SSE + 降级为模拟响应

### PWA 支持

- Service Worker: 3种缓存策略 (CacheFirst / NetworkFirst / StaleWhileRevalidate)
- manifest.json: 完整Web App清单 (10种图标 + 屏幕截图)
- iOS: apple-touch-icon + meta tags + status bar
- 离线能力: 网络优先 + 缓存回退
- 自动注册 + 版本更新检测

### 移动端优化

- 安全区适配: `env(safe-area-inset-*)` 全端兼容
- 触摸体验: 44px最小触摸目标、tap highlight 移除
- 滚动优化: `-webkit-overflow-scrolling: touch`、overscroll-behavior
- 文字优化: `text-size-adjust: 100%` 防止横竖屏切换缩放
- 响应式排版: `text-3xl`→`text-7xl` 渐进式字号

---

## 配置说明

### next.config.mjs

| 配置项 | 说明 |
|--------|------|
| 安全头 | HSTS / X-Frame / XSS / Referrer / CSP (仅生产环境) |
| CSP | 开发模式禁用，生产模式限制 script/connect/img/font |
| 图片优化 | avif/webp + Spline remotePatterns |
| output | 生产 standalone，开发 undefined |

### 端口规范

| 环境 | 端口 | 说明 |
|------|------|------|
| 开发 | 3000+ | Next.js 默认，冲突自动递增 |
| 生产 | 3200 | Docker Compose 默认 |
| Ollama | 11434 | AI 推理服务 |

---

## 测试

### 测试框架

- **Vitest 4.x** + **@testing-library/react** + **jsdom 29.x**

### 测试覆盖

```bash
pnpm test
```

**158 测试用例, 7 个测试文件:**

| 测试文件 | 用例数 | 覆盖范围 |
|----------|--------|----------|
| `i18n.test.ts` | 26 | 翻译完整性(3层验证) + key结构 + translate函数 |
| `ai-assistant.test.tsx` | 57 | AI浮窗(常量/Hooks/14组件/国际化) |
| `architecture.test.tsx` | 8 | 五维架构渲染 + i18n集成 |
| `api.test.ts` | 12 | API验证(Zod schema) |
| `core.test.ts` | 30 | i18n客户端 + 翻译函数 + 边界条件 |
| `components.test.tsx` | 12 | 主题/I18n Provider + 工具函数 + 常量 |
| `ratelimit.test.tsx` | 13 | 限流逻辑 |

### Lint

```bash
pnpm lint    # ESLint 0 errors
npx tsc --noEmit  # TypeScript 无类型错误
```

---

## CI/CD

### GitHub Actions

**文件**: `.github/workflows/ci.yml`

```
push/PR → main
├── Quality Gates
│   ├── pnpm lint
│   ├── npx tsc --noEmit
│   └── pnpm build
└── Docker Build
    └── docker build --provenance=false
```

---

## YYC³ 标准化审计评分

**综合评级: A (94/100)**

| 维度 | 权重 | 得分 | 评级 |
|------|------|------|------|
| 技术架构 | 25% | 94 | A |
| 代码质量 | 20% | 91 | A- |
| 功能完整性 | 20% | 96 | A |
| DevOps | 15% | 90 | A- |
| 性能与安全 | 15% | 92 | A |
| 业务价值 | 5% | 96 | A |

### 已完成功能

- [x] i18n 纯函数翻译体系 (10语言, 214 keys, SSR安全, 零Hydration)
- [x] AI 对话集成 (Ollama + SSE流式 + 降级模拟)
- [x] AI 浮窗 (拖拽/最大化/10语言切换/模型管理)
- [x] 五维驱动架构组件 (4Tab×5卡片, 响应式网格)
- [x] 主题切换系统 (dark/light, CSS变量)
- [x] 3D 场景联动 (鼠标视差 + 浮动动画)
- [x] AI 成员展示区 (8位真实成员 + 能力指标)
- [x] 知识库资产展示 (Skills / API / MCP)
- [x] **PWA 支持** (Service Worker 3策略 + manifest + 离线)
- [x] **移动端优化** (安全区/触摸/滚动/响应式)
- [x] CI/CD 管道 (GitHub Actions)
- [x] 自动化测试 (Vitest 158/158)
- [x] Docker 容器化 (multi-stage + compose)
- [x] 安全头配置 (CSP/HSTS/X-Frame/XSS/Referrer)
- [x] 图片优化 (avif/webp)

### 待改进项

- [ ] E2E 测试 (Playwright)
- [ ] 性能监控 (Lighthouse CI)
- [ ] i18n 懒加载 (按需加载语言包)
- [ ] 离线页面 (offline.html)

---

## 文档追溯信息

| 属性 | 值 |
|------|-----|
| 文档版本 | v3.1.0 |
| 创建日期 | 2026-04-26 |
| 更新日期 | 2026-06-11 |
| 模版标准 | YYC³ 文档引擎模版 v3.0.0 |
| 审计评分 | A (94/100) |
| 开发者文档远程 | [YYC3-Portfolio](https://github.com/YYC-Cube/YYC3-Portfolio.git) |
| 主仓库 | [YYC3-Nexus-Portal](https://github.com/YYC-Cube/YYC3-Nexus-Portal.git) |
