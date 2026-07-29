---
title: CSP 与体积
---

# CSP 与体积

宏组件主线在构建期编译模板，浏览器运行时不需要 `new Function`，更适合严格 CSP。

```ts
import { defineHtml } from "@elfui/core";
```

`@elfui/core` 主入口不包含 runtime compiler。仓库当前真实 tree-shaken 应用 fixture 为 gzip 10.04 KB / Brotli 9.07 KB；实际结果会随导入 API 与 bundler 变化。

发布门禁会自动检查真实应用、Core 全量聚合入口、Runtime、Reactivity 四组 gzip/Brotli 预算。当前“实测值/预算”分别为：真实应用 gzip 10.04/10.2 KB、Brotli 9.07/9.2 KB；Core 全量 facade gzip 17.57/17.8 KB、Brotli 15.86/16.1 KB；Runtime gzip 15.25/15.5 KB、Brotli 13.83/14.1 KB；Reactivity gzip 5.17/5.5 KB、Brotli 4.71/5.0 KB。聚合入口刻意包含全部稳定导出，用于监控公共表面积，不代表一般应用的实际下载体积。门禁同时验证生产 bundle 已裁掉 DEV 分支，发布 ESM 不会写入全局 `__DEV__` 标记。

## Chain 的边界

`@elfui/chain` 支持：

```ts
ElfUI.createComponent().template(`<button>{{ count }}</button>`);
```

这需要 runtime compiler，体积约 21.19 KB，也可能触及更严格的 CSP 限制。它适合旧站渐进嵌入、小 demo 或低构建约束环境，不是新项目主线。

## 建议

::: tip
生产应用优先：
:::

1. 使用 `@elfui/core` 主入口。
2. 使用 `@elfui/vite-plugin` 编译宏组件。
3. 把链式组件限制在生态扩展或迁移期代码里。
