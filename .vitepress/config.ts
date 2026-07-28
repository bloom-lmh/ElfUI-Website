import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { elfuiMacroPlugin as publishedElfuiMacroPlugin } from "@elfui/vite-plugin";
import { defineConfig, type DefaultTheme } from "vitepress";

const elfuiRoot = fileURLToPath(new URL("../../elfui", import.meta.url));
const localPluginEntry = `${elfuiRoot}/packages/vite-plugin/dist/index.js`;
const useLocalPackages =
  process.env.ELFUI_USE_LOCAL_PACKAGES !== "false" &&
  existsSync(localPluginEntry);

const elfuiMacroPlugin = useLocalPackages
  ? (
      (await import(
        /* @vite-ignore */ pathToFileURL(localPluginEntry).href
      )) as typeof import("@elfui/vite-plugin")
    ).elfuiMacroPlugin
  : publishedElfuiMacroPlugin;

const localAliases = useLocalPackages
  ? {
      "@elfui/core/internal": `${elfuiRoot}/packages/core/dist/internal.js`,
      "@elfui/core": `${elfuiRoot}/packages/core/dist/index.js`,
      "@elfui/runtime/internal": `${elfuiRoot}/packages/runtime/dist/internal.js`,
      "@elfui/runtime": `${elfuiRoot}/packages/runtime/dist/index.js`,
      "@elfui/reactivity": `${elfuiRoot}/packages/reactivity/dist/index.js`,
      "@elfui/shared": `${elfuiRoot}/packages/shared/dist/index.js`,
    }
  : {};

type Sidebar = DefaultTheme.SidebarItem[];

const playgroundUrl =
  "https://stackblitz.com/fork/github/bloom-lmh/elfui-playground?startScript=dev&title=ElfUI%20Playground";

const section = (
  text: string,
  items: [string, string][],
): DefaultTheme.SidebarItem => ({
  text,
  collapsed: true,
  items: items.map(([text, link]) => ({ text, link })),
});

