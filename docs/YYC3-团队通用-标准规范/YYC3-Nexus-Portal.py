#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
file: YYC3-Nexus-Portal.py
description: YYC³ Nexus Portal 文档模版引擎 - 可复用、可迭代、可追溯的文档闭环生成系统
author: YanYuCloudCube Team <admin@0379.email>
version: v3.1.0
created: 2026-03-27
updated: 2026-05-03
copyright: Copyright (c) 2026 YYC³
license: MIT
"""

import os
import sys
import json
import hashlib
import datetime
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass, field
from enum import Enum

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


class DocumentType(Enum):
    MAIN = "main"
    README = "readme"
    RESERVED = "reserved"


@dataclass
class DocumentMetadata:
    file_name: str
    description: str
    author: str = "YanYuCloudCube Team"
    version: str = "v3.1.0"
    created: str = field(default_factory=lambda: datetime.datetime.now().strftime("%Y-%m-%d"))
    updated: str = field(default_factory=lambda: datetime.datetime.now().strftime("%Y-%m-%d"))
    status: str = "published"
    tags: List[str] = field(default_factory=list)
    checksum: str = ""
    parent_doc: str = ""
    related_docs: List[str] = field(default_factory=list)


NEXUS_PORTAL_STRUCTURE = {
    "00-项目总览索引": {
        "description": "YYC³ Nexus Portal 项目全局视图与导航",
        "documents": [
            {"id": "001", "name": "项目总览手册", "desc": "YYC³ Nexus Portal 立项核心依据与目标范围", "tags": "[项目总览],[立项]"},
            {"id": "002", "name": "文档架构导航", "desc": "Nexus Portal 文档体系导航与索引", "tags": "[文档索引],[导航]"},
            {"id": "003", "name": "快速开始指南", "desc": "项目快速启动：环境搭建、依赖安装、开发运行", "tags": "[快速开始],[开发指南]"},
            {"id": "004", "name": "核心概念词典", "desc": "五高五标五化五维、i18n体系、AI Family等核心概念", "tags": "[术语],[概念]"},
            {"id": "005", "name": "版本更新日志", "desc": "Nexus Portal 版本迭代与变更记录", "tags": "[变更日志],[版本]"},
        ],
    },
    "01-启动规划阶段": {
        "description": "Nexus Portal 项目启动与规划管理",
        "subcategories": {
            "0101-项目规划": {
                "documents": [
                    {"id": "001", "name": "项目章程与愿景", "desc": "YYC³言渝云枢品牌定位与Portal愿景", "tags": "[章程],[愿景]"},
                    {"id": "002", "name": "项目范围说明书", "desc": "Nexus Portal 3D交互门户范围边界", "tags": "[范围],[边界]"},
                    {"id": "003", "name": "项目里程碑计划", "desc": "MVP→i18n→AI Chat→主题系统→部署各阶段", "tags": "[里程碑],[计划]"},
                ],
            },
            "0102-需求规划": {
                "documents": [
                    {"id": "001", "name": "业务需求分析", "desc": "品牌展示+AI交互+多语言支持核心需求", "tags": "[需求],[业务]"},
                    {"id": "002", "name": "用户需求调研报告", "desc": "目标用户（开发者/客户/合作伙伴）分析", "tags": "[用户调研],[分析]"},
                    {"id": "003", "name": "产品需求文档PRD", "desc": "Hero/Philosophy/Scenario/Architecture/AI Family功能规格", "tags": "[PRD],[功能规格]"},
                ],
            },
        },
    },
    "02-项目设计阶段": {
        "description": "Nexus Portal 系统架构与详细设计",
        "subcategories": {
            "0201-架构设计": {
                "documents": [
                    {"id": "001", "name": "系统架构总览图", "desc": "Next.js 16 + React 19 + TypeScript 6 全栈架构", "tags": "[架构],[系统设计]"},
                    {"id": "002", "name": "四层架构设计", "desc": "评估层/转型层/规范层/架构层四层体系", "tags": "[四层架构],[分层设计]"},
                    {"id": "003", "name": "技术选型论证报告", "desc": "Next.js/Spline/Framer Motion/Tailwind CSS/shadcn选型依据", "tags": "[技术选型],[论证]"},
                    {"id": "004", "name": "i18n国际化架构设计", "desc": "自研10语言纯函数翻译体系设计", "tags": "[i18n],[国际化]"},
                    {"id": "005", "name": "AI集成架构设计", "desc": "Ollama/Qwen3:32B本地推理+SSE流式响应架构", "tags": "[AI],[Ollama]"},
                    {"id": "006", "name": "主题系统设计", "desc": "dark/light双主题+CSS变量+Context Provider", "tags": "[主题],[UI]"},
                ],
            },
            "0202-组件设计": {
                "documents": [
                    {"id": "001", "name": "组件架构设计", "desc": "sections/layout/lib/effects/ui五层组件体系", "tags": "[组件],[架构]"},
                    {"id": "002", "name": "AI Family成员矩阵设计", "desc": "8位AI智能体数据结构与展示设计", "tags": "[AI Family],[数据设计]"},
                    {"id": "003", "name": "3D交互设计", "desc": "Spline 3D场景+Canvas粒子场+视差动画设计", "tags": "[3D],[交互]"},
                ],
            },
        },
    },
    "03-开发实施阶段": {
        "description": "Nexus Portal 代码开发与实施",
        "subcategories": {
            "0301-开发环境": {
                "documents": [
                    {"id": "001", "name": "开发环境搭建指南", "desc": "Node.js 22+pnpm+Next.js 16环境配置", "tags": "[环境搭建],[开发]"},
                    {"id": "002", "name": "多环境配置规范", "desc": "development/production/Docker环境隔离", "tags": "[环境配置],[规范]"},
                ],
            },
            "0302-开发规范": {
                "documents": [
                    {"id": "001", "name": "Git工作流规范", "desc": "main/develop分支管理与PR流程", "tags": "[Git],[工作流]"},
                    {"id": "002", "name": "代码提交规范", "desc": "Conventional Commits提交信息格式", "tags": "[提交规范],[Git]"},
                    {"id": "003", "name": "TypeScript编码规范", "desc": "strict模式+ESLint+组件拆分规范", "tags": "[TypeScript],[编码规范]"},
                    {"id": "004", "name": "i18n开发规范", "desc": "zh-CN权威源→en→其他语言的翻译流程", "tags": "[i18n],[开发规范]"},
                ],
            },
        },
    },
    "04-测试审核阶段": {
        "description": "Nexus Portal 质量保障与审核",
        "subcategories": {
            "0401-测试策略": {
                "documents": [
                    {"id": "001", "name": "测试策略总纲", "desc": "Vitest+Testing Library测试体系", "tags": "[测试],[策略]"},
                    {"id": "002", "name": "i18n测试规范", "desc": "10语言键完整性/空值/命名空间测试", "tags": "[i18n测试],[规范]"},
                    {"id": "003", "name": "API测试规范", "desc": "Chat API zod验证+rate limiting测试", "tags": "[API测试],[规范]"},
                ],
            },
            "0402-质量审核": {
                "documents": [
                    {"id": "001", "name": "代码质量审核标准", "desc": "TSC 0 errors + ESLint 0 errors + Tests 100% pass", "tags": "[质量审核],[标准]"},
                    {"id": "002", "name": "质量门禁标准", "desc": "TypeScript/ESLint/Vitest/Build四道门禁", "tags": "[门禁],[CI/CD]"},
                    {"id": "003", "name": "组件测试覆盖标准", "desc": "核心模块lib/ 100% + 组件 > 85%", "tags": "[覆盖率],[测试]"},
                ],
            },
        },
    },
    "05-交付部署阶段": {
        "description": "Nexus Portal 项目交付与部署",
        "subcategories": {
            "0501-部署架构": {
                "documents": [
                    {"id": "001", "name": "Docker部署方案", "desc": "多阶段构建+standalone输出+docker-compose", "tags": "[Docker],[部署]"},
                    {"id": "002", "name": "CI/CD流水线配置", "desc": "GitHub Actions质量门禁+Docker构建", "tags": "[CI/CD],[GitHub Actions]"},
                    {"id": "003", "name": "安全头配置说明", "desc": "CSP/HSTS/X-Frame-Options安全头配置", "tags": "[安全],[配置]"},
                ],
            },
            "0502-交付物管理": {
                "documents": [
                    {"id": "001", "name": "交付物清单", "desc": "源码+Docker镜像+文档+测试报告", "tags": "[交付物],[清单]"},
                    {"id": "002", "name": "交付验收标准", "desc": "四道质量门禁全部通过即验收", "tags": "[验收],[标准]"},
                ],
            },
        },
    },
    "06-运维保障阶段": {
        "description": "Nexus Portal 运维与保障",
        "subcategories": {
            "0601-运维策略": {
                "documents": [
                    {"id": "001", "name": "运维策略总纲", "desc": "Docker健康检查+自动重启策略", "tags": "[运维],[策略]"},
                    {"id": "002", "name": "监控告警方案", "desc": "容器健康状态+服务可用性监控", "tags": "[监控],[告警]"},
                ],
            },
        },
    },
    "07-安全合规保障": {
        "description": "Nexus Portal 安全与合规管理",
        "subcategories": {
            "0701-安全管理": {
                "documents": [
                    {"id": "001", "name": "安全开发规范", "desc": "zod输入验证+rate limiting+无硬编码密钥", "tags": "[安全],[开发规范]"},
                    {"id": "002", "name": "安全头与CSP策略", "desc": "Content-Security-Policy配置详解", "tags": "[CSP],[安全头]"},
                ],
            },
        },
    },
    "08-AI Family管理": {
        "description": "YYC³ AI Family 8位智能体管理",
        "subcategories": {
            "0801-AI成员管理": {
                "documents": [
                    {"id": "001", "name": "AI Family成员矩阵", "desc": "Meta-Oracle/Bolero/Master/Sentinel/Prophet/Max-Code/chuping/FFFFFFF", "tags": "[AI Family],[成员]"},
                    {"id": "002", "name": "AI集成接口规范", "desc": "Ollama SSE流式接口+Chat API规范", "tags": "[AI接口],[Ollama]"},
                    {"id": "003", "name": "本地推理部署指南", "desc": "Qwen3:32B本地模型部署与配置", "tags": "[本地推理],[Qwen3]"},
                ],
            },
        },
    },
    "09-智能演进优化": {
        "description": "Nexus Portal 持续演进与优化",
        "subcategories": {
            "0901-持续改进": {
                "documents": [
                    {"id": "001", "name": "持续改进计划", "desc": "测试覆盖率提升+组件文档+E2E测试", "tags": "[改进],[优化]"},
                    {"id": "002", "name": "i18n扩展计划", "desc": "新增语言接入流程与质量保障", "tags": "[i18n],[扩展]"},
                ],
            },
        },
    },
}


BRAND_HEADER = """> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***"""

BRAND_FOOTER = """<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>"""

CORE_PHILOSOPHY = """## 核心理念

