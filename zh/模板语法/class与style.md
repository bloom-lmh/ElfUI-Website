---
title: class 与 style
---

# class 与 style

`class` 和 `style` 支持字符串、对象和数组形式。

## class

```ts
defineHtml(`<button :class=${{ active: open, disabled }}></button>`);
```

```ts
defineHtml(`<button :class=${["btn", open && "is-open"]}></button>`);
```

`defineHtml(\`...\`)`使用可静态分析的 JavaScript 模板字面量；未加`${...}` 的内容只是 HTML 字符串。因此下面这种无引号对象/数组写法不支持，属性值会在空格处被 HTML 解析截断：

```ts
defineHtml(`<button :class={ active: open, disabled }></button>`); // 不支持
```

::: tip
兼容 Vue 风格时可以写带引号的模板表达式 `:class="{ active: open }"`，但宏组件推荐 `${...}`：它有 TypeScript 类型检查、跳转和重构支持。
:::

## style

```ts
defineHtml(
  ` <div :style=${{ width: `${width}px`, display: visible ? "" : "none" }}></div> `,
);
```

静态 class 会和动态 class 合并：

```ts
defineHtml(`<button class="btn" :class=${{ active }}></button>`);
```

## 组件样式

::: tip
组件内部 CSS 放在“样式 / 组件样式”。模板里的 `class` 和 `style` 只负责状态映射，不建议塞大量样式字符串。
:::
