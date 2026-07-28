---
title: Stable IDs
---

# Stable IDs

`useId()` creates a stable, document-unique string during synchronous component setup. Use it to connect labels, controls, and ARIA relationships:

```ts
import { defineHtml, useComputed, useId } from "@elfui/core";

const generatedId = useId("input");
const inputId = useComputed(() => props.id || generatedId);

export const Field = defineHtml(`
  <label :for=${inputId}>Name</label>
  <input :id=${inputId} />
`);
```

The same call position receives the same ID when the same Custom Element disconnects and reconnects. Different Apps, component instances, and call positions do not collide. The implementation does not use randomness; the prefix is only for readability.

Call `useId()` unconditionally and in a stable order during synchronous setup. beta.13 does not yet guarantee identical IDs between SSR output and client hydration. An explicit user-provided ID should always take precedence.
