# YYC³ Nexus Portal
— 言启象限 · 语枢未来

## Project Identity
- **Name**: YYC³ Nexus Portal (言渝云枢 · 智能交互门户)
- **Brand**: YanYuCloudCube — 言启象限 | 语枢未来
- **Framework**: Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4
- **i18n Engine**: 自研纯函数翻译体系 `lib/i18n-client.ts`（10 locales × 214 keys）
- **Default Language**: zh-CN (authoritative source)

## Architecture
- `app/page.tsx` — Client entry wrapped with I18nProvider
- `components/new-yorker-spline.tsx` — Main page (Navbar/Hero/Philosophy/Scenario/Architecture/Footer + ParticleField/TypewriterText/ScrollProgress)
- `components/i18n-provider.tsx` — React Context + useI18n hook (mounted guard for SSR hydration)
- `lib/i18n-client.ts` — 纯函数 translate(locale, key, params)，回退链：目标语言 → zh-CN → key
- `lib/chat-schema.ts` — 生产环境聊天请求 Zod Schema（与测试共用）
- `lib/rate-limit.ts` — 可测试限流器，API 与测试共用同一实现
- `locales/*.ts` — 10 language files (214 keys each, zh-CN is authoritative source)

## Key Technical Notes
- translate() 是纯函数，不得引入副作用或 I/O
- I18nProvider 挂载前使用 zh-CN，防止 SSR 水合不一致
- localStorage key `yyc3-locale` 保存语言选择；仅 ar 切换 document.dir=rtl
- `/api/chat` 使用 `lib/chat-schema.ts` 与 `lib/rate-limit.ts`，测试直接导入生产实现
- `/api/chat` 配置项通过环境变量注入：`OLLAMA_URL`、`OLLAMA_TIMEOUT_MS`、`TRUST_PROXY_HEADERS`

## i18n Key Convention
- nav.* / hero.* / philosophy.* / scenario.* / architecture.* / footer.*
- Adding new keys: zh-CN.ts first → en.ts → 其余语言按 214 键对齐

## Code Style
- No comments unless explicitly asked
- camelCase for variables/functions, kebab-case for file names
- Consistent with existing patterns in codebase

## Port Convention
- Development: 3000 (Next.js default)
- YYC³ Production Standard: 3200-3500

## Documentation Standard
- Follow YYC³ 文档引擎模版 v3.0.0 (template_config.yaml)
- All docs include: brand header, 核心理念, metadata frontmatter, brand footer
- Document registry: docs/document_registry.json
- 验收报告统一存放：docs/YYC3-项目闭环-验收系统/reports/
