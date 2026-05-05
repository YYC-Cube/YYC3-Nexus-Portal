---
@file: YYC³ 企业管理系统 - 可视化架构文档
@description: 对齐已实现功能的完整可视化架构图
@author: YYC³团队
@version: 1.0.0
@created: 2026-05-01
@tags: 架构,可视化,Mermaid,模块全景
---

# YYC³ 企业管理系统 — 可视化架构文档

---

## 一、系统总览架构

```mermaid
graph TB
    subgraph CLIENT["🖥️ 客户端层 (Next.js App Router)"]
        direction TB
        ENTRY["app/page.tsx<br/>客户端入口"]
        LAYOUT["app/layout.tsx<br/>根布局"]

        subgraph PAGES["📄 61个业务页面"]
            direction LR
            P1["核心业务 15页"]
            P2["职能管理 8页"]
            P3["系统管理 12页"]
            P4["AI智能 13页"]
            P5["基础功能 13页"]
        end
    end

    subgraph COMPONENTS["🧩 组件层 (120+ 组件)"]
        direction TB
        UI["components/ui/<br/>35个基础组件"]
        LAYOUT_C["components/layout/<br/>布局组件"]
        WIDGET["components/ai-floating-widget/<br/>AI浮窗组件"]
        BUSINESS["components/根目录<br/>60+业务组件"]
    end

    subgraph ENGINE["⚙️ 引擎层 (lib/)"]
        direction TB
        API["API客户端<br/>crm-api · hr-api<br/>nocodb-api · ai-family"]
        FORM["表单引擎<br/>form-engine"]
        AGENT["智能体核心<br/>agentic-core"]
        INFRA["基础设施<br/>db · cache · security<br/>performance · monitoring"]
        AI_LIB["AI能力<br/>model-adapter · knowledge-base<br/>learning-system · insights"]
    end

    subgraph HOOKS["🪝 Hook层 (8个)"]
        H1["use-crm-data"]
        H2["use-hr-data"]
        H3["use-customers"]
        H4["use-tasks · use-projects"]
        H5["use-users · use-form-validation"]
        H6["use-toast"]
    end

    subgraph BACKEND["🔗 后端服务"]
        CRM_S["Twenty CRM<br/>:3210 GraphQL"]
        HR_S["HR API<br/>:3220 REST"]
        NocoDB_S["NocoDB<br/>:3230 REST"]
        AI_S["AI Family<br/>:3240 REST"]
        DB_S["PostgreSQL<br/>Prisma ORM"]
        REDIS_S["Redis<br/>Cache Layer"]
    end

    CLIENT --> COMPONENTS
    CLIENT --> HOOKS
    HOOKS --> ENGINE
    ENGINE --> BACKEND
    COMPONENTS --> ENGINE
```

---

## 二、页面功能模块全景

