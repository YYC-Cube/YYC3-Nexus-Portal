# MCP 远程开源检索结果 — 适配 YYC³ 经·管·运·维·销 × 人·资·智·数·体

### 🏆 Tier 1 — 强烈推荐（可直接集成/借鉴架构）

| 项目                                                 | 类型        | 技术栈                    | 适用节点              | 推荐理由                                                     |
| ---------------------------------------------------- | ----------- | ------------------------- | --------------------- | ------------------------------------------------------------ |
| [**Twenty**](https://github.com/twentyhq/twenty)     | CRM         | Next.js + TS + PostgreSQL | 销·人 / 销·数 / 销·智 | ⭐30K+ — 「开源版 Salesforce，为 AI 设计」，CRM核心可直接复用 |
| [**NocoDB**](https://github.com/nocodb/nocodb)       | 表格/数据库 | Vue + Node.js             | 数·体 / 管·数         | ⭐50K+ — 「开源版 Airtable」，可做数据中台 + 表格管理基座     |
| [**APITable**](https://github.com/apitable/apitable) | 多维表格    | React + TS + Java         | 数·体 / 管·资         | ⭐12K+ — API驱动的低代码表格，比NocoDB更适合嵌入              |
| [**ERPNext**](https://github.com/frappe/erpnext)     | 完整ERP     | Python + MariaDB          | 经·管·运·维·销 全节点 | ⭐22K+ — 最成熟的开源ERP，覆盖HR/财务/采购/库存/CRM           |
| [**Frappe HRMS**](https://github.com/frappe/hrms)    | HR系统      | Python + MariaDB          | 管·人 / 管·资         | ⭐2K+ — 人力资源+薪酬，考勤/请假/招聘/绩效全覆盖              |

### 🥈 Tier 2 — 值得借鉴（可提取组件/模式）

| 项目                                                                            | 类型             | 技术栈                | 适用节点      | 推荐理由                                        |
| ------------------------------------------------------------------------------- | ---------------- | --------------------- | ------------- | ----------------------------------------------- |
| [**Handsontable**](https://github.com/handsontable/handsontable)                | 数据表格         | JS (React适配)        | 数·体 / 管·数 | ⭐20K+ — Excel风格数据网格，最成熟的表格组件     |
| [**SheetJS**](https://github.com/sheetjs/sheetjs)                               | Excel处理        | JS                    | 数·体 / 管·资 | ⭐35K+ — Excel导入导出核心库                     |
| [**IronCalc**](https://github.com/ironcalc/IronCalc)                            | 电子表格引擎     | Rust + React          | 数·体 / 管·数 | 活跃维护，Rust引擎高性能，公式计算引擎          |
| [**react-datasheet-grid**](https://github.com/nick-keller/react-datasheet-grid) | Airtable风格表格 | React + TS            | 数·体         | Airtable风格，轻量可嵌入                        |
| [**Formily**](https://github.com/alibaba/formily)                               | 表单引擎         | React + TS            | 管·智 / 运·体 | ⭐11K+ — 阿里出品，JSON Schema驱动动态表单       |
| [**Emploria**](https://github.com/andreedyson/emploria)                         | HR ERP           | Next.js + Prisma + PG | 管·人         | SaaS多租户HR管理，PDF工资条，与YYC³技术栈最接近 |

### 🥉 Tier 3 — 参考架构

| 项目                                                    | 类型       | 技术栈                      | 适用节点 | 说明                           |
| ------------------------------------------------------- | ---------- | --------------------------- | -------- | ------------------------------ |
| [**OrangeHRM**](https://github.com/orangehrm/orangehrm) | HRMS       | PHP                         | 管·人    | 老牌开源HR，功能参考           |
| [**ReactGrid**](https://github.com/silevis/reactgrid)   | 表格       | React + TS                  | 数·体    | 轻量电子表格组件               |
| [**Tego**](https://github.com/tegojs/tego)              | 低代码平台 | Node.js + TS                | 管·体    | 可插拔低代码框架               |
| [**dental-erp**](https://github.com/abinauv/dental-erp) | 行业ERP    | Next.js 16 + Prisma + MySQL | 行业垂直 | Next.js 16 + Prisma 架构可借鉴 |

---

### 映射到 YYC³ 十维矩阵 — 集成方案

```
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│          │   经     │   管     │   运     │   维     │   销     │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   人     │          │🟢Emploria│          │          │🟢Twenty │
│          │          │🟡HRMS   │          │          │  CRM    │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   资     │🟢ERPNext │🟢ERPNext │          │          │          │
│          │  财务模块 │  资产模块 │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   智     │          │🟢Formily │          │🟢自愈系统│🟢Twenty │
│          │          │  AI表单  │          │  yyc3-mana│  AI CRM │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   数     │          │🟢NocoDB  │          │          │🟢Twenty │
│          │          │🟢APITable│          │          │  数据   │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│   体     │          │🟢Formily │🟢YYC³   │          │🟢YYC³   │
│          │          │  体系构建 │  i18n+3D │          │  品牌体系│
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

🟢 = 有成熟开源可集成   🟡 = 有参考架构需改造   ⬜ = YYC³自建
```

### 推荐集成优先级

```
STEP 1 (管·人 + 销·人): Twenty CRM
├── 集成方式: 独立部署 + API对接 yyc3-mana
├── 提供: 客户管理 + 销售管道 + 线索评分
└── 技术栈: Next.js + PostgreSQL (与YYC³一致)

STEP 2 (管·数 + 数·体): NocoDB 或 APITable
├── 集成方式: 嵌入式 iframe 或 API对接
├── 提供: 多维表格 + 数据库管理 + 表单收集
└── 替代: 后台数据管理界面

STEP 3 (管·人·资): Emploria 或 Frappe HRMS
├── 集成方式: API微服务化
├── 提供: 员工管理 + 薪酬 + 考勤 + 请假
└── Emploria 技术栈最接近 (Next.js + Prisma + PG)
```

**结论：Twenty CRM + NocoDB + Emploria 三件套覆盖了「经管运维销 × 人资智数体」的核心需求，且技术栈与 YYC³ 高度一致（Next.js + TypeScript + PostgreSQL），集成成本最低。**