const englishSidebar: Sidebar = [
  section("Getting Started", [
    ["Introduction", "/en/guide/introduction"],
    ["Installation", "/en/guide/installation"],
    ["Quick Start", "/en/guide/quick-start"],
    ["Packages and Entry Points", "/en/guide/packages"],
  ]),
  section("Template Syntax", [
    ["Overview", "/en/template-syntax/overview"],
    ["Text and Attributes", "/en/template-syntax/text-and-attributes"],
    ["Conditions and Lists", "/en/template-syntax/conditions-and-lists"],
    [
      "Local Template Fragments",
      "/en/template-syntax/local-template-fragments",
    ],
    ["Event Binding", "/en/template-syntax/event-binding"],
    ["Form Binding", "/en/template-syntax/form-binding"],
    ["Class and Style", "/en/template-syntax/class-and-style"],
  ]),
  section("Components", [
    ["Overview", "/en/components/overview"],
    ["Defining Components", "/en/components/defining-components"],
    ["Props", "/en/components/props"],
    ["Events", "/en/components/events"],
    ["v-model", "/en/components/v-model"],
    ["Slots", "/en/components/slots"],
    ["Component Communication", "/en/components/communication"],
    ["Component Expose", "/en/components/expose"],
    ["Local Components", "/en/components/local-components"],
    ["Dynamic Components", "/en/components/dynamic-components"],
    ["Component Reuse", "/en/components/reuse"],
  ]),
  section("Directives", [
    ["Built-in Directives", "/en/directives/built-in"],
    ["Event Modifiers", "/en/directives/event-modifiers"],
    ["Custom Directives", "/en/directives/custom-directives"],
  ]),
  section("Reactivity", [
    ["Reactive State", "/en/reactivity/state"],
    ["Computed", "/en/reactivity/computed"],
    ["Effects", "/en/reactivity/effects"],
    ["Watchers", "/en/reactivity/watchers"],
    ["Reactivity Utilities", "/en/reactivity/utilities"],
  ]),
  section("Lifecycle", [
    ["Overview", "/en/lifecycle/overview"],
    ["Mounting and Unmounting", "/en/lifecycle/mounting-and-unmounting"],
    ["Update Phase", "/en/lifecycle/update-phase"],
    ["KeepAlive Lifecycle", "/en/lifecycle/keep-alive"],
  ]),
  section("Integration", [
    ["External Tools", "/en/integration/external-tools"],
    ["Host Frameworks", "/en/integration/host-frameworks"],
  ]),
  section("Styles", [
    ["Component Styles", "/en/styles/component-styles"],
    ["Shadow DOM", "/en/styles/shadow-dom"],
    ["Themes", "/en/styles/themes"],
    ["Global Styles", "/en/styles/global-styles"],
  ]),
  section("Built-in Composables", [
    ["Overview", "/en/composables/overview"],
    ["Host and Root Node", "/en/composables/host-and-root"],
    ["Template Refs", "/en/composables/template-refs"],
    ["DOM Events", "/en/composables/dom-events"],
    ["Observers", "/en/composables/observers"],
    ["Interaction Control", "/en/composables/interaction-control"],
    ["Form Controls", "/en/composables/form-controls"],
  ]),
  section("Built-in Components", [
    ["Teleport", "/en/built-ins/teleport"],
    ["Transition", "/en/built-ins/transition"],
    ["TransitionGroup", "/en/built-ins/transition-group"],
    ["KeepAlive", "/en/built-ins/keep-alive"],
    ["Suspense", "/en/built-ins/suspense"],
  ]),
  section("Router", [
    ["Quick Start", "/en/router/quick-start"],
    ["Route Configuration", "/en/router/configuration"],
    ["Navigation", "/en/router/navigation"],
    ["Route View", "/en/router/route-view"],
    ["Route Guards", "/en/router/guards"],
  ]),
  section("Configuration", [
    ["Global Configuration", "/en/configuration/global"],
    ["CSP and Bundle Size", "/en/configuration/csp-and-bundle-size"],
  ]),
  section("Error Handling", [
    ["Overview", "/en/error-handling/overview"],
    ["Global Error Handling", "/en/error-handling/global"],
    ["Component Error Capture", "/en/error-handling/component-capture"],
    ["Error Boundaries", "/en/error-handling/error-boundaries"],
    ["Compiler Diagnostics", "/en/error-handling/compiler-diagnostics"],
  ]),
  section("Plugins", [
    ["Overview", "/en/plugins/overview"],
    ["Using Plugins", "/en/plugins/using-plugins"],
    ["Custom Plugins", "/en/plugins/custom-plugins"],
  ]),
  section("Ecosystem", [
    ["Overview", "/en/ecosystem/overview"],
    ["Vite Plugin", "/en/ecosystem/vite-plugin"],
    ["Router", "/en/ecosystem/router"],
    ["Chain Components", "/en/ecosystem/chain"],
    ["VS Code Plugin", "/en/ecosystem/language-tools"],
  ]),
  section("Migration", [
    ["From Vue", "/en/migration/from-vue"],
    ["From Chain to Components", "/en/migration/from-chain"],
    ["Deprecated APIs", "/en/migration/deprecated-apis"],
  ]),
  section("API Reference", [
    ["@elfui/core", "/en/api/core"],
    ["Reactivity", "/en/api/reactivity"],
    ["Runtime", "/en/api/runtime"],
    ["Router", "/en/api/router"],
    ["Chain", "/en/api/chain"],
  ]),
  section("Release Notes", [["Changelog", "/en/releases/changelog"]]),
];