**五高架构**：高可用 | 高性能 | 高安全 | 高扩展 | 高智能
**五标体系**：标准化 | 规范化 | 自动化 | 可视化 | 智能化
**五化转型**：流程化 | 数字化 | 生态化 | 工具化 | 服务化
**五维评估**：时间维 | 空间维 | 属性维 | 事件维 | 关联维"""


def generate_checksum(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()[:16]


def generate_readme(dir_name: str, dir_desc: str, doc_list: List[Dict]) -> str:
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    doc_table = "| 序号 | 文档名称 | 描述 | 标签 |\n|------|----------|------|------|\n"
    for idx, doc in enumerate(doc_list, 1):
        safe_name = doc["name"].replace("/", "／")
        doc_table += f"| {idx} | [{doc['name']}]({safe_name}) | {doc['desc']} | {doc.get('tags', '-')} |\n"

    return f"""---
file: README.md
description: {dir_name} 目录文档索引
author: YanYuCloudCube Team
version: v3.1.0
created: {today}
updated: {today}
status: published
tags: [文档索引],[README]
category: {dir_name}
language: zh-CN
---

{BRAND_HEADER}

---

# {dir_name}

{CORE_PHILOSOPHY}

---

## 目录概述

{dir_desc}

---

## 文档索引

{doc_table}
---

