---
title: Vite 插件
---

# Vite 插件

::: tip
`@elfui/vite-plugin` 负责把普通 `.ts/.tsx` 宏组件编译为运行时 render 函数。新项目推荐始终安装并启用它。
:::

```ts{5-6}
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [elfuiMacroPlugin()]
});
```

## tagPrefix

::: warning
宏组件的 tag 名称在编译期确定，因此 `tagPrefix` 只能配置在 Vite 插件里，不能通过运行时 `configure()` 修改。
:::

```ts
import { defineConfig } from "vite";
import { elfuiMacroPlugin } from "@elfui/vite-plugin";

export default defineConfig({
  plugins: [
    elfuiMacroPlugin({
      tagPrefix: "acme",
    }),
  ],
});
```

```ts
import { defineHtml } from "@elfui/core";

export const UserCard = defineHtml(`<article><slot></slot></article>`);
```

::: tip
上面的组件会编译为 `acme-user-card`。`tagPrefix: "acme-"` 也会被规整为同样的结果，但推荐写不带结尾横杠的 `"acme"`。
:::

## 自动识别

插件会识别导出的 `defineHtml(...)` 组件：

```ts
export const Button = defineHtml(`<button><slot></slot></button>`);
```

```ts
const Button = defineHtml(`<button><slot></slot></button>`);

export { Button };
```

```ts
export default defineHtml(`<button><slot></slot></button>`);
```

::: tip
`.elf.ts` 和文件头 pragma 仍然兼容，但普通 `.ts/.tsx` 已经是推荐写法。
:::

## 诊断选项

```ts
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true,
});
```

beta.13 起，插件会在 Vite 启动阶段检查 Core、Compiler 与 Vite Plugin 的精确 beta 版本和独立编译协议，错配会在首次模板编译前失败。

工具链可以通过构建期回调读取统一数据；这些数据不会进入浏览器生产包：

```ts
elfuiMacroPlugin({
  onMetadata(metadata, id) {
    // Metadata v2：组件、Fragment、源码范围和归属
  },
  onDiagnostics(diagnostics, id) {
    // 同一文件每次 transform 都会回调，空数组表示清除旧诊断
  },
});
```

::: tip
组件库建议开启；普通应用可以先使用默认配置。
:::
