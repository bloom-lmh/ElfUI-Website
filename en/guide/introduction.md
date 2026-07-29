---
title: Introduction
---
# Introduction

ElfUI is a front-end framework for Web Components. Its main writing method is **macro component**: write TypeScript logic in an ordinary `.ts/.tsx` file, use `defineHtml(`...`)` to export the component, and use `@elfui/vite-plugin` to precompile the template during construction.

```ts{6-8}
import { defineHtml, useRef } from "@elfui/core";

const count = useRef(0);
const inc = (): void => count.set(count.peek() + 1);

export const Counter = defineHtml(`
    <button @click=${inc}>点了 ${count} 次</button>
`);
```

The core approach of ElfUI is compile-time fine-grained responsiveness. The text, attributes, events, conditions and lists in the template will be compiled into runtime helpers that directly update the DOM. Each dynamic point only subscribes to the state it actually reads.

## What projects are suitable for

ElfUI is suitable for these types of scenarios:

| Scene | Reasons for recommendation |
| ---------------- | ------------------------------------ |
| Component library | Output standard Custom Element, reused across frameworks |
| Standalone Vite application | Macro component pre-compiled without runtime compiler |
| Progressive transformation | You can register components as native tags and put them into old pages |
| Size-sensitive project | Current tree-shaken application fixture: 10.04 KB gzip, without the compiler |

## Relationship with Vue/Lit/Solid

ElfUI draws on Vue’s template experience, Lit’s Web Components output, and Solid’s fine-grained update ideas, but it is not Vue internally, and there is no VNode/patch.

| Dimensions | ElfUI |
| -------- | ---------------------------------------- |
| Component file | Common `.ts/.tsx` |
| Template | ``defineHtml(`...`)`` template declaration, compiled during build time |
| Responsive | `useRef` / `useReactive` / `useComputed` |
| Output | Standard Custom Elements |
| Chain component | Placed in `@elfui/chain` ecological extension |

## learning route

Read "Quick Start" and "Components/Defining Components" first. After you can write components, you can look at responsiveness, directives, styles, routing, and built-in combined functions as needed.
