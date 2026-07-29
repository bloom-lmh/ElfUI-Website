---
title: reactivity API
---

# reactivity API

::: tip
`@elfui/reactivity` 是可以独立使用的响应式入口。应用和宏组件优先从 `@elfui/core` 导入；只有确实需要脱离组件运行时使用响应式系统时，才直接依赖这个包。
:::

## 稳定应用 API

### 状态

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`

### 派生与副作用

`useComputed`、`useEffect`、`watch`、`onWatcherCleanup`

自动追踪副作用使用 `useEffect()`；需要明确数据源、新旧值、`deep` 或 `immediate` 时使用 `watch()`。

### 调度

`batch`、`nextTick`、`queueJob`、`queuePostFlushJob`、`flushSync`

`batch(() => { ... })` 会把多次响应式写入合并为一次下游 effect 刷新，并返回回调结果。嵌套 batch 只在最外层结束时刷新；computed 会立即失效，因此事务内读取仍是最新值。确实需要在 batch 结束前刷新时，使用 `flushSync()` 作为显式逃生口。

模板事件处理器会自动包在 batch 中。服务、适配器或命令式代码需要同样的事务语义时，直接调用 `batch()`。

### 工具

`readonly`、`isReadonly`、`isState`、`isRef`、`isReactive`、`isProxy`、`markRaw`、`toRaw`、`unref`、`toValue`

### 作用域

`effectScope`、`getCurrentScope`、`onScopeDispose`

## 高级底层 API

::: warning
以下符号是公开导出，主要给框架扩展、适配器和诊断工具使用；普通业务代码不应直接调用或依赖它们的内部状态。
:::

- effect: `effect`、`stop`、`ReactiveEffect`、`isTracking`、`pauseTracking`、`resetTracking`、`untrack`
- 依赖图: `track`、`trigger`、`triggerAll`
- scope internals: `EffectScope`、`recordEffectScope`
- scheduler internals: `isSyncMode`
- state flags: `REACTIVE_FLAG`、`REF_FLAG`、`STATE_FLAG`

::: tip
这些 API 仍受 beta 版本约束；它们不是 `@elfui/core` 主入口的推荐 API，未来若要调整，会在 `@elfui/reactivity` 的变更记录中单独说明。
:::
