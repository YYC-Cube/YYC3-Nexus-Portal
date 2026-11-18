---
file: YYC3-线上故障-CSP与SW拦截修复报告.md
title: YYC³ 线上故障分析 — CSP 与 Service Worker 拦截修复
description: 静态站 3D 场景加载失败与 localhost:11434 503 报错的根因、修复与线上验证步骤
author: YYC³ Team <admin@0379.email>
version: v1.0.0
created: 2026-11-18
updated: 2026-11-18
status: published
tags: [线上故障, CSP, Service Worker, Spline, 部署验证]
category: incident
language: zh-CN
audience: developers,managers
complexity: intermediate
project: YYC3-Nexus-Portal
phase: 线上修复
---

# YYC³ 线上故障分析 — CSP 与 Service Worker 拦截修复

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_
> **_Words Initiate Quadrants, Language Serves as Core for Future_**
> _万象归元于云枢 | 深栈智启新纪元_
> **_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

## 📋 文档说明

本报告针对 `https://portal.yyc3.top/` 线上控制台报错进行根因定位与修复记录。历史报告（首次调研报告、终验复核报告）保留其当时的事实快照，本报告反映故障修复后的最新状态。

---

## 一、现象

| 现象 | 来源 |
|---|---|
| `SW registered: https://portal.yyc3.top/` | 正常信息，非故障 |
| `localhost:11434/api/tags:1 Failed to load resource: the server responded with a status of 503 ()` | 静态站请求本地 Ollama 失败 |
| `Fetch API cannot load https://unpkg.com/@splinetool/modelling-wasm@1.12.97/build/process.wasm. Refused to connect because it violates ... connect-src` | CSP 拦截 |
| `Uncaught TypeError: Failed to fetch ... at Fx.start ... at Fx.load` | Spline 3D 场景加载失败 |
| `updating from 114 to 122` | Service Worker 更新日志，非故障 |

---

## 二、根因分析

### 2.1 Spline WASM 被 CSP 拦截（阻断 3D 场景）

- `lib/csp.ts:7` 的 `connect-src` 白名单为 `'self' https://*.spline.design http://localhost:11434 https://va.vercel-scripts.com`，不包含 `https://unpkg.com`。
- Spline runtime `1.12.97` 在运行时从 `https://unpkg.com/@splinetool/modelling-wasm@1.12.97/build/process.wasm` 加载 WASM 模块；该请求属于 `connect-src` 管控范围，被 `app/layout.tsx:109-111` 注入的静态站 meta CSP 拦截，导致 `Fx.load` 抛出 `Failed to fetch`，Hero 3D 场景无法启动。
- `https://*.spline.design` 不匹配 `unpkg.com`，因此原有白名单无法覆盖。

### 2.2 Service Worker 伪造 503（噪音与缓存污染）

- `public/sw.js` 原逻辑仅对 `spline.design` 放行，对 `http://localhost:11434` 因 `url.origin.includes("localhost")` 判断为真而继续进入 `networkFirst` 策略。
- 静态站为 HTTPS，浏览器无法访问 HTTP localhost（或本地无 Ollama 服务），`fetch` 抛错后 `networkFirst` 在 `sw.js:146-152` 返回构造的 `503` JSON 响应。
- 因此 503 并非 Ollama 返回，而是 SW 的离线兜底；同时跨域失败响应可能被写入 DYNAMIC_CACHE，造成缓存污染。

---

## 三、修复措施

| 项 | 文件 | 措施 |
|---|---|---|
| CSP | `lib/csp.ts:7` | `connect-src` 增加 `https://unpkg.com`，允许 Spline WASM 加载 |
| SW 路由 | `public/sw.js:72-74` | 改为 `if (url.origin !== self.location.origin) return`，所有跨域请求（Spline / unpkg / Ollama）绕过 SW 缓存策略，交由浏览器默认网络处理 |
| SW 缓存 | `public/sw.js:1` | `CACHE_VERSION` 由 `yyc3-portal-v3` 升至 `v4`，触发旧缓存清理与 SW 更新 |
| 回归测试 | `__tests__/csp.test.ts`（新增） | 断言 `connect-src` 放行 `https://unpkg.com` 与 `https://*.spline.design`，并锁定 `frame-src 'none'` / `object-src 'none'` |
| 文档同步 | `README.md`、`SECURITY.md`、`CHANGELOG.md`、注册表 | 同步 CSP 指令集、用例数与故障记录 |

---

## 四、验证结果

| 门禁 | 结果 |
|---|---|
| `pnpm lint` | ✅ 0 errors / 74 warnings（既有） |
| `pnpm exec tsc --noEmit` | ✅ exit 0 |
| `pnpm test` | ✅ 9 files / 176 passed（新增 3 条 CSP 回归用例） |
| V8 覆盖率 | statements 38.96% / branches 39.81% / functions 25.19% / lines 44.85% |
| 双模式构建 | ⚠️ 本机受 safe-delete 安全钩子阻断，未绕过；由 CI 复核 |

线上验证需在合并并部署后执行：

1. 硬刷新页面（`Cmd/Ctrl+Shift+R`），确认控制台不再出现 `violates ... connect-src` 或 `Failed to fetch` 的 WASM 报错，3D Hero 正常显示。
2. 等待 Service Worker 更新完成（日志出现新 `CACHE_VERSION` 生效），确认 `localhost:11434/api/tags` 的 503 噪音消失；若本机未运行 Ollama，应仅出现普通网络失败且由客户端降级为空模型列表，不再有 SW 伪造的 503。
3. 检查 `curl -s https://portal.yyc3.top/ | grep -o 'connect-src[^"]*'`，确认 meta CSP 含 `https://unpkg.com`。

---

## 五、风险与后续

- 将 `https://unpkg.com` 加入白名单属于安全边界放宽。后续可将 `process.wasm` 自托管至 `public/` 并改为同源加载，随后从 CSP 中移除该域名（需同步调整 Spline runtime 配置）。
- 静态站无法注入 HSTS/X-Frame-Options 等响应头，属已知平台限制（`SECURITY.md` 有记录）。
- 回滚：恢复 `lib/csp.ts`、`public/sw.js`、`__tests__/csp.test.ts` 至上一版本即可；注意回滚会重新引入本次故障。

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-18 | 定位 CSP 与 SW 双重根因，完成修复、回归测试与线上验证步骤 | YYC³ Team |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
