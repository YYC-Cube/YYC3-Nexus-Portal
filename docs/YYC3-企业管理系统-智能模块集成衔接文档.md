---
@file: YYC³ 企业管理系统 - 智能模块集成衔接文档
@description: smart-* 模块全量清单、架构设计、部署指南、模块映射
@author: YYC³团队
@version: 1.0.0
@created: 2026-05-01
@updated: 2026-05-01
@status: published
@tags: 架构,部署,模块清单,衔接文档
---

# YYC³ 企业管理系统 — 智能模块集成衔接文档

## 一、总览

| 指标 | 数值 |
|------|------|
| 新增代码文件 | 20个 |
| 新增代码行数 | 3,498行 |
| 业务页面 | 13个 smart-* 页面 |
| API/引擎层 | 5个模块 |
| React Hook | 2个 |
| 覆盖企业管理模块 | 30/57 (53%) |
| 开发服务器 | http://localhost:3223 |

---

## 二、架构分层

```
┌─────────────────────────────────────────────────────────┐
│                    页面层 (13 pages)                      │
│  smart-sales · smart-hr · smart-payroll · smart-data     │
│  smart-attendance · smart-contract · smart-approval      │
│  smart-performance · smart-project · smart-finance       │
│  smart-docs · smart-analytics · smart-decision           │
├─────────────────────────────────────────────────────────┤
│                    Hook层 (2 hooks)                       │
│  use-crm-data · use-hr-data                              │
├─────────────────────────────────────────────────────────┤
│                  API/引擎层 (5 modules)                   │
│  crm-api (GraphQL) · hr-api (REST) · nocodb-api (REST)  │
│  form-engine (JSON Schema) · ai-family (7 Agents)       │
├─────────────────────────────────────────────────────────┤
│                    后端服务 (3 services)                   │
│  Twenty CRM :3210 · HR API :3220 · NocoDB :3230         │
├─────────────────────────────────────────────────────────┤
│                    AI引擎层                               │
│  DeepSeek-V3 · 7智能体 · 流失预警 · AI预审 · 智能推荐    │
└─────────────────────────────────────────────────────────┘
```

---

## 三、模块全量清单

### 3.1 API/引擎层

| 文件 | 行数 | 对接系统 | 协议 |
|------|------|---------|------|
| `lib/crm-api.ts` | 107 | Twenty CRM | GraphQL |
| `lib/hr-api.ts` | 188 | HR管理系统 | REST |
| `lib/nocodb-api.ts` | 158 | NocoDB | REST v2 |
| `lib/form-engine.ts` | 193 | JSON Schema表单引擎 | 内置 |
| `lib/ai-family.ts` | 166 | AI Family 7智能体 | REST |

### 3.2 Hook层

| 文件 | 行数 | 用途 |
|------|------|------|
| `hooks/use-crm-data.ts` | 34 | CRM数据并行加载 |
| `hooks/use-hr-data.ts` | 49 | HR数据并行加载 |

### 3.3 页面层

| 路径 | 页面名 | 行数 | 分类 | 核心功能 |
|------|--------|------|------|---------|
| `/smart-sales` | 智能销售看板 | 210 | 核心业务 | 6阶段管道·加权预测·CRM集成 |
| `/smart-contract` | 合同管理 | 198 | 核心业务 | 全生命周期·AI审核·到期预警 |
| `/smart-project` | 智能项目管理 | 198 | 核心业务 | 进度追踪·预算管控·风险预警 |
| `/smart-hr` | 智能人事管理 | 309 | 职能人事 | 全生命周期·AI画像·流失预警·员工关怀 |
| `/smart-payroll` | 智能薪酬管理 | 161 | 职能人事 | 自动算薪·工资条·状态追踪 |
| `/smart-attendance` | 智能考勤管理 | 157 | 职能人事 | 打卡·异常检测·工时统计 |
| `/smart-performance` | 智能绩效管理 | 172 | 职能人事 | 360°评估·SABCD评级·SVG环形图 |
| `/smart-finance` | 智能财务管理 | 239 | 财务资产 | 收支明细·预算管理·三Tab切换 |
| `/smart-data` | 数据管理中台 | 207 | 办公协同 | NocoDB集成·Grid/List双视图 |
| `/smart-approval` | 智能审批 | 178 | 办公协同 | AI预审·智能路由·表单引擎 |
| `/smart-docs` | 智能文档协同 | 217 | 办公协同 | 在线协作·版本管理·分类检索 |
| `/smart-decision` | AI决策中心 | 196 | AI赋能 | 7智能体·洞察流·置信度可视化 |
| `/smart-analytics` | 数据分析看板 | 161 | AI赋能 | AI洞察·部门效能·实时动态 |

---

## 四、企业管理系统57模块覆盖映射

### 核心业务(6/13)
| 模块 | 页面 | 状态 |
|------|------|------|
| 客户管理 | smart-sales | ✅ |
| 智能销售 | smart-sales | ✅ |
| 线索管理 | smart-sales | ✅ |
| 合同管理 | smart-contract | ✅ |
| 项目管理 | smart-project | ✅ |
| 智能履约 | smart-sales | ✅ |
| 订单管理 | — | ⬜ |
| 智能采购 | — | ⬜ |
| 库存管理 | — | ⬜ |
| 智能生产 | — | ⬜ |
| 工单管理 | — | ⬜ |
| 智能获客 | — | ⬜ |
| 智能风控 | — | ⬜ |