const zhSidebar: Sidebar = [
  section("起步", [
    ["简介", "/zh/起步/简介"],
    ["安装", "/zh/起步/安装"],
    ["快速开始", "/zh/起步/快速开始"],
    ["包与入口", "/zh/起步/包与入口"],
  ]),
  section("模板语法", [
    ["概览", "/zh/模板语法/概览"],
    ["文本与属性", "/zh/模板语法/文本与属性"],
    ["条件与列表", "/zh/模板语法/条件与列表"],
    ["局部模板片段", "/zh/模板语法/局部模板片段"],
    ["事件绑定", "/zh/模板语法/事件绑定"],
    ["表单绑定", "/zh/模板语法/表单绑定"],
    ["class 与 style", "/zh/模板语法/class与style"],
  ]),
  section("组件", [
    ["概览", "/zh/组件/概览"],
    ["定义组件", "/zh/组件/定义组件"],
    ["Props", "/zh/组件/props"],
    ["事件", "/zh/组件/事件"],
    ["v-model", "/zh/组件/v-model"],
    ["插槽", "/zh/组件/插槽"],
    ["组件通信", "/zh/组件/组件通信"],
    ["组件暴露", "/zh/组件/组件暴露"],
    ["局部组件", "/zh/组件/局部组件"],
    ["动态组件", "/zh/组件/动态组件"],
    ["组件复用", "/zh/组件/组件复用"],
  ]),

  section("指令", [
    ["内置指令", "/zh/指令/内置指令"],
    ["事件修饰符", "/zh/指令/事件修饰符"],
    ["自定义指令", "/zh/指令/自定义指令"],
  ]),
  section("响应式", [
    ["响应式状态", "/zh/响应式/响应式状态"],
    ["计算属性", "/zh/响应式/计算属性"],
    ["副作用", "/zh/响应式/副作用"],
    ["监听器", "/zh/响应式/监听器"],
    ["响应式工具", "/zh/响应式/响应式工具"],
  ]),
  section("生命周期", [
    ["概览", "/zh/生命周期/概览"],
    ["挂载与卸载", "/zh/生命周期/挂载与卸载"],
    ["更新阶段", "/zh/生命周期/更新阶段"],
    ["KeepAlive 生命周期", "/zh/生命周期/KeepAlive生命周期"],
  ]),
  section("集成", [
    ["外部工具", "/zh/集成/外部工具"],
    ["宿主框架", "/zh/集成/宿主框架"],
  ]),
  section("样式", [
    ["组件样式", "/zh/样式/组件样式"],
    ["Shadow DOM", "/zh/样式/ShadowDOM"],
    ["主题", "/zh/样式/主题"],
    ["全局样式", "/zh/样式/全局样式"],
  ]),
  section("内置组合式函数", [
    ["概览", "/zh/内置组合式函数/概览"],
    ["Host 与根节点", "/zh/内置组合式函数/Host与根节点"],
    ["模板引用", "/zh/内置组合式函数/模板引用"],
    ["DOM 事件", "/zh/内置组合式函数/DOM事件"],
    ["观察器", "/zh/内置组合式函数/观察器"],
    ["交互控制", "/zh/内置组合式函数/交互控制"],
    ["表单控件", "/zh/内置组合式函数/表单控件"],
  ]),
  section("内置组件", [
    ["Teleport", "/zh/内置组件/Teleport"],
    ["Transition", "/zh/内置组件/Transition"],
    ["TransitionGroup", "/zh/内置组件/TransitionGroup"],
    ["KeepAlive", "/zh/内置组件/KeepAlive"],
    ["Suspense", "/zh/内置组件/Suspense"],
  ]),
  section("路由", [
    ["快速开始", "/zh/路由/快速开始"],
    ["路由配置", "/zh/路由/路由配置"],
    ["导航", "/zh/路由/导航"],
    ["路由视图", "/zh/路由/路由视图"],
    ["路由守卫", "/zh/路由/路由守卫"],
  ]),
  section("配置", [
    ["全局配置", "/zh/配置/全局配置"],
    ["CSP 与体积", "/zh/配置/CSP与体积"],
  ]),
  section("错误处理", [
    ["概览", "/zh/错误处理/概览"],
    ["全局错误处理", "/zh/错误处理/全局错误处理"],
    ["组件错误捕获", "/zh/错误处理/组件错误捕获"],
    ["错误边界", "/zh/错误处理/错误边界"],
    ["编译诊断", "/zh/错误处理/编译诊断"],
  ]),
  section("插件", [
    ["概览", "/zh/插件/概览"],
    ["使用插件", "/zh/插件/使用插件"],
    ["自定义插件", "/zh/插件/自定义插件"],
  ]),
  section("生态", [
    ["总览", "/zh/生态/总览"],
    ["Vite 插件", "/zh/生态/Vite插件"],
    ["Router", "/zh/生态/Router"],
    ["Chain 链式组件", "/zh/生态/Chain链式组件"],
    ["VS Code 插件", "/zh/生态/VSCode插件"],
  ]),
  section("迁移", [
    ["从 Vue 迁移", "/zh/迁移/从Vue迁移"],
    ["从链式迁移到组件", "/zh/迁移/从链式迁移到组件"],
    ["废弃 API", "/zh/迁移/废弃API"],
  ]),
  section("API 参考", [
    ["@elfui/core", "/zh/API参考/elfui"],
    ["reactivity", "/zh/API参考/reactivity"],
    ["runtime", "/zh/API参考/runtime"],
    ["router", "/zh/API参考/router"],
    ["chain", "/zh/API参考/chain"],
  ]),
  section("版本记录", [["变更日志", "/zh/版本/变更日志"]]),
];

