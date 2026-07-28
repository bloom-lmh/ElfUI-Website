# Teleport

::: warning
`Teleport` renders content to a target container outside the current component tree, commonly used in Dialog, Drawer, and Tooltip.
:::

```html
<Teleport to="body">
  <div class="dialog">内容</div>
</Teleport>
```

## disabled

```html
<Teleport to="body" :disabled="inline">
  <div>内容</div>
</Teleport>
```

Content remains at the current location when disabled.

## Component context and teardown

Teleport changes physical DOM placement without changing the logical component tree:

- Descendants continue to read the nearest original `provide()` and the current App's
  `app.provide()` values.
- The nearest nested Provider still wins.
- DevTools preserves the original component parent relationship.
- Unmounting the owner component or App removes the teleported nodes and stops their detached
  effect scope.

Provide a Ref or another reactive object when an injected value must update dynamically.

## Usage suggestions

Elastic layer components usually need to be matched with `useScrollLock()`, `useEscapeKey()`, `useFocusTrap()` and `useClickOutside()`.