```mermaid
graph LR
    subgraph CORE["🏢 核心业务模块"]
        direction TB
        DASH["/dashboard<br/>数据中心"]
        SALES["/smart-sales<br/>智能销售看板"]
        CONTRACT["/smart-contract<br/>合同管理"]
        PROJECT["/smart-project<br/>项目管理"]
        CUSTOMERS["/customers<br/>客户管理"]
        TASKS["/tasks<br/>任务管理"]
        APPROVAL["/approval<br/>审批中心"]
        FINANCE["/finance<br/>财务管理"]
        OKR["/okr<br/>OKR管理"]
        CHANNEL["/channel-center<br/>渠道中心"]
        STORE["/store-management<br/>门店管理"]
        COLLAB["/collaboration<br/>协同办公"]
        SCHEDULE["/schedule<br/>日程管理"]
        COMMS["/communication<br/>沟通中心"]
        NOTIFS["/notifications<br/>通知中心"]
    end

    subgraph HR["👥 职能管理模块"]
        direction TB
        SMART_HR["/smart-hr<br/>智能人事管理<br/>⭐ 309行"]
        PAYROLL["/smart-payroll<br/>智能薪酬管理"]
        ATTEND["/smart-attendance<br/>智能考勤管理"]
        PERF["/smart-performance<br/>智能绩效管理"]
        TRAINING["/training<br/>培训管理"]
        PROFILE["/profile<br/>个人中心"]
    end

    subgraph SMART["🤖 AI智能模块"]
        direction TB
        DECISION["/smart-decision<br/>AI决策中心<br/>⭐ 7智能体"]
        APPROVE["/smart-approval<br/>智能审批<br/>⭐ AI预审"]
        ANALYTICS["/smart-analytics<br/>数据分析看板"]
        DATA["/smart-data<br/>数据管理中台"]
        DOCS["/smart-docs<br/>文档协同"]
        SMART_FIN["/smart-finance<br/>智能财务"]
        AI_ASSIST["/ai-assistant<br/>AI助手"]
        AI_CONTENT["/ai-content-creator<br/>AI内容创作"]
        AI_FORMS["/ai-smart-forms<br/>AI智能表单"]
        AI_DATA["/ai-customer-data<br/>AI客户数据"]
        BI["/advanced-bi<br/>高级BI报表"]
        AI_DEMO["/ai-floating-demo<br/>AI浮窗演示"]
        ENHANCED["/enhanced-ai-demo<br/>增强AI演示"]
    end

    subgraph SYS["⚙️ 系统管理模块"]
        direction TB
        SYS_MGMT["/system-management<br/>系统管理"]
        SYS_SET["/system-settings<br/>系统设置"]
        SYS_MON["/system-monitor<br/>系统监控"]
        SYS_TEST["/system-testing<br/>系统测试"]
        PERM["/permission-management<br/>权限管理"]
        USER_MGMT["/user-management<br/>用户管理"]
        TENANT["/tenant-management<br/>租户管理"]
        SECURITY["/security-center<br/>安全中心"]
        BACKUP["/backup-recovery<br/>备份恢复"]
        LOG["/log-management<br/>日志管理"]
        PARAM["/parameter-settings<br/>参数设置"]
        PLAT["/platform-settings<br/>平台设置"]
    end

    subgraph OTHER["📦 基础功能"]
        direction TB
        HOME["/ (首页)"]
        MODULES["/modules<br/>模块中心"]
        HELP["/help-center<br/>帮助中心"]
        SETTINGS["/settings<br/>设置"]
        DATA_INT["/data-integration<br/>数据集成"]
        MOBILE["/mobile-app<br/>移动端"]
        WECHAT["/wechat-config<br/>微信配置"]
        OFFLINE["/offline<br/>离线模式"]
        PERF_OPT["/performance-optimization<br/>性能优化"]
        HELP_P["/help<br/>帮助"]
        ANALYTICS_P["/analytics<br/>分析页"]
    end
```

---

## 三、引擎层模块依赖关系

