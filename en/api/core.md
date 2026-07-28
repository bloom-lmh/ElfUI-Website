---
title: "@elfui/core API"
---

# @elfui/core API

`@elfui/core` is the standard application-facing runtime entry. It covers macros, reactivity, lifecycle, models, directives, plugins, and built-in rendering capabilities. Normal applications do not directly depend on `@elfui/runtime` or `@elfui/reactivity`.

## macro component

`defineHtml`, `defineProps`, `defineEmits`, `defineModel`, `defineSlots`, `defineStyle`, `defineOptions`, `defineDirective`, `defineFragment`, `fragment`, `defineName`, `useComponents`

Pass inline template literals directly to the macros:

```ts
export default defineHtml(`<button>${label}</button>`);
defineStyle(`:host { display: block; }`);
```

`defineStyle(styleA, styleB)` combines multiple imported CSS strings. Beta.7 removes `html`, `css`, and `MacroHtmlTemplate`; pass inline templates directly. `defineHtml()` does not accept arbitrary runtime-generated strings because its template must be statically analyzable by the compiler.

### Local fragments

Use `defineFragment()` for a named template slice that is private to the current file. The
variable name is the local template tag, and attributes become the render function's readonly
props object:

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

`fragment\`...\``is the anonymous form for one-off inline markup. Both forms are compile-time
transparent fragments: they do not register a Custom Element, create a Shadow Root, or own
independent lifecycle hooks. Keep using`defineHtml()` for a public or cross-file component.

## Responsive

`useRef`、`useReactive`、`useShallowRef`、`useShallowReactive`、`useComputed`、`useEffect`、`watch`、`onWatcherCleanup`、`nextTick`

## Lifecycle

`onBeforeMount`, `onMounted`, `onBeforeUpdate`, `onUpdated`, `onBeforeUnmount`, `onUnmounted`, `onActivated`, `onDeactivated`, `onAttributeChanged`, `onErrorCaptured`

`onMounted()` may return a cleanup callback. ElfUI runs it during unmount before releasing component DOM and scopes.

## Application and Runtime User API

`createApp`, `registerComponents`, `resolveComponentTag`, `defineComponent`, `defineCustomElement`, `ensureCustomElement`, `useModel`

Application-level plug-ins, instructions, and configuration usage:

```ts
createApp(App).directive("focus", focusDirective).use(plugin).mount("#app");
```

`app.directive()` is isolated by App; `app.component(Component)` only accepts the component constructor and registers the browser global Custom Element according to its established tag.

Use `const name = defineDirective(definition)` for a directive local to one macro component; the variable name becomes the kebab-case template directive name. Use `app.directive()` for an application-wide directive. Core no longer exposes a process-global directive registry. `configure`, `getConfig`, and `usePlugin` remain available for low-level compatibility; application code should prefer `app.config` and `app.use()`.

## Built-in combined functions

`provide`、`inject`、`hasInjectionContext`、`createInjectionKey`、`useScopedSlot`、`useHost`、`useRenderRoot`、`useShadowRoot`、`useAttrs`、`useAppConfig`、`useTemplateRef`、`defineExpose`、`useEventListener`、`useClickOutside`、`useEscapeKey`、`useScrollLock`、`useFocusTrap`、`useResizeObserver`、`useIntersectionObserver`、`useFormControlContext`

## Built-in rendering capabilities

`teleport`, `transition`, `transitionGroup`, `keepAlive`, `suspense`, `dynamicComponent`, `projectLightDom`

## Internal subpath

`@elfui/core/internal` is reserved for compiler-generated code and is not an application-authoring API. It may change together with the compiler; applications must not import it manually.

Chained builders are not exported in `@elfui/core`. Use `@elfui/chain` when chained API is required.
