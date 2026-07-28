---
title: Teleport
---

# Teleport

`Teleport` 把内容渲染到当前组件树之外的目标容器，常用于 Dialog、Drawer、Tooltip。

```html
<Teleport to="body">
  <div class="dialog">内容</div>
</Teleport>
```

## disabled

```html
<Teleport to="body" :disabled="inline">
  <div>内容</div>
</Teleport>
```

禁用时内容留在当前位置。

## 组件上下文与卸载

Teleport 只改变真实 DOM 位置，不改变逻辑组件树：

- 子组件继续读取原位置最近的 `provide()` 和当前 App 的 `app.provide()`。
- 嵌套 Provider 仍然以最近者优先。
- DevTools 中的组件父子关系保持不变。
- 所属组件或 App 卸载时，传送节点和独立 effect scope 会一起释放。

需要让注入值动态更新时，请 provide 一个 Ref 或响应式对象。

## 使用建议

::: tip
弹层类组件通常需要配合 `useScrollLock()`、`useEscapeKey()`、`useFocusTrap()` 和 `useClickOutside()`。
:::
