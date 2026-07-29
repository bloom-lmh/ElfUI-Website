# CSP and bundle size

The macro component mainline compiles the template during the build period, and does not require `new Function` when the browser is running, which is more suitable for strict CSP.

```ts
import { defineHtml } from "@elfui/core";
```

The main `@elfui/core` entry does not include the runtime compiler. The repository's current real tree-shaken application fixture is 10.13 KB gzip / 9.16 KB Brotli; the exact output depends on the imported APIs and bundler.

Release checks enforce four automated gzip/Brotli budgets: a real application, the complete Core facade, runtime, and reactivity. Their current result/budget pairs are 10.13/10.3 KB gzip and 9.16/9.3 KB Brotli for the real application; 18.47/18.8 KB and 16.66/17.0 KB for the complete Core facade; 16.14/16.4 KB and 14.64/14.9 KB for Runtime; and 5.23/5.4 KB and 4.77/4.9 KB for Reactivity. The aggregate facades intentionally include every stable export to track the total public surface; they are not typical application download sizes. The build also verifies that production bundles remove DEV branches and that published ESM does not write a global `__DEV__` flag.

## Chain boundaries

`@elfui/chain` supports:

```ts
ElfUI.createComponent().template(`<button>{{ count }}</button>`);
```

This requires a runtime compiler, is approximately 21.19 KB in size, and may also hit tighter CSP limits. It is suitable for progressive embedding of old sites, small demos or low build constraint environments, and is not the main line of new projects.

## Recommendations

::: tip
Production applications are preferred:
:::

1. Use the `@elfui/core` main entry.
2. Compile the macro component using `@elfui/vite-plugin`.
3. Limit chained components to ecosystem expansion or migration code.