### 职能人事(7/12)
| 模块 | 页面 | 状态 |
|------|------|------|
| 人事管理 | smart-hr | ✅ |
| 员工管理 | smart-hr | ✅ |
| 薪酬管理 | smart-payroll | ✅ |
| 绩效管理 | smart-performance | ✅ |
| 考勤管理 | smart-attendance | ✅ |
| 智能绩效 | smart-performance | ✅ |
| 智能考勤 | smart-attendance | ✅ |
| 智能招聘 | — | ⬜ |
| 智能培训 | — | ⬜ |
| 商务管理 | — | ⬜ |
| 人才画像 | smart-hr(AI) | ✅ |
| 智能排班 | — | ⬜ |

### 财务资产(1/10)
| 模块 | 页面 | 状态 |
|------|------|------|
| 财务管理 | smart-finance | ✅ |
| 智能预算 | — | ⬜ |
| 智能报销 | smart-approval | ✅ |
| 资产管理 | — | ⬜ |
| 设备管理 | — | ⬜ |
| 智能记账 | smart-finance | ✅ |
| 智能审计 | — | ⬜ |
| 智能税务 | — | ⬜ |
| 资产盘点 | smart-data | ✅ |
| 智能对账 | — | ⬜ |

### 办公协同(5/12)
| 模块 | 页面 | 状态 |
|------|------|------|
| 智能审批 | smart-approval | ✅ |
| 文档管理 | smart-docs | ✅ |
| 数据管理 | smart-data | ✅ |
| 智能文档 | smart-docs | ✅ |
| 流程管理 | smart-approval | ✅ |
| 办公管理 | — | ⬜ |
| 权限管理 | — | ⬜ |
| 工具管理 | — | ⬜ |
| 企业管理 | — | ⬜ |
| 智能协同 | — | ⬜ |
| 智能会议 | — | ⬜ |
| 智能搜索 | — | ⬜ |

### AI赋能(7/10)
| 模块 | 页面 | 状态 |
|------|------|------|
| 智能决策 | smart-decision | ✅ |
| 数据分析 | smart-analytics | ✅ |
| 智能预测 | smart-decision | ✅ |
| 流程自动化 | smart-approval | ✅ |
| 智能预警 | smart-decision | ✅ |
| 智能推荐 | smart-decision | ✅ |
| 智能客服 | — | ⬜ |
| 自然语言 | — | ⬜ |
| 图像识别 | — | ⬜ |
| 数据挖掘 | smart-analytics | ✅ |

---

## 五、部署指南

### 5.1 后端服务端口规划（YYC³ 3200-3500规范）

| 服务 | 端口 | 部署方式 | 对应API文件 |
|------|------|---------|------------|
| Twenty CRM | 3210 | Docker Compose | `lib/crm-api.ts` |
| HR API | 3220 | Docker/Node.js | `lib/hr-api.ts` |
| NocoDB | 3230 | Docker | `lib/nocodb-api.ts` |
| AI Family | 3240 | Docker/Node.js | `lib/ai-family.ts` |

### 5.2 环境变量

```env
# Twenty CRM
NEXT_PUBLIC_TWENTY_API_URL=http://localhost:3210/graphql
TWENTY_API_KEY=your-api-key

# HR API
NEXT_PUBLIC_HR_API_URL=http://localhost:3220/api

# NocoDB
NEXT_PUBLIC_NOCODB_URL=http://localhost:3230
NOCODB_API_TOKEN=your-nocodb-token

# AI Family
NEXT_PUBLIC_AI_FAMILY_URL=http://localhost:3240
```

### 5.3 Twenty CRM Docker 部署

配置文件已准备：
- `/ZIP/twenty-crm/docker-compose.yml` (端口 3210)
- `/ZIP/twenty-crm/.env` (已生成密钥)

```bash
cd /path/to/twenty-crm
docker compose up -d
```

> 注意：国内环境需配置 Docker 镜像加速

---

## 六、修复记录

### 6.1 依赖修复

| 问题 | 修复 |
|------|------|
| `node_modules` 不存在 | `npm install` (713 packages) |
| 30个 stub `@types/*` 干扰 | 从 `package.json` 移除 + 物理删除 |
| 根目录脚本文件干扰 TS | `tsconfig.json` exclude 扩展 |
| `@types/node@22` 的 `main: ""` | 批量修复为 `main: "index.d.ts"` |

### 6.2 运行时修复

| 问题 | 修复 |
|------|------|
| `AgenticCore.ts` 引用 Node.js `events` 模块 | 替换为浏览器兼容的 `SimpleEventEmitter` |
| Hydration mismatch | 修复 `EventEmitter` 后浏览器零错误 |

### 6.3 验证结果

| 验证项 | 结果 |
|--------|------|
| `tsc --noEmit` (新增文件) | 0 错误 |
| `next build` 编译 | ✅ Compiled successfully |
| 浏览器 hydration | No errors found |
| `GET /smart-hr` | 200 OK |
| `GET /smart-*` (全部13页) | 200 OK |

---

## 七、后续开发路线

### 第一优先级：补全人资板
- [ ] 智能招聘页面
- [ ] 智能培训页面
- [ ] 智能排班页面

### 第二优先级：补全财务板
- [ ] 智能预算页面
- [ ] 资产管理页面
- [ ] 智能税务页面

### 第三优先级：补全核心业务
- [ ] 订单管理页面
- [ ] 智能采购页面
- [ ] 库存管理页面

### 第四优先级：AI能力扩展
- [ ] 智能客服集成
- [ ] 自然语言处理模块
- [ ] 图像识别集成

---

*文档生成时间: 2026-05-01*
*YYC³ — 言启万象 · 语枢未来*
