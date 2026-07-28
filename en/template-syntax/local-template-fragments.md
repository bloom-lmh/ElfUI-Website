---
title: Local Template Fragments
---

# Local Template Fragments

ElfUI beta.12 provides two compile-time template fragments that are private to the current file:

- `fragment\`...\``is an anonymous one-off slice for direct interpolation or array`map()`.
- `defineFragment<Props>()` is a named, typed local slice for splitting a larger component template.

Neither API registers a Custom Element, creates a Shadow Root, or owns an independent component lifecycle. The compiler transparently expands the fragment into its owning `defineHtml()` component.

## `fragment`: anonymous slices

Insert a `fragment` directly:

```ts
import { defineHtml, fragment } from "@elfui/core";

export const EmptyState = defineHtml(`
  <section>
    ${fragment`
      <strong>No data</strong>
      <span>Try again later</span>
    `}
  </section>
`);
```

You can also use an array `map()` style similar to React:

```ts
interface Item {
  id: number;
  label: string;
}

const items: Item[] = [
  { id: 1, label: "Alpha" },
  { id: 2, label: "Beta" },
];

export const ItemList = defineHtml(`
  <ul>
    ${items.map(
      (item, index) => fragment`
        <li>
          <span>${index + 1}</span>
          <strong>${item.label}</strong>
        </li>
      `,
    )}
  </ul>
`);
```

In beta.12, `fragment` must be a direct interpolation or the direct return value of an `array.map()` callback. Its template must remain statically analyzable.

## `fragment` versus `v-for`

Both forms render lists, but they serve different authoring styles:

| Situation                                              | Prefer     |
| ------------------------------------------------------ | ---------- |
| Simple list, stable `:key`, or frequent reordering     | `v-for`    |
| TypeScript `map()`-oriented template composition       | `fragment` |
| Multiple sibling nodes per item                        | `fragment` |
| Direct use of template-local `v-if` and `v-for` values | `v-for`    |

```ts
// Recommended for reorderable lists that need stable identity.
export const KeyedList = defineHtml(`
  <article v-for="item in items" :key="item.id">
    {{ item.label }}
  </article>
`);
```

The beta.12 anonymous fragment list uses the array index as fragment identity. It can replace `v-for` for many append-only, whole-list replacement, or presentational cases, but it is not a complete replacement for keyed `v-for`.

## `defineFragment`: named slices

Use `defineFragment` when an anonymous template becomes long or repeated:

```ts
import { defineFragment, defineHtml } from "@elfui/core";

interface SummaryItem {
  id: number;
  label: string;
  value: number;
}

interface SummaryCardProps {
  item: SummaryItem;
  compact?: boolean;
}

const SummaryCard = defineFragment<SummaryCardProps>(
  ({ item, compact = false }) => `
    <article class="summary-card" :class=${compact ? "is-compact" : ""}>
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </article>
  `,
);

export const Dashboard = defineHtml(`
  <section class="summary-grid">
    <SummaryCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :compact=${compact}
    />
  </section>
`);
```

The variable name becomes the local template tag, and tag attributes form a readonly props view.
`:prop` and `v-bind` read outer reactive state lazily: updating a parent Ref or replacing the bound
object updates only the affected DOM bindings without recreating the Fragment nodes. Prefer a
PascalCase name so fragments remain visually distinct from native HTML elements.

## It is not an independent component

`defineFragment` divides a template; it does not create another component boundary:

- It cannot be exported or registered across files.
- It does not own props storage, an event API, slots, or lifecycle hooks.
- It does not create another style isolation boundary.
- Reactive expressions, directives, events, and cleanup remain owned by the outer component.

Use `defineHtml()` when you need cross-file reuse, an independent lifecycle, Shadow DOM, or a public component API.

## Static restrictions

- Assign `defineFragment()` to a local `const`.
- Do not reuse a name owned by another local component or fragment.
- The render function must directly return a statically analyzable template literal.
- Runtime-generated and cross-file fragments are unsupported.
- Unsupported nesting produces an `ELF_MACRO_FRAGMENT_*` compiler diagnostic.

See the complete signatures in the [Core API](/en/api/core).
