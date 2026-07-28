# class and style

`class` and `style` support string, object and array forms.

## class

```ts
defineHtml(`<button :class=${{ active: open, disabled }}></button>`);
```

```ts
defineHtml(`<button :class=${["btn", open && "is-open"]}></button>`);
```

`defineHtml(\`...\`)`uses a statically analyzable JavaScript template literal; the content without`${...}` is just an HTML string. Therefore, the following unquoted object/array writing method is
not supported, and the attribute value will be truncated by HTML parsing at spaces:

```ts
defineHtml(`<button :class={ active: open, disabled }></button>`); // 不支持
```

::: tip
When compatible with the Vue style, you can write the quoted template expression `:class="{ active: open }"`, but the macro component recommends `${...}`: it has TypeScript type checking, jump and refactoring support.
:::

## style

```ts
defineHtml(
  ` <div :style=${{ width: `${width}px`, display: visible ? "" : "none" }}></div> `,
);
```

Static classes will be merged with dynamic classes:

```ts
defineHtml(`<button class="btn" :class=${{ active }}></button>`);
```

## Component style

::: tip
The CSS inside the component is placed in "Styles/Component Styles". `class` and `style` in the template are only responsible for state mapping, and it is not recommended to stuff a large number of style strings.
:::
