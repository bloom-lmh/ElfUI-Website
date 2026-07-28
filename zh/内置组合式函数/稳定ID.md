---
title: 稳定 ID
---

# 稳定 ID

`useId()` 在组件同步 setup 中生成稳定、文档内唯一的字符串，适合连接 `label`、输入框和 ARIA 属性：

```ts
import { defineHtml, useComputed, useId } from "@elfui/core";

const generatedId = useId("input");
const inputId = useComputed(() => props.id || generatedId);

export const Field = defineHtml(`
  <label :for=${inputId}>名称</label>
  <input :id=${inputId} />
`);
```

同一 Custom Element 实例断开并重新连接时，同一调用位置会得到相同 ID。不同 App、组件实例和调用位置不会冲突。实现不使用随机数；前缀只提高可读性，不承担唯一性。

`useId()` 必须在 setup 同步阶段、以稳定顺序调用，不要放在条件分支中。beta.13 尚未承诺 SSR 与客户端 hydration 之间复现相同 ID；用户显式传入的 ID 应始终优先。
