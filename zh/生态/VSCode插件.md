---
title: VS Code 插件
---

# VS Code 插件

ElfUI Language Tools 面向普通 `.ts/.tsx` 宏组件文件。它能识别导出的 `defineHtml(...)` 组件，并与 `@elfui/vite-plugin` 使用同一套模板编译模型。

## 安装

Marketplace 发布后，在 VS Code 扩展市场搜索 **ElfUI Language Tools**，或执行：

```bash
code --install-extension SWUST-WEBLAB-LMH.elfui-language-features
```

每个版本 tag 也会在 [Language Tools Releases](https://github.com/bloom-lmh/ElfUI-Language-Tools/releases) 附带可安装的 VSIX。Marketplace 上架前，可在仓库执行 `pnpm package:vsix` 构建本地 VSIX。

## 提供什么

- HTML 标签、ElfUI 组件标签、props、事件、指令、`${...}` 表达式与 `v-for` 局部变量补全。
- 与编译器一致的模板、props、emits、slots、model 与局部组件注册诊断。
- `defineHtml(\`...\`)`、`defineStyle(\`...\`)` 中的 HTML/CSS 格式化、CSS 补全、悬停与 CSS 变量建议。
- 跳转定义、引用、重命名、文档链接、代码片段、组件高亮和工作区组件索引。

打开已配置 `@elfui/vite-plugin` 的 ElfUI 项目后，扩展会自动发现项目配置。