```mermaid
graph TB
    subgraph API_LAYER["📡 API 客户端层"]
        CRM_API["lib/crm-api.ts<br/>Twenty CRM GraphQL<br/>:3210"]
        HR_API["lib/hr-api.ts<br/>HR REST API<br/>:3220"]
        NOCODB_API["lib/nocodb-api.ts<br/>NocoDB REST v2<br/>:3230"]
        AI_API["lib/ai-family.ts<br/>AI Family REST<br/>:3240"]
        WECHAT_API["lib/wechat-api.ts<br/>微信API"]
    end

    subgraph ENGINE_LAYER["🔧 引擎模块"]
        FORM_E["lib/form-engine.ts<br/>JSON Schema表单引擎<br/>4种表单 · 3种审批流"]
        AGENT_E["lib/agentic-core/<br/>智能体核心引擎<br/>AgenticCore · MessageBus<br/>TaskScheduler · StateManager"]
    end

    subgraph HOOK_LAYER["🪝 React Hook"]
        USE_CRM["use-crm-data<br/>CRM并行加载"]
        USE_HR["use-hr-data<br/>HR并行加载"]
        USE_CUST["use-customers"]
        USE_TASK["use-tasks"]
        USE_PROJ["use-projects"]
        USE_USER["use-users"]
        USE_FORM["use-form-validation"]
        USE_TOAST["use-toast"]
    end

    subgraph INFRA_LAYER["🏗️ 基础设施"]
        DB["lib/db/<br/>Prisma ORM<br/>6 models · 6 repos"]
        CACHE["lib/cache-layer/<br/>CacheLayer"]
        SECURITY_M["lib/security-manager/<br/>SecurityManager"]
        PERF_M["lib/performance/<br/>monitor · optimization"]
        MONITOR["lib/monitoring-maintenance/<br/>MonitoringMaintenance"]
        ERROR["lib/error-handler/<br/>ErrorHandler"]
    end

    subgraph AI_LAYER["🧠 AI 能力层"]
        MODEL["lib/model-adapter/<br/>6个适配器<br/>OpenAI · Zhipu · Local"]
        KNOWLEDGE["lib/knowledge-base/<br/>KnowledgeBase"]
        LEARNING["lib/learning-system/<br/>UnifiedLearningSystem"]
        INSIGHTS["lib/insights-dashboard/<br/>InsightsDashboard"]
        CONTEXT["lib/context-manager/<br/>ContextManager"]
        STREAM["lib/stream-processor/<br/>StreamProcessor"]
    end

    subgraph UX_LAYER["🎨 UX 优化层"]
        SELF_HEAL["lib/self-healing-ecosystem/<br/>自愈生态"]
        UX_OPT["lib/ux-optimization/<br/>UX优化循环"]
        DATA_OPT["lib/data-optimization/<br/>数据优化循环"]
        FEEDBACK["lib/user-feedback-loop/<br/>用户反馈循环"]
        OFFLINE["lib/offline-support/<br/>离线支持"]
    end

    CRM_API --> USE_CRM
    HR_API --> USE_HR
    NOCODB_API --> FORM_E
    AI_API --> AGENT_E
    AGENT_E --> MODEL
    MODEL --> KNOWLEDGE
    MODEL --> LEARNING
    INFRA_LAYER --> AI_LAYER
```

---

## 四、数据流架构

```mermaid
flowchart TD
    subgraph USER["👤 用户交互"]
        CLICK["用户操作"]
        BROWSER["浏览器渲染"]
    end

    subgraph NEXT["⚡ Next.js App Router"]
        SSR["SSR/SSG 渲染"]
        RSC["React Server Components"]
        CC["Client Components<br/>'use client'"]
    end

    subgraph STATE["📊 状态管理"]
        CTX["React Context<br/>ThemeProvider · PageTitleProvider<br/>AIWidgetProvider"]
        HOOKS_ST["useState Hooks<br/>各页面内部状态"]
    end

    subgraph API["🔌 API 调用"]
        GRAPHQL["GraphQL<br/>Twenty CRM"]
        REST["REST API<br/>HR · NocoDB · AI"]
    end

    subgraph DATA["💾 数据层"]
        PG["PostgreSQL<br/>Prisma ORM"]
        NCD["NocoDB<br/>Airtable替代"]
        RDS["Redis<br/>缓存层"]
    end

    CLICK --> BROWSER --> CC
    CC --> CTX
    CC --> HOOKS_ST
    CC --> HOOK_LAYER2["Hook层"]
    HOOK_LAYER2 --> API
    RSC --> PG
    GRAPHQL --> PG
    REST --> NCD
    REST --> PG
    API --> RDS

    style USER fill:#e8f5e9
    style NEXT fill:#e3f2fd
    style STATE fill:#fff3e0
    style API fill:#fce4ec
    style DATA fill:#f3e5f5
```

---

## 五、组件层级结构

