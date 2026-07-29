---
title: Defining Components
---

# Define components

A macro component file usually contains three parts: import API, top-level setup logic, and export component.

```ts{6-11}
import { defineHtml, useRef } from "@elfui/core";

const active = useRef(false);
const toggle = (): void => active.set(!active.peek());

export const TogglePanel = defineHtml(`
  <button @click=${toggle}>toggle</button>
  <section v-show=${active}>
    <slot></slot>
  </section>
`);
```

<elf-demo-counter></elf-demo-counter>

## Mount root component

The application entry uses `createApp()`, and there is no need to hand-write the root component tag in `index.html`:

```ts{4}
import { createApp } from "@elfui/core";
import { App } from "./App";

const app = createApp(App);
app.mount("#app");
```

`app.mount()` will automatically register the component and replace the target container content, or you can directly pass in `Element`. The return value is the mounted Custom Element, which needs to be uninstalled by calling `app.unmount()`.

## Tag inference

Named exports will infer tags from the export name:

| export name | inferred tag                            |
| ----------- | --------------------------------------- |
| `UserCard`  | `elf-user-card`                         |
| `ElfButton` | `elf-button`                            |
| `default`   | Inferred by file name or directory name |

If you need to unify the project prefix, please configure `tagPrefix` in `@elfui/vite-plugin`. The macro component tag is a compile-time result and is not affected by `configure()` at runtime.

## Component options

Component-level options use `defineOptions()`:

```ts{3-7}
import { defineHtml, defineOptions } from "@elfui/core";

defineOptions({
  shadow: "open",
  formControl: true,
  register: false
});

export const Field = defineHtml(`<slot></slot>`);
```

`register: false` is suitable for exporting the constructor inside the component library, and then unifying `registerComponents()` by the entrance.
