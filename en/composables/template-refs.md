# template reference

`useTemplateRef()` is used to get the DOM nodes in the template.

```ts
const input = useTemplateRef<HTMLInputElement>("input");

const focus = (): void => {
  input.value?.focus();
};

export const SearchInput = defineHtml(`
  <input ref="input" />
  <button @click=${focus}>聚焦</button>
`);
```

## Works with component exposure

```ts
defineExpose({ focus }, { overrideNative: ["focus"] });
```

The parent component or an external page can call `focus()` after obtaining the component host. A
parent `onMounted()` runs after synchronous children complete setup, expose, and mounted, so this is
a stable point for calling a child public method:

```ts
const search = useTemplateRef<HTMLElement & { focus(): void }>("search");

onMounted(() => {
  search.value?.focus();
});
```

See "Components / Component Exposure" for details.
