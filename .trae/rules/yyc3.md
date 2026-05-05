# YYC³ Nexus Portal
— 言启万象 · 语枢未来

## Project Identity
- **Name**: YYC³ Nexus Portal (言渝云枢 · 智能交互门户)
- **Brand**: YanYuCloudCube — 言启象限 | 语枢未来
- **Framework**: Next.js 16 + React 19 + TypeScript 6 + Tailwind CSS 4
- **i18n Engine**: @yyc3/i18n-core v2.1.0 (self-built, 10 locales)
- **Default Language**: zh-CN (authoritative source)

## Architecture
- `app/page.tsx` — Client entry wrapped with I18nProvider
- `components/new-yorker-spline.tsx` — Main page (Navbar/Hero/Philosophy/Scenario/Architecture/Footer + ParticleField/TypewriterText/ScrollProgress)
- `components/i18n-provider.tsx` — React Context + useI18n hook (mounted guard for SSR hydration)
- `lib/i18n-client.ts` — I18nEngine wrapper (flattenToNested + deepMerge + singleton)
- `locales/*.ts` — 10 language files (63 keys each, zh-CN is authoritative source)

## Key Technical Notes
- I18nEngine DEFAULT_LOCALE is "en", must call setLocale() after construction
- Engine resolveTranslation() uses nested path parsing, flat keys must be converted via flattenToNested()
- registerTranslation() is overwrite-assignment, use deepMerge for combining built-in + site translations
- setLocale() is async, SSR uses fire-and-forget pattern
- Hydration guard: t() uses DEFAULT_LOCALE until mounted=true to prevent SSR/client mismatch

## i18n Key Convention
- nav.* / hero.* / philosophy.* / scenario.* / architecture.* / footer.*
- Adding new keys: zh-CN.ts first → en.ts → regenerate others

## Code Style
- No comments unless explicitly asked
- camelCase for variables/functions, kebab-case for file names
- Consistent with existing patterns in codebase

## Port Convention
- Development: 3000+ (auto-increment)
- YYC³ Production Standard: 3200-3500

## Documentation Standard
- Follow YYC³ 文档引擎模版 v3.0.0 (template_config.yaml)
- All docs include: brand header, 核心理念, metadata frontmatter, brand footer
- Document registry: docs/document_registry.json
