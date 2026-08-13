---
title: Language Tools
---
# VS Code plugin

ElfUI Language Tools targets the common `.ts/.tsx` macro component file. It recognizes the exported `defineHtml(...)` components and compiles the model using the same set of templates as `@elfui/vite-plugin`.

## Install

After the Marketplace is released, search for **ElfUI Language Tools** in the VS Code extension market, or execute:

```bash
code --install-extension SWUST-WEBLAB-LMH.elfui-language-features
```

Each version tag also comes with installable VSIX in [Language Tools Releases](https://github.com/bloom-lmh/ElfUI-Language-Tools/releases). Before listing on Marketplace, you can execute `pnpm package:vsix` in the warehouse to build local VSIX.

## what to offer

- HTML tags, ElfUI component tags, props, events, instructions, `${...}` expressions and `v-for` local variable completion.
- Compiler-consistent diagnostics for templates, props, emits, slots, models, and local component registrations.
- HTML/CSS formatting, completion, hover, and CSS variable suggestions in `defineHtml(\`...\`)` and `defineStyle(\`...\`)`.
- Jump to definitions, references, renaming, documentation links, code snippets, component highlighting, and workspace component indexing.

After opening an ElfUI project that has `@elfui/vite-plugin` configured, the extension automatically discovers the project configuration.
