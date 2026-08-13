---
title: Ecosystem
---
# Ecological Overview

ElfUI keeps the core of the framework focused and puts larger capabilities with different iteration rhythms into independent projects. New Macro applications often start with scaffolding, with additional parts added as needed.

```bash
pnpm create elfui@beta my-app --install
```

| Projects | Responsibilities | When to use |
| --- | --- | --- |
| [ElfUI](https://github.com/bloom-lmh/ElfUI) | Framework core | Macro components, reactivity, runtime, compiler and Vite integration. |
| [create-elfui](https://github.com/bloom-lmh/Create-ElfUI) | Project scaffolding | Create a Vite application and add Router and quality tools as needed. |
| [ElfUI Router](https://github.com/bloom-lmh/ElfUI-Router) | Routing | Need client navigation, but don't want Router to go into the core package. |
| [ElfUI Kit](https://github.com/bloom-lmh/ElfUI-Kit) | UI component library | Use official components to build product interfaces. |
| [ElfUI Extensions](https://github.com/bloom-lmh/ElfUI-Extensions) | Optional extensions | Use Chain to integrate with future platforms. |
| [ElfUI Language Tools](https://github.com/bloom-lmh/ElfUI-Language-Tools) | Editor Tools | Use VS Code plug-ins and language services. |
| [ElfUI Playground](https://stackblitz.com/fork/github/bloom-lmh/elfui-playground?startScript=dev&title=ElfUI%20Playground) | Online development environment | Edit, run, and preview ElfUI examples in the browser without a local installation. |
| [ElfUI Website](https://github.com/bloom-lmh/ElfUI-Website) | Documentation Site | Check out the complete guide and API reference. |

::: tip Try it now
[ElfUI Playground](https://stackblitz.com/fork/github/bloom-lmh/elfui-playground?startScript=dev&title=ElfUI%20Playground) creates an isolated StackBlitz workspace, making it useful for quickly testing APIs, reproducing an issue, and sharing a minimal example.
:::

The default route for new projects is the Macro component plus `@elfui/vite-plugin`. Chain is an extension prepared for old pages, no-build scenarios and chain builder models. It is not the second default main line.
