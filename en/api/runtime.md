---
title: Runtime API
---

# runtime API

`@elfui/runtime` is the entrance for advanced component authors. Business applications can usually be imported from `@elfui/core`.

## Component definition

`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`registerComponents`、`resolveComponentTag`

## Lifecycle and collaboration

`onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`, `provide`, `inject`, `hasInjectionContext`, `createInjectionKey`

`onMounted()` may return a cleanup callback. It runs during unmount before component DOM and scopes are released.

## Instructions, configurations, plug-ins

`configure`、`getConfig`、`resetConfig`、`resolveAppConfig`、`warn`、`usePlugin`

Application directives belong to `app.directive()`; macro-component-local directives belong to `defineDirective()` from `@elfui/core`. The process-global directive registry is internal.

## Host and DOM

`useHost`、`useShadowRoot`、`useRenderRoot`、`useAttrs`、`useAppConfig`、`useHostAttr`、`useHostFlag`、`useHostClass`、`useHostCssVar`、`useHostStyle`、`useTemplateRef`、`defineExpose`

`defineExpose(exposed, options)` accepts `true` or a member-name array in `options.overrideNative`
to declare intentional overrides of native host members.

## Built-in helpers

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

::: warning
`@elfui/runtime/internal` is the low-level implementation entry. Standard generated code reaches these helpers through `@elfui/core/internal`; application code must not depend on either internal subpath.
:::
