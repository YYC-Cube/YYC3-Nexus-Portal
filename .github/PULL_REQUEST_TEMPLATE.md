## 变更说明

<!-- 说明做了什么、为什么这样做 -->

## 关联 Issue

<!-- Closes #123 -->

## 变更类型

- [ ] feat 新功能
- [ ] fix 缺陷修复
- [ ] refactor 重构
- [ ] docs 文档
- [ ] ci 构建 / CI
- [ ] chore 依赖或杂项

## 验证方式

请勾选已执行并通过的项目，并附关键输出：

- [ ] `pnpm lint`（0 errors）
- [ ] `pnpm exec tsc --noEmit`（0 errors）
- [ ] `pnpm test`（167 用例）
- [ ] `pnpm run audit:prod`（0 漏洞）
- [ ] `pnpm build`（standalone）
- [ ] `BUILD_MODE=export pnpm build`（静态导出）

## 影响面

- [ ] 涉及用户可见文案 → 已同步 10 种语言（214 键）且 `i18n.test.ts` 通过
- [ ] 涉及外部资源域 → 已同步更新 `lib/csp.ts`
- [ ] 涉及安全头 → 已确认 Standalone 与 Pages 双模式行为
- [ ] 涉及页面渲染 → 已附截图

## 附加说明

<!-- 截图、性能数据、迁移注意事项等 -->
