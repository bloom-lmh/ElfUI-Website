---
title: runtime API
---

# runtime API

`@elfui/runtime` 是高级组件作者入口。业务应用通常从 `@elfui/core` 导入即可。

## 组件定义

`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`registerComponents`、`resolveComponentTag`

## 生命周期和协作

`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`、`onActivated`、`onDeactivated`、`onAttributeChanged`、`onErrorCaptured`、`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`

`onMounted()` 可以返回清理函数；它会在卸载期间、释放组件 DOM 和作用域之前执行。

## 指令、配置、插件

`configure`、`getConfig`、`resetConfig`、`resolveAppConfig`、`warn`、`usePlugin`

应用级指令归 `app.directive()` 管理；宏组件局部指令使用 `@elfui/core` 的 `defineDirective()`。进程级全局指令注册表属于内部实现。

## Host 和 DOM

`useHost`、`useShadowRoot`、`useRenderRoot`、`useAttrs`、`useAppConfig`、`useHostAttr`、`useHostFlag`、`useHostClass`、`useHostCssVar`、`useHostStyle`、`useTemplateRef`、`defineExpose`

`defineExpose(exposed, options)` 的 `options.overrideNative` 接受 `true` 或成员名数组，用于显式声明有意覆盖的 host 原生成员。

## 内置 helper

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

::: warning
`@elfui/runtime/internal` 是底层实现入口。标准编译产物通过 `@elfui/core/internal` 使用这些 helper；业务代码不要依赖任何 internal 子入口。
:::