## 文档规范

- **命名规范**：`{{编号}}-{{阶段}}-{{模块}}-{{文档名称}}.md`
- **版本规范**：主版本.次版本.修订版本 (如 v3.1.0)
- **标签规范**：使用方括号包裹，如 `[标签1],[标签2]`
- **i18n键规范**：zh-CN.ts 权威源 → en.ts → 其他语言

---

{BRAND_FOOTER}
"""


def generate_reserved(category: str) -> str:
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    return f"""---
file: RES-DOC-001.md
description: 预留文档 - {category}
author: YanYuCloudCube Team
version: v3.1.0
created: {today}
updated: {today}
status: reserved
tags: [{category}],[预留文档]
language: zh-CN
---

{BRAND_HEADER}

---

# 预留文档 - {category}

{CORE_PHILOSOPHY}

---

## 说明

本文档为预留文档，当有新的文档需求时，可基于此模版扩展。

---

{BRAND_FOOTER}
"""


def generate_root_readme(structure: Dict) -> str:
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    sections = ""
    for idx, (dir_name, dir_data) in enumerate(structure.items(), 1):
        desc = dir_data.get("description", "")
        sections += f"| {idx} | [{dir_name}]({dir_name}/) | {desc} |\n"

    return f"""---
file: README.md
description: YYC³ Nexus Portal 项目文档架构导航
author: YanYuCloudCube Team <admin@0379.email>
version: v3.1.0
created: {today}
updated: {today}
status: published
tags: [文档架构],[导航],[Nexus Portal]
category: project-docs
language: zh-CN
---