```mermaid
graph TD
    subgraph ROOT["Root Layout"]
        ROOT_LAY["app/layout.tsx"]
        TP["ThemeProvider"]
        PTP["PageTitleProvider"]
        AW["AIWidgetProvider"]
    end

    subgraph LAYOUT_COMP["布局组件"]
        PC["PageContainer"]
        SIDEBAR["Sidebar<br/>导航菜单"]
        HEADER["Header<br/>顶部栏"]
        GS["GlobalSearch<br/>全局搜索"]
    end

    subgraph UI_COMP["UI 基础组件 (35个)"]
        CORE_UI["Button · Card · Badge<br/>Input · Select · Dialog<br/>Tabs · Tooltip · Avatar"]
        ENHANCED["EnhancedCard · EnhancedButton<br/>EnhancedProgress"]
        DATA_UI["Chart · Charts · Progress<br/>Slider · Skeleton"]
        ADV_UI["VirtualScroll · BatchOps<br/>DataImportExport · AdvSearch"]
    end

    subgraph WIDGET_COMP["AI 浮窗组件"]
        IW["IntelligentAIWidget"]
        EW["EnhancedAIWidget"]
        AWP["AIWidgetProvider"]
        ART["AIResponseTemplate"]
    end

    ROOT_LAY --> TP --> PTP --> AW
    AW --> SIDEBAR
    AW --> HEADER
    AW --> GS
    AW --> PC
    PC --> UI_COMP
    PC --> WIDGET_COMP
```

---

## 六、数据库模型结构

```mermaid
erDiagram
    User {
        string id PK
        string name
        string email
        string role
        string avatar
        datetime createdAt
    }

    Customer {
        string id PK
        string name
        string company
        string email
        string phone
        string status
        string source
        float value
        datetime createdAt
    }

    Task {
        string id PK
        string title
        string description
        string status
        string priority
        string assigneeId FK
        string projectId FK
        datetime dueDate
    }

    Project {
        string id PK
        string name
        string description
        string status
        float budget
        float spent
        datetime startDate
        datetime endDate
    }

    Notification {
        string id PK
        string userId FK
        string type
        string title
        string content
        boolean read
        datetime createdAt
    }

    System {
        string id PK
        string key
        string value
        string category
        datetime updatedAt
    }

    User ||--o{ Task : "assigns"
    Project ||--o{ Task : "contains"
    User ||--o{ Notification : "receives"
    User ||--o{ Customer : "manages"
```

---

## 七、模块覆盖率热力图

```mermaid
graph LR
    subgraph COVERAGE["📊 57模块覆盖率 (30/57 = 53%)"]
        direction TB

        subgraph DONE["✅ 已实现 (30)"]
            D1["客户管理"]
            D2["智能销售"]
            D3["线索管理"]
            D4["合同管理"]
            D5["项目管理"]
            D6["智能履约"]
            D7["人事管理"]
            D8["员工管理"]
            D9["薪酬管理"]
            D10["绩效管理"]
            D11["考勤管理"]
            D12["智能绩效"]
            D13["智能考勤"]
            D14["人才画像"]
            D15["财务管理"]
            D16["智能报销"]
            D17["智能记账"]
            D18["资产盘点"]
            D19["智能审批"]
            D20["文档管理"]
            D21["数据管理"]
            D22["智能文档"]
            D23["流程管理"]
            D24["智能决策"]
            D25["数据分析"]
            D26["智能预测"]
            D27["流程自动化"]
            D28["智能预警"]
            D29["智能推荐"]
            D30["数据挖掘"]
        end

        subgraph TODO["⬜ 待实现 (27)"]
            T1["订单管理"]
            T2["智能采购"]
            T3["库存管理"]
            T4["智能生产"]
            T5["工单管理"]
            T6["智能获客"]
            T7["智能风控"]
            T8["智能招聘"]
            T9["智能培训"]
            T10["商务管理"]
            T11["智能排班"]
            T12["智能预算"]
            T13["资产管理"]
            T14["设备管理"]
            T15["智能税务"]
            T16["智能对账"]
            T17["智能审计"]
            T18["办公管理"]
            T19["权限管理 ⚡"]
            T20["工具管理"]
            T21["企业管理"]
            T22["智能协同"]
            T23["智能会议"]
            T24["智能搜索"]
            T25["智能客服"]
            T26["自然语言"]
            T27["图像识别"]
        end
    end

    style DONE fill:#c8e6c9
    style TODO fill:#ffcdd2
```

