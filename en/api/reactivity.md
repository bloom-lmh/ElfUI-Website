---
title: Reactivity API
---
# reactivity API

`@elfui/reactivity` is a responsive portal that can be used independently. Application and macro components are first imported from `@elfui/core`; only when you really need to use the reactive system without component runtime, you can directly rely on this package.

## Stable application API

### state

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`

### Derivations and side effects

`useComputed`、`useEffect`、`watch`、`onWatcherCleanup`

Use `useEffect()` for automatically tracked effects and `watch()` for explicit sources, old/new values, `deep`, or `immediate` behavior.

### Scheduling

`batch`、`nextTick`、`queueJob`、`queuePostFlushJob`、`flushSync`

`batch(() => { ... })` groups multiple reactive writes into one downstream effect flush and returns the callback result. Nested batches flush only when the outermost batch completes; computed values are invalidated immediately, so reads inside the transaction are current. `flushSync()` is the explicit escape hatch when work must be flushed before the batch ends.

Template event handlers are automatically wrapped in a batch. Use `batch()` directly for equivalent transactions in services, adapters, or imperative code.

### tool

`readonly`、`isReadonly`、`isState`、`isRef`、`isReactive`、`isProxy`、`markRaw`、`toRaw`、`unref`、`toValue`

### Scope

`effectScope`、`getCurrentScope`、`onScopeDispose`

## High-level low-level API

::: warning
The following symbols are publicly exported and are mainly used by framework extensions, adapters and diagnostic tools; ordinary business code should not directly call or rely on their internal state.
:::

- effect: `effect`、`stop`、`ReactiveEffect`、`isTracking`、`pauseTracking`、`resetTracking`、`untrack`
- Dependency graph: `track`, `trigger`, `triggerAll`
- scope internals: `EffectScope`、`recordEffectScope`
- scheduler internals: `isSyncMode`
- state flags: `REACTIVE_FLAG`、`REF_FLAG`、`STATE_FLAG`

::: tip
These APIs are still subject to the beta version; they are not recommended APIs for the `@elfui/core` main entrance. If they are adjusted in the future, they will be separately stated in the change record of `@elfui/reactivity`.
:::
