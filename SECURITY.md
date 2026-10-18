# 安全策略

YYC³ Nexus Portal 的安全模型分为**两种运行形态**，二者的能力边界不同，请按实际部署方式对照。

---

## 支持版本

| 版本 | 状态 | 安全更新 |
| ------ | ------ | ---------- |
| `0.2.x` | ✅ 当前支持 | 是 |
| `0.1.x` | ⚠️ 仅严重漏洞 | 有限 |
| `< 0.1.0` | ❌ 不再支持 | 否 |

仅对 `main` 分支的最新提交提供安全修复。

---

## 安全能力矩阵

| 能力 | Standalone / Docker | GitHub Pages（静态导出） |
| ------ | -------------------- | ------------------------ |
| `Content-Security-Policy` | ✅ 响应头（`next.config.ts`） | ⚠️ 仅 HTML `<meta>` 兜底（`app/layout.tsx`） |
| `Strict-Transport-Security` | ✅ `max-age=63072000; includeSubDomains; preload` | ❌ 平台不提供自定义响应头（HTTPS 由 GitHub 强制） |
| `X-Frame-Options` | ✅ `SAMEORIGIN` | ❌ |
| `X-Content-Type-Options` | ✅ `nosniff` | ❌ |
| `Referrer-Policy` | ✅ `origin-when-cross-origin` | ❌ |
| `X-XSS-Protection` | ✅ `1; mode=block` | ❌ |
| `X-DNS-Prefetch-Control` | ✅ `on` | ❌ |
| `frame-ancestors` | ✅ | ❌ meta 形式不支持该指令 |
| `/api/chat` 服务端限流与校验 | ✅ | ❌ 路由不存在（405），前端降级为本地模拟 |
| Service Worker 缓存隔离 | ✅ | ✅ |

> **重要**：GitHub Pages 不支持自定义 HTTP 响应头，这是平台限制，无法通过应用层配置绕过。
> 本项目通过 `<meta http-equiv="Content-Security-Policy">` 提供有限兜底，但该形式不支持
> `frame-ancestors`、`report-uri` 等指令。若需要完整安全头，请使用 Docker / Standalone 部署，
> 或在 Pages 前置反向代理（如 Cloudflare）注入响应头。

---

## CSP 策略

指令集单一源：`lib/csp.ts`（配置与 `<meta>` 兜底共用，避免漂移）。

```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' blob: data: https://prod.spline.design;
connect-src 'self' https://*.spline.design http://localhost:11434 https://va.vercel-scripts.com;
frame-src 'none'; object-src 'none'
```

已知取舍：

- `unsafe-eval` / `unsafe-inline` 为 Spline 3D 运行时与 Next.js 水合所必需，属**受控例外**
- `localhost:11434` 仅用于本地 Ollama，生产环境可进一步收紧
- 未启用 `report-uri` / `report-to`（无集中收集端点）

---

## API 安全（Standalone / Docker）

| 措施 | 实现 |
| ------ | ------ |
| 输入验证 | Zod schema（role / content / model） |
| 速率限制 | 20 req/min/IP，内存级计数 |
| 消息长度 | 单条最大 4000 字符 |
| 历史长度 | 最多 50 条消息 |
| 跨域 | 同源策略，未开放 CORS |
| 密钥 | 仅存于服务端环境变量；前端 Key 仅保存在浏览器本地 |

静态导出模式下 `/api/chat` 不存在，客户端会自动降级为本地模拟响应，不存在服务端攻击面。

---

## 依赖与供应链安全

| 项目 | 状态 |
| ------ | ------ |
| 生产依赖漏洞（`pnpm run audit:prod`） | **0** |
| 全量依赖漏洞（含 dev） | 1 |
| Dependabot 安全更新 | ✅ 已启用 |
| Dependabot 版本更新 | ✅ 每周自动 PR（`.github/dependabot.yml`） |
| Dependency Review | ✅ PR 阻断 high 及以上新引入漏洞 |
| CodeQL 代码扫描 | ✅ `javascript-typescript`（`.github/workflows/codeql.yml`） |
| Secret Scanning | ✅ 已启用（含 Push Protection） |

### 已接受风险

| 依赖 | 漏洞 | 说明 |
|------|------|------|
| `braces <= 3.0.3` | 深层嵌套正则导致栈耗尽（DoS） | 上游**无修补版本**（`patched_versions: null`）；仅存在于开发工具链（ESLint / 构建期），不进入运行时产物。已在 `dependabot.yml` 显式忽略。 |

### 依赖收敛

通过 `pnpm.overrides` 强制升级：`@babel/core`、`browserslist`、`baseline-browser-mapping`、`js-yaml`、`source-map-js`。
`packageManager` 锁定 pnpm `10.34.7`，CI 与本地一致。

---

## 安全漏洞报告

**请勿在公开 Issue 中披露漏洞细节。**

- **邮箱**：`admin@0379.email`
- **主题**：`[Security] YYC3-Nexus-Portal - <漏洞简要描述>`

### 报告内容

1. 漏洞类型（XSS / CSRF / 注入 / SSRF / 信息泄露 / 依赖漏洞 / 其他）
2. 受影响版本与部署形态（Pages / Docker）
3. 影响范围与严重程度（建议附 CVSS 向量）
4. 最小复现步骤
5. 可行的修复建议（可选）

### 响应时限

| 阶段 | 目标 |
| ------ | ------ |
| 确认收到 | 48 小时内 |
| 初步评估与分级 | 5 个工作日内 |
| 修复方案与时间表 | 10 个工作日内 |
| 修复发布 | 按严重程度：Critical ≤ 7 天 / High ≤ 30 天 |
| 公开致谢 | 修复发布后，经报告者同意 |

---

## 安全最佳实践（贡献者）

- 敏感信息一律使用环境变量，不提交到仓库（参考 `.env.example`）
- `.env*` 已加入 `.gitignore`，`.env.example` 例外保留
- 不在文档、日志、截图、提交信息中出现真实 Token / Key
- 新增外部资源域时必须同步更新 `lib/csp.ts`
- 新增依赖前先确认维护状态与漏洞记录
- 遵循最小权限原则：CI 工作流默认 `contents: read`

---

<div align="center">

**YanYuCloudCube** — 言启象限 · 语枢未来

*Words Initiate Quadrants, Language Serves as Core for Future*

<admin@0379.email>

</div>