> ⚡ 权限管理已有页面 `/permission-management` 但功能待完善

---

## 八、技术栈全景

```mermaid
graph TB
    subgraph FRONTEND["🎨 前端技术栈"]
        NEXT["Next.js 14<br/>App Router"]
        REACT["React 19"]
        TS["TypeScript 5.9"]
        TW["Tailwind CSS 4"]
        LUCIDE["Lucide React<br/>图标库"]
        RHF["React Hook Form<br/>表单验证"]
    end

    subgraph BACKEND_TECH["⚙️ 后端技术栈"]
        PRISMA["Prisma ORM<br/>数据库"]
        GRAPHQL_T["GraphQL<br/>Twenty CRM"]
        REST_T["REST API<br/>HR · NocoDB"]
        REDIS_T["Redis<br/>缓存"]
        NODE["Node.js<br/>运行时"]
    end

    subgraph AI_TECH["🤖 AI 技术栈"]
        DEEPSEEK["DeepSeek-V3<br/>大语言模型"]
        AGENTS_T["7智能体架构<br/>元谕·先知·哨兵<br/>舞者·宗师·初评·枢纽"]
        RAG["知识库 RAG<br/>检索增强生成"]
        STREAM_T["流式处理<br/>StreamProcessor"]
    end

    subgraph INFRA_TECH["🏗️ 基础设施"]
        DOCKER["Docker Compose<br/>容器编排"]
        NocoDB_T["NocoDB<br/>无代码数据库"]
        TWENTY["Twenty CRM<br/>开源CRM"]
        WECHAT["企业微信<br/>集成"]
    end

    FRONTEND --> BACKEND_TECH
    BACKEND_TECH --> AI_TECH
    BACKEND_TECH --> INFRA_TECH
```

---

## 九、目录结构树