const baseTheme = {
  logo: "/logo.png",
  // English and Chinese routes use translated directory names. Fall back to
  // each locale's home page instead of generating a non-existent equivalent URL.
  i18nRouting: false,
  search: {
    provider: "local" as const,
    options: {
      locales: {
        zh: {
          translations: {
            button: {
              buttonText: "搜索",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              displayDetails: "显示详情",
              resetButtonTitle: "清空搜索",
              backButtonTitle: "关闭搜索",
              noResultsText: "没有找到相关结果",
              footer: {
                selectText: "选择",
                selectKeyAriaLabel: "回车",
                navigateText: "切换",
                navigateUpKeyAriaLabel: "上方向键",
                navigateDownKeyAriaLabel: "下方向键",
                closeText: "关闭",
                closeKeyAriaLabel: "Esc",
              },
            },
          },
        },
      },
    },
  },
  socialLinks: [
    { icon: "github" as const, link: "https://github.com/bloom-lmh/elfui" },
  ],
  outline: { level: [2, 3] as [2, 3] },
};

const englishTheme: DefaultTheme.Config = {
  ...baseTheme,
  nav: [
    { text: "Home", link: "/en/" },
    { text: "API", link: "/en/api/core" },
    {
      text: "Playground",
      link: playgroundUrl,
      target: "_blank",
      rel: "noreferrer",
    },
  ],
  sidebar: englishSidebar,
  outline: { ...baseTheme.outline, label: "On this page" },
  docFooter: { prev: "Previous", next: "Next" },
  returnToTopLabel: "Back to top",
};

const chineseTheme: DefaultTheme.Config = {
  ...baseTheme,
  nav: [
    { text: "首页", link: "/zh/" },
    { text: "API", link: "/zh/API参考/elfui" },
    {
      text: "演练场",
      link: playgroundUrl,
      target: "_blank",
      rel: "noreferrer",
    },
  ],
  sidebar: zhSidebar,
  outline: { ...baseTheme.outline, label: "本页目录" },
  docFooter: { prev: "上一页", next: "下一页" },
  returnToTopLabel: "回到顶部",
};

export default defineConfig({
  title: "ElfUI",
  description: "A compiler-first framework for native Web Components",
  cleanUrls: true,
  appearance: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
  ],
  themeConfig: {
    search: baseTheme.search,
  },
  locales: {
    root: { lang: "en" },
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
      themeConfig: englishTheme,
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      themeConfig: chineseTheme,
    },
  },
  vite: {
    server: {
      // scripts/dev.mjs preselects a free port; direct VitePress usage starts at 5173.
      port: Number(process.env.ELFUI_DOCS_PORT ?? 5173),
      strictPort: false,
    },
    plugins: [elfuiMacroPlugin({ macroImport: "@elfui/core" })],
    resolve: {
      alias: {
        elfui: "@elfui/core",
        ...localAliases,
      },
    },
  },
});
