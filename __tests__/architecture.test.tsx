import { cleanup, render, screen } from "@testing-library/react"
import React from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

// ===== Mock basic browser APIs =====
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

Object.defineProperty(window, "matchMedia", {
  value: (query: string) => ({
    matches: query.includes("dark"),
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => false,
  }),
})

// ===== Mock i18n provider =====
const mockT = (key: string) => {
  const map: Record<string, string> = {
    "architecture.label": "Architecture",
    "architecture.title": "五维驱动架构体系",
    "architecture.description": "以五维评估驱动五高架构、五标体系、五化转型",
    "architecture.tabs.wugao": "五高架构",
    "architecture.tabs.wugao.desc": "高可用 | 高性能 | 高安全 | 高扩展 | 高智能",
    "architecture.tabs.wubiao": "五标体系",
    "architecture.tabs.wubiao.desc": "标准化 | 规范化 | 自动化 | 可视化 | 智能化",
    "architecture.tabs.wuhua": "五化转型",
    "architecture.tabs.wuhua.desc": "流程化 | 数字化 | 生态化 | 工具化 | 服务化",
    "architecture.tabs.wuwei": "五维评估",
    "architecture.tabs.wuwei.desc": "时间维 | 空间维 | 属性维 | 事件维 | 关联维",
    "architecture.wugao.0.title": "高可用",
    "architecture.wugao.0.subtitle": "High Availability",
    "architecture.wugao.0.description": "构建容错、冗余和自动恢复机制",
    "architecture.wugao.0.tags": "故障转移|负载均衡|多活部署|健康检查|熔断降级|服务注册",
    "architecture.wugao.1.title": "高性能",
    "architecture.wugao.1.subtitle": "High Performance",
    "architecture.wugao.1.description": "优化渲染性能、数据吞吐量和响应速度",
    "architecture.wugao.1.tags": "Turbopack|边缘计算|缓存策略|懒加载|代码分割|CDN加速",
    "architecture.wugao.2.title": "高安全",
    "architecture.wugao.2.subtitle": "High Security",
    "architecture.wugao.2.description": "实施纵深防御策略",
    "architecture.wugao.2.tags": "RBAC/ABAC|端到端加密|SQL注入防护|XSS防御|CSRF保护|安全审计",
    "architecture.wugao.3.title": "高扩展",
    "architecture.wugao.3.subtitle": "High Scalability",
    "architecture.wugao.3.description": "采用微服务和模块化架构设计",
    "architecture.wugao.3.tags": "微服务|容器化|K8s编排|API网关|消息队列|弹性伸缩",
    "architecture.wugao.4.title": "高智能",
    "architecture.wugao.4.subtitle": "High Intelligence",
    "architecture.wugao.4.description": "集成AI能力",
    "architecture.wugao.4.tags": "AI Agent|机器学习|自然语言处理|知识图谱|智能推荐|自动化运维",
  }
  return map[key] || key
}

vi.mock("@/components/i18n-provider", () => ({
  useI18n: () => ({ t: mockT, locale: "zh-CN", setLocale: vi.fn(), supportedLocales: [], localeLabels: {} }),
}))

// ===== Mock framer-motion =====
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, exit, whileInView, whileHover, whileTap, viewport, transition, layout, layoutId, ...domProps } = props
      return React.createElement("div", domProps, children)
    },
    button: ({ children, ...props }: any) => {
      const { initial, animate, exit, whileInView, whileHover, whileTap, viewport, transition, layout, ...domProps } = props
      return React.createElement("button", domProps, children)
    },
    span: ({ children, ...props }: any) => {
      const { initial, animate, exit, ...domProps } = props
      return React.createElement("span", domProps, children)
    },
    p: ({ children, ...props }: any) => {
      const { initial, animate, exit, ...domProps } = props
      return React.createElement("p", domProps, children)
    },
  },
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
}))

// ===== Mock ParallaxSection =====
vi.mock("@/components/lib/effects", () => ({
  ParallaxSection: ({ children }: any) => React.createElement(React.Fragment, null, children),
}))

describe("Architecture Section - 五维驱动架构体系", () => {
  beforeEach(() => {
    cleanup()
    Object.defineProperty(window, "innerWidth", { value: 1024, configurable: true })
  })

  it("renders section with correct title from i18n", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    const { container } = render(React.createElement(ArchitectureSection))
    expect(container.querySelector("#架构")).toBeTruthy()
  })

  it("renders tab navigation with four tabs", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    render(React.createElement(ArchitectureSection))
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it("renders without crashing", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    const { container } = render(React.createElement(ArchitectureSection))
    expect(container.innerHTML).toBeTruthy()
  })

  it("has proper section id for navigation", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    const { container } = render(React.createElement(ArchitectureSection))
    const section = container.querySelector("#架构")
    expect(section).toBeTruthy()
    expect(section?.tagName.toLowerCase()).toBe("section")
  })

  it("renders with responsive grid layout", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    const { container } = render(React.createElement(ArchitectureSection))
    const grids = container.querySelectorAll("[class*='grid']")
    expect(grids.length).toBeGreaterThanOrEqual(1)
  })

  it("displays architecture label", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    render(React.createElement(ArchitectureSection))
    expect(screen.getByText("Architecture")).toBeTruthy()
  })

  it("displays title with 五维驱动", async () => {
    const { ArchitectureSection } = await import("@/components/sections/architecture")
    render(React.createElement(ArchitectureSection))
    expect(screen.getByText("五维驱动架构体系")).toBeTruthy()
  })
})
