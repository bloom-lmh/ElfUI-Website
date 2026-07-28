---
title: Vite Plugin
---

# Vite plugin

::: tip
`@elfui/vite-plugin` is responsible for compiling the ordinary `.ts/.tsx` macro component into a runtime render function. It is recommended for new projects to always install and enable it.
:::

```ts{5-6}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

## tagPrefix

::: warning
The tag name of the macro component is determined at compile time, so `tagPrefix` can only be configured in the Vite plug-in and cannot be modified through `configure()` at runtime.
:::

```ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [
    elfuiMacroPlugin({
      tagPrefix: "acme",
    }),
  ],
});
```

```ts
import { defineHtml } from "@elfui/core";

export const UserCard = defineHtml(`<article><slot></slot></article>`);
```

::: tip
The above component will compile to `acme-user-card`. `tagPrefix: "acme-"` will also be normalized to the same result, but it is recommended to write `"acme"` without the trailing dash.
:::

## automatic recognition

The plugin will recognize the exported `defineHtml(...)` component:

```ts
export const Button = defineHtml(`<button><slot></slot></button>`);
```

```ts
const Button = defineHtml(`<button><slot></slot></button>`);

export { Button };
```

```ts
export default defineHtml(`<button><slot></slot></button>`);
```

::: tip
`.elf.ts` is still compatible with the file header pragma, but ordinary `.ts/.tsx` is already the recommended writing method.
:::

## Diagnostic options

```ts
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true,
});
```

Starting in beta.13, Vite startup checks the exact beta versions and independent compiler protocols
of Core, Compiler, and Vite Plugin. A mismatch fails before the first template compile.

Tooling can consume the unified build-only data without adding it to browser production bundles:

```ts
elfuiMacroPlugin({
  onMetadata(metadata, id) {
    // Metadata v2: components, Fragments, source ranges, and ownership
  },
  onDiagnostics(diagnostics, id) {
    // Called on every transform; an empty array clears stale diagnostics
  },
});
```

::: tip
It is recommended to enable the component library; ordinary applications can use the default configuration first.
:::
