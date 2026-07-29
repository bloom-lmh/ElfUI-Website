# Conditions and lists

Conditions and lists belong to control flow, and instructions are used to make them clearer.

## Conditional rendering

```html
<p v-if="loading">加载中</p>
<p v-else-if="error">加载失败</p>
<p v-else>完成</p>
```

`v-if` creates and destroys nodes. Just use `v-show` when toggling visibility.

```html
<section v-show="open">内容</section>
```

## List rendering

```html
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```

::: tip
List recommendations always provide stable `key`. ElfUI will use keyed list updates to insert, delete, and rearrange only necessary nodes.
:::

## template group

```html
<template v-if="ready">
  <h2>标题</h2>
  <p>正文</p>
</template>
```

::: warning
`<template>` is only used as a transparent group and will not be rendered into real elements.
:::
