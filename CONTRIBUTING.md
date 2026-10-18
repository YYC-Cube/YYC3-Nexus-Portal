# 贡献指南

感谢你对 **YYC³ Nexus Portal** 的关注！本文档说明如何参与贡献。

> 参与本项目即表示你同意遵守 [行为准则](CODE_OF_CONDUCT.md)。
> 发现安全问题请勿公开提 Issue，请按 [安全政策](SECURITY.md) 私下报告。

---

## 开发环境要求

| 工具 | 版本 | 说明 |
| ------ | ------ | ------ |
| Node.js | `>=22 <23` | 见 `package.json#engines` |
| pnpm | `10.x` | `packageManager` 锁定为 `10.34.7`，建议启用 corepack |
| Git | `>= 2.40` | — |
| Ollama | 可选 | 仅在需要真实 AI 推理时安装 |

```bash
corepack enable
git clone https://github.com/YYC-Cube/YYC3-Nexus-Portal.git
cd YYC3-Nexus-Portal
pnpm install
pnpm dev     # http://localhost:3000，冲突自动递增
```

---

## 开发流程

### 1. 分支策略

| 分支 | 用途 |
| ------ | ------ |
| `main` | 生产分支，合并后自动部署 GitHub Pages |
| `develop` | 开发集成分支 |
| `feature/*` | 功能开发 |
| `fix/*` | 缺陷修复 |
| `docs/*` | 文档更新 |

### 2. 提交规范

采用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

type:  feat | fix | refactor | docs | style | test | chore | ci | perf
scope: i18n | ui | api | config | docs | test | ci | deps
```

示例：

```
feat(i18n): add Thai language support
fix(api): resolve SSE stream timeout on slow connections
ci(pages): verify CNAME before artifact upload
```

### 3. 质量门禁

PR 合并前必须全部通过（CI 会逐项校验）：

```bash
pnpm lint                              # ESLint：0 errors
pnpm exec tsc --noEmit                 # TypeScript：0 errors
pnpm test                              # Vitest：167 用例全绿
pnpm run audit:prod                    # 生产依赖：0 漏洞（脚本内置官方源）
pnpm build                             # standalone 构建
BUILD_MODE=export pnpm build           # 静态导出构建（Pages 路径）
```

CI 另外包含：

- **Dependency Review**：PR 引入 high 及以上漏洞将被阻断
- **CodeQL**：JavaScript / TypeScript 静态安全扫描
- **CNAME 守卫**：`out/CNAME` 必须等于 `portal.yyc3.top`

### 4. Pull Request

- 目标分支：`main`
- 标题遵循 Conventional Commits
- 描述包含：变更内容、关联 Issue、验证方式（命令与结果）
- 行为或 UI 变更请附截图
- CI 全绿后再请求 Review

---

## i18n 贡献

翻译文件位于 `locales/`，**权威源为 `locales/zh-CN.ts`（214 键）**。

当前 10 种语言必须与 `zh-CN` 键集**完全一致**，`__tests__/i18n.test.ts` 会强制校验缺键、多键与空值。

**新增键流程**：

1. 在 `locales/zh-CN.ts` 按命名空间追加键值
2. 在其余 9 个语言文件中按**相同顺序**补齐翻译
3. 运行 `pnpm test -- __tests__/i18n.test.ts`

**新增语言**：

1. 新建 `locales/{locale}.ts`，复制 `zh-CN.ts` 全部 214 键并翻译
2. 在 `lib/i18n-client.ts` 的 `SUPPORTED_LOCALES`、`LOCALE_LABELS` 注册
3. 在 `components/i18n-provider.tsx` 的 `detectLocale` 增加检测
4. 在 `__tests__/i18n.test.ts` 的 `allLocales` 中加入该语言
5. 同步 `app/layout.tsx` metadata 与 README 徽章中的语言数量

**翻译约定**：

- 品牌与技术专名保持原文：`YYC³`、`YanYuCloudCube`、`Next.js`、`Spline`、`K8s`、`RBAC/ABAC`、`SLA`、`QPS`、`AI Agent`、`Ollama` 等
- `architecture.*.tags` 使用 `|` 分隔，固定 6 项
- 不得留空值；`ai.api_key_placeholder` 保持 `sk-xxxxxxxxxxxxxxxxxxxxxxxx`

---

## 组件开发

项目使用 shadcn/ui（new-york 风格）+ Radix UI 原语：

- 新增 UI 组件：`npx shadcn@latest add <component>`
- 业务组件放置于 `components/sections/`、`components/layout/` 或 `components/ai-assistant/`
- 复用 `lib/utils.ts` 的 `cn()`，不要重复实现类名合并
- 新增交互需考虑键盘可达性与 `prefers-reduced-motion`

---

## 项目约定

| 项 | 约定 |
| ---- | ------ |
| 注释 | 默认不写；仅当逻辑不自明时添加 |
| 命名 | 变量/函数 camelCase，文件名 kebab-case |
| 端口 | 开发 `3030+`，生产（Docker）`3200` |
| i18n 命名空间 | `nav.*` / `hero.*` / `philosophy.*` / `scenario.*` / `architecture.*` / `ai.*` / `family.*` / `footer.*` / `lang.*` |
| 安全 | 禁止硬编码密钥；配置一律走环境变量（见 `.env.example`） |
| 依赖 | 新增依赖需说明用途；避免引入重复能力 |

---

<div align="center">

**YanYuCloudCube** — 言启象限 · 语枢未来

*Words Initiate Quadrants, Language Serves as Core for Future*

<admin@0379.email>

</div>
