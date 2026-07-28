# Component exposed

`defineExpose()` exposes methods or properties to the component host, which can be called externally through DOM ref.

```ts{5-10}
import { defineExpose, defineHtml, useTemplateRef } from "@elfui/core";

const input = useTemplateRef<HTMLInputElement>("input");

defineExpose(
  {
    focus: () => input.value?.focus(),
    clear: () => {
      if (input.value) input.value.value = "";
    }
  },
  { overrideNative: ["focus"] }
);

export const SearchInput = defineHtml(` <input ref="input" /> `);
```

You can also pass a finite-key interface when the public instance contract is shared with type declarations. The interface does not need a string index signature:

```ts
interface SearchInputExpose {
  focus(): void;
  clear(): void;
}

defineExpose<SearchInputExpose>({ focus, clear }, { overrideNative: ["focus"] });
```

## Collisions with native HTMLElement members

ElfUI warns in development when an exposed name already exists on the component host. Use
`overrideNative` only when the component intentionally enhances native semantics:

```ts
defineExpose(
  { focus, blur },
  { overrideNative: ["focus", "blur"] }
);
```

Names such as `scrollTo()`, `remove()`, and `click()` should generally not be replaced. Prefer
component-specific names such as `scrollToOption()`, `removeItem()`, or `triggerAction()`.

External use:

```ts{5}
const el = document.querySelector("search-input") as HTMLElement & {
  focus(): void;
};
// The exposed method is available on the host.
el.focus();
```

## What is appropriate to expose

Good for exposing imperative capabilities:

- `focus()`
- `blur()`
- `validate()`
- `reset()`
- `scrollToActive()`

Don't expose internal reactive state. State should be maintained via props, events, or v-model.
