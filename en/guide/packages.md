---
title: Packages
---
# Packages and entrances

ElfUI uses a single user-facing entry while keeping its internal packages separate. New projects declare only `@elfui/core` as a direct runtime dependency; Chain, Router, and build tooling remain optional.

## Entrance selection

| Scenario | Installation | Import |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| New Project / Component Library | Runtime `@elfui/core`; dev dependency `@elfui/vite-plugin` | `import { defineHtml, createApp } from "@elfui/core"` |
| Routing | `@elfui/router` | `import { createRouter } from "@elfui/router"` |
| Old site embedded / small demo | `@elfui/chain` | `import { ElfUI } from "@elfui/chain"` |
| Only responsive | `@elfui/reactivity` | `import { useRef } from "@elfui/reactivity"` |
| Advanced runtime packaging | `@elfui/runtime` | `import { defineComponent } from "@elfui/runtime"` |
| Create Vite Project | `create-elfui` | `pnpm create elfui@beta my-app --install` |

## Package responsibilities

| Packages | Responsibilities |
| -------------------- | ------------------------------------------------ |
| `@elfui/core` | The standard user-facing runtime entry for stable macro, reactivity, and runtime APIs |
| `@elfui/vite-plugin` | Vite macro component compilation plug-in |
| `@elfui/router` | Web Components Routing |
| `@elfui/chain` | Chained component expansion package, including runtime compiler |
| `@elfui/reactivity` | Complete entrance to responsive system |
| `@elfui/runtime` | Custom Element, lifecycle, built-in components and advanced helpers |
| `@elfui/compiler` | Compiler source code capabilities for tools and extensions |

## Volume caliber

Current beta size baseline. The real-application fixture represents a tree-shaken public API consumer; aggregate facades deliberately retain every stable export for release monitoring.

| Target | gzip | Brotli | Description |
| --- | ---: | ---: | --- |
| Real application fixture | 10.04 KB | 9.07 KB | Tree-shaken consumer of the public Core API |
| `@elfui/core` aggregate facade | 17.57 KB | 15.86 KB | Every stable Core export; not a typical application bundle |
| `@elfui/runtime` aggregate facade | 15.25 KB | 13.83 KB | Every stable Runtime export, without the compiler |
| `@elfui/reactivity` aggregate facade | 5.17 KB | 4.71 KB | Complete standalone reactivity entry |

## boundary

`@elfui/core` does not export the `createComponent()`, `ElementBuilder`, `compile()` or runtime string template capabilities. When you need a chained API, go to "Ecology/Chain Components".

Generated render helpers import from `@elfui/core/internal`. This subpath is a versioned protocol between the compiler and Core, not an application-authoring API. Applications should not write internal imports or declare `@elfui/runtime` directly.

::: warning
`@elfui/router` is a standalone package; only install it if routing is required. For the complete ecology, see [Ecosystem Overview] (/en/ecosystem/overview): Router, Extensions, UI Kit, Language Tools and Create ElfUI are all maintained independently in their respective warehouses.
:::