```
yyc3-mana/
├── app/                          # 61个页面 (Next.js App Router)
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 根布局
│   ├── smart-hr/                 # ⭐ 智能人事管理 (309行)
│   ├── smart-sales/              # ⭐ 智能销售看板 (210行)
│   ├── smart-decision/           # ⭐ AI决策中心 (196行)
│   ├── smart-finance/            # ⭐ 智能财务管理 (239行)
│   ├── smart-data/               # ⭐ 数据管理中台 (207行)
│   ├── smart-docs/               # ⭐ 文档协同 (217行)
│   ├── smart-contract/           # ⭐ 合同管理 (198行)
│   ├── smart-project/            # ⭐ 项目管理 (198行)
│   ├── smart-approval/           # ⭐ 智能审批 (178行)
│   ├── smart-analytics/          # ⭐ 数据分析看板 (161行)
│   ├── smart-payroll/            # ⭐ 薪酬管理 (161行)
│   ├── smart-performance/        # ⭐ 绩效管理 (172行)
│   ├── smart-attendance/         # ⭐ 考勤管理 (157行)
│   ├── dashboard/                # 数据中心
│   ├── customers/                # 客户管理
│   ├── tasks/                    # 任务管理
│   ├── projects/                 # 项目管理
│   ├── ...                       # (47个其他页面)
│   └── wechat-config/            # 微信配置
│
├── components/                   # 120+ 组件
│   ├── ui/                       # 35个基础UI组件
│   │   ├── enhanced-card.tsx     # 增强卡片
│   │   ├── enhanced-button.tsx   # 增强按钮
│   │   ├── chart.tsx             # 图表
│   │   └── ...                   # (31个其他UI组件)
│   ├── layout/                   # 布局组件
│   │   └── page-container.tsx    # 页面容器
│   ├── ai-floating-widget/       # AI浮窗组件
│   │   ├── AIWidgetProvider.tsx  # 浮窗状态管理
│   │   ├── IntelligentAIWidget.tsx # 智能浮窗
│   │   ├── EnhancedAIWidget.tsx  # 增强浮窗
│   │   └── AIResponseTemplate.tsx # 响应模板
│   ├── sidebar.tsx               # 侧边栏导航
│   ├── header.tsx                # 顶部栏
│   ├── global-search.tsx         # 全局搜索
│   └── ...                       # (60+业务组件)
│
├── lib/                          # 80+ 引擎模块
│   ├── crm-api.ts                # ⭐ Twenty CRM GraphQL客户端
│   ├── hr-api.ts                 # ⭐ HR REST API客户端
│   ├── nocodb-api.ts             # ⭐ NocoDB REST v2客户端
│   ├── form-engine.ts            # ⭐ JSON Schema表单引擎
│   ├── ai-family.ts              # ⭐ AI Family 7智能体
│   ├── agentic-core/             # 智能体核心引擎
│   │   ├── AgenticCore.ts        # 核心引擎 (SimpleEventEmitter)
│   │   ├── MessageBus.ts         # 消息总线
│   │   ├── TaskScheduler.ts      # 任务调度器
│   │   └── StateManager.ts       # 状态管理器
│   ├── model-adapter/            # AI模型适配器
│   │   ├── OpenAIAdapter.ts      # OpenAI适配
│   │   ├── ZhipuAdapter.ts       # 智谱适配
│   │   ├── LocalModelAdapter.ts  # 本地模型适配
│   │   └── ModelRouter.ts        # 模型路由
│   ├── db/                       # 数据库层
│   │   ├── models/               # Prisma模型 (6个)
│   │   └── repositories/         # 数据仓库 (6个)
│   ├── self-healing-ecosystem/   # 自愈生态
│   ├── knowledge-base/           # 知识库
│   ├── learning-system/          # 学习系统
│   ├── cache-layer/              # 缓存层
│   ├── security-manager/         # 安全管理
│   └── ...                       # (60+其他模块)
│
├── hooks/                        # 8个React Hook
│   ├── use-crm-data.ts           # ⭐ CRM数据Hook
│   ├── use-hr-data.ts            # ⭐ HR数据Hook
│   ├── use-customers.ts          # 客户数据Hook
│   ├── use-tasks.ts              # 任务数据Hook
│   ├── use-projects.ts           # 项目数据Hook
│   ├── use-users.ts              # 用户数据Hook
│   ├── use-form-validation.ts    # 表单验证Hook
│   └── use-toast.ts              # Toast通知Hook
│
├── contexts/                     # React Context
│   └── page-title-context.tsx    # 页面标题上下文
│
└── docs/                         # 文档
    ├── YYC³企业管理系统-智能模块集成衔接文档.md
    └── 企业管理系统.md             # 57模块规格书
```

---

## 十、端口与服务映射

```mermaid
graph LR
    subgraph SERVICES["🔗 微服务端口规划 (YYC³ 3200-3500)"]
        direction TB

        subgraph NEXT_APP["Next.js 应用"]
            DEV["开发 :3223<br/>next dev"]
            PROD["生产 :3200<br/>next start"]
        end

        subgraph BACKEND_S["后端服务"]
            CRM_PORT["Twenty CRM<br/>:3210 GraphQL"]
            HR_PORT["HR API<br/>:3220 REST"]
            NocoDB_PORT["NocoDB<br/>:3230 REST"]
            AI_PORT["AI Family<br/>:3240 REST"]
        end

        subgraph DATA_S["数据存储"]
            PG_PORT["PostgreSQL<br/>:5432"]
            REDIS_PORT["Redis<br/>:6379"]
        end
    end

    NEXT_APP --> BACKEND_S
    BACKEND_S --> DATA_S

    style SERVICES fill:#f5f5f5
```

---

*文档生成时间: 2026-05-01*
*YYC³ — 言启万象 · 语枢未来*
