# Component communication

For component communication, choose the simplest method first. Don’t cram all scenarios into provide/inject or expose for the sake of “unity”.

| Requirements | Recommendations |
| ------------------ | ------------------- |
| Passed down from father to son | Props |
| Child notifies parent | Event |
| Father and son jointly maintain a value | `v-model` |
| Parent Content | Slots |
| Share context across multiple tiers | Provide / Inject |
| Parent calls child method | Template reference + component exposure |

## Provide / Inject

```ts{5}
import { createInjectionKey, provide } from "@elfui/core";

export const themeKey = createInjectionKey<"light" | "dark">("theme");

provide(themeKey, "dark");
```

Subcomponents:

```ts{4}
import { inject } from "@elfui/core";
import { themeKey } from "./keys";

const theme = inject(themeKey, "light");
```

Injection follows the logical component parent chain. It crosses open or closed Shadow Roots and
keeps the original Provider and App context after Teleport moves content to `body`. The nearest
nested Provider wins, and a Custom Element inserted later reads the value visible when it connects.
Provide a Ref or another reactive object for dynamic values:

```ts
const theme = useRef<"light" | "dark">("light");
provide(themeKey, theme);
```

::: warning
Provide / Inject is suitable for hierarchical contexts such as forms, themes, and menus, and is not suitable for replacing ordinary props.
:::

::: warning
`hasInjectionContext()` can be used as a general composable: it only determines whether it is currently in the injectable context of component setup and cannot replace the actual reading of `inject()`.
:::

## Ref + Expose

When a parent component must call a child component method, the child component is exposed with `defineExpose()` and the parent component is obtained with `useTemplateRef()`.

::: warning
This type of communication is an imperative API, suitable for `focus()`, `validate()`, `reset()`, and not suitable for ordinary data flows.
:::

When exposing an existing HTMLElement member such as `focus()` or `blur()`, the child component
must declare the intentional override with
`defineExpose(api, { overrideNative: ["focus"] })`.

```ts{6}
type SearchInputHost = HTMLElement & {
  focus(): void;
  clear(): void;
};

const search = useTemplateRef<SearchInputHost>("search");

const focusSearch = (): void => search.value?.focus();

export const Page = defineHtml(`
  <search-input ref="search"></search-input>
  <button @click=${focusSearch}>聚焦搜索框</button>
`);
```

Template ref must currently be static `ref="name"`. After the project introduces the generated `HTMLElementTagNameMap`, the native tag query will also get the expose type; otherwise, use the above generic type to clarify the host API.
