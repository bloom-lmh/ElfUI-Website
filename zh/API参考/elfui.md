---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` 是应用唯一标准运行时入口，覆盖宏组件、响应式、生命周期、模型、指令、插件和内置渲染能力。普通应用不需要直接依赖 `@elfui/runtime` 或 `@elfui/reactivity`。

## 宏组件

`defineHtml`、`defineProps`、`defineEmits`、`defineModel`、`defineSlots`、`defineStyle`、`defineOptions`、`defineDirective`、`defineFragment`、`fragment`、`defineName`、`useComponents`

推荐直接把内联模板字符串传给宏：

```ts
export default defineHtml(`<button>${label}</button>`);
defineStyle(`:host { display: block; }`);
```

`defineStyle(styleA, styleB)` 可以组合多个导入的 CSS 字符串。beta.7 已删除 `html`、`css` 及 `MacroHtmlTemplate`；内联模板必须直接传入。`defineHtml()` 不接受运行时生成的任意字符串，模板必须能被编译器静态分析。

### 局部模板片段

`defineFragment()` 用于当前文件内命名的模板切片，变量名就是模板中的局部标签，标签属性会组成只读 props 对象：

```ts
import { defineFragment, defineHtml, fragment } from "@elfui/core";

interface CardProps {
  item: { label: string; value: number };
}

const Card = defineFragment<CardProps>(
  ({ item }) => `
    <article class="card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `,
);

export const Dashboard = defineHtml(`
  <section>
    <Card v-for="item in items" :key="item.label" :item="item" />
    ${fragment`<footer>Summary</footer>`}
  </section>
`);
```

`fragment\`...\``是一次性匿名片段。两种片段都会在编译期透明展开，不注册 Custom Element、不创建 Shadow Root，也不拥有独立生命周期。需要公开、跨文件或拥有独立生命周期的模板时，继续使用`defineHtml()`。

## 响应式

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`useEffect`、`watch`、`onWatcherCleanup`、`nextTick`

## 生命周期

`onBeforeMount`、`onMounted`、`onBeforeUpdate`、`onUpdated`、`onBeforeUnmount`、`onUnmounted`、`onActivated`、`onDeactivated`、`onAttributeChanged`、`onErrorCaptured`

`onMounted()` 可以返回清理函数；ElfUI 会在卸载期间、释放组件 DOM 和作用域之前执行它。

## 应用与 Runtime 用户 API

`createApp`、`registerComponents`、`resolveComponentTag`、`defineComponent`、`defineCustomElement`、`ensureCustomElement`、`useModel`

应用级插件、指令、配置使用：

```ts
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` 按 App 隔离；`app.component(Component)` 只接受组件构造器，并按其既定 tag 注册浏览器全局 Custom Element。

组件局部指令使用 `const name = defineDirective(definition)`，变量名会转换为 kebab-case 模板名；应用级指令使用 `app.directive()`。Core 不再公开进程级全局指令注册表。`configure`、`getConfig` 和 `usePlugin` 仍用于底层兼容场景；应用代码优先使用 `app.config` 和 `app.use()`。

## 内置组合式函数

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

## 内置渲染能力

`teleport`、`transition`、`transitionGroup`、`keepAlive`、`suspense`、`dynamicComponent`、`projectLightDom`

## Internal 子路径

`@elfui/core/internal` 只供编译器生成代码使用，不是业务代码 API。它可以随编译器版本同步变化，应用不要手写导入。

链式 builder 不在 `@elfui/core` 中导出。需要链式 API 时使用 `@elfui/chain`。