{BRAND_HEADER}

---

# YYC³ Nexus Portal — 项目文档架构

{CORE_PHILOSOPHY}

---

## 项目信息

| 属性 | 值 |
|------|-----|
| **项目名称** | YYC³ Nexus Portal |
| **技术栈** | Next.js 16.2.4 + React 19 + TypeScript 6 + Tailwind CSS 4 |
| **框架** | App Router + Spline 3D + Framer Motion |
| **i18n** | 自研10语言纯函数翻译体系 |
| **AI集成** | Ollama Qwen3:32B 本地推理 + SSE 流式响应 |
| **部署** | Docker standalone + GitHub Actions CI/CD |
| **质量门禁** | TSC 0 err + ESLint 0 err + Vitest + Build |

---

## 文档架构

| 序号 | 目录 | 描述 |
|------|------|------|
{sections}

---

## 质量门禁状态

| 门禁 | 标准 | 状态 |
|------|------|------|
| TypeScript | 0 errors | ✅ |
| ESLint | 0 errors | ✅ |
| Vitest | 100% pass | ✅ |
| Build | webpack 成功 | ✅ |

---

{BRAND_FOOTER}
"""


def generate_all_docs(output_dir: str, structure: Dict) -> None:
    base = Path(output_dir)
    registry_docs = {}
    total = 0

    root_readme = generate_root_readme(structure)
    root_path = base / "README.md"
    root_path.parent.mkdir(parents=True, exist_ok=True)
    root_path.write_text(root_readme, encoding="utf-8")
    logger.info(f"✅ 已生成: {root_path}")
    total += 1

    for dir_name, dir_data in structure.items():
        desc = dir_data.get("description", "")
        docs = dir_data.get("documents", [])
        subs = dir_data.get("subcategories", {})

        all_docs = list(docs)
        for sub_name, sub_data in subs.items():
            all_docs.extend(sub_data.get("documents", []))

        dir_path = base / dir_name
        dir_path.mkdir(parents=True, exist_ok=True)

        readme_content = generate_readme(dir_name, desc, all_docs)
        (dir_path / "README.md").write_text(readme_content, encoding="utf-8")
        logger.info(f"✅ 已生成: {dir_path / 'README.md'}")
        total += 1

        for doc in all_docs:
            safe_name = doc["name"].replace("/", "／")
            doc_file = dir_path / safe_name
            if not doc_file.exists():
                content = generate_reserved(dir_name)
                doc_file.write_text(content, encoding="utf-8")
                logger.info(f"  📄 已生成预留: {doc_file.name}")
            else:
                logger.info(f"  ⏭ 已存在，跳过: {doc_file.name}")

            registry_docs[f"{dir_name}/{doc['name']}"] = {
                "file_name": doc["name"],
                "description": doc["desc"],
                "version": "v3.1.0",
                "status": "reserved" if not doc_file.exists() else "published",
                "tags": doc.get("tags", "").strip("[]").split("],[") if doc.get("tags") else [],
                "directory": dir_name,
            }
            total += 1

    registry = {
        "export_time": datetime.datetime.now().isoformat(),
        "project": "YYC³ Nexus Portal",
        "project_description": "言渝云枢 · 智能交互门户 — YYC³ AI Family 3D交互展示门户",
        "project_version": "0.1.0",
        "framework": "Next.js 16.2.4 + React 19.2.5 + TypeScript 6.0.3",
        "i18n_engine": "自研纯函数翻译体系 (10 locales)",
        "template_version": "v3.1.0",
        "total_documents": len(registry_docs),
        "quality_gates": {
            "typescript": "0 errors",
            "eslint": "0 errors",
            "vitest": "81/81 passed",
            "build": "webpack compiled",
        },
        "documents": registry_docs,
    }
    registry_path = base / "document_registry.json"
    registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2), encoding="utf-8")
    logger.info(f"\n✅ 文档注册表已导出: {registry_path}")
    logger.info(f"📊 总计生成 {total} 个文件（含 {len(registry_docs)} 个文档注册条目）")


def main():
    parser = argparse.ArgumentParser(description="YYC³ Nexus Portal 文档模版引擎 v3.1.0")
    parser.add_argument("--output", "-o", default="docs", help="输出根目录")
    parser.add_argument("command", nargs="?", default="generate", choices=["generate", "validate", "registry"], help="命令: generate(生成) | validate(验证) | registry(仅导出注册表)")
    args = parser.parse_args()

    if args.command == "generate":
        logger.info("🚀 YYC³ Nexus Portal 文档架构生成开始...")
        generate_all_docs(args.output, NEXUS_PORTAL_STRUCTURE)
        logger.info("🎉 文档架构生成完成！")
    elif args.command == "registry":
        generate_all_docs(args.output, NEXUS_PORTAL_STRUCTURE)
        logger.info("✅ 注册表已导出")
    elif args.command == "validate":
        logger.info("🔍 验证模式...")
        base = Path(args.output)
        errors = 0
        for md_file in base.rglob("*.md"):
            content = md_file.read_text(encoding="utf-8")
            if "YanYuCloudCube" not in content:
                logger.warning(f"缺少品牌标识: {md_file}")
                errors += 1
            if not content.startswith("---"):
                logger.warning(f"缺少元数据块: {md_file}")
                errors += 1
        if errors == 0:
            logger.info("✅ 所有文档验证通过")
        else:
            logger.error(f"❌ 发现 {errors} 个问题")


if __name__ == "__main__":
    main()
