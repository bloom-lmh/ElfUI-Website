# Custom plugin

Plugins can be written as functions:

```ts
import type { ElfUIAppPluginFn } from "@elfui/core";

export const focusPlugin: ElfUIAppPluginFn = (app) => {
  app.directive("focus", {
    mounted(el) {
      (el as HTMLElement).focus();
    },
  });
};
```

It can also be written as an object:

```ts
import type { ElfUIAppPluginObject } from "@elfui/core";

export const appPlugin: ElfUIAppPluginObject<{ appName?: string }> = {
  install(app, options) {
    if (options?.appName) {
      app.config.globalProperties.appName = options.appName;
    }
  },
};
```

## App instance

What the plug-in gets is the application instance created by `createApp()`:

| Members                    | Role                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `app.directive(name, def)` | Register the command of the current App; commands with the same name will not be used in conjunction with other Apps          |
| `app.component(component)` | Ensure that the component is registered to the browser according to its own compile-time tag `customElements` global registry |
| `app.provide(key, value)`  | Inject application-level dependencies                                                                                         |
| `app.config`               | Application level configuration                                                                                               |

::: warning
In the same app instance, the same plug-in object will only be installed once. `provide/config/directive` is isolated by App; Custom Element tags are managed by the browser global registry, so different Apps cannot register different constructors for the same tag.
:::

## Cleaning up App-owned resources

A plugin may return a synchronous disposer. `app.unmount()` removes the root component first and
then runs plugin disposers in reverse installation order:

```ts
export const keyboardPlugin: ElfUIAppPluginFn = () => {
  window.addEventListener("keydown", onKeydown);
  return () => window.removeEventListener("keydown", onKeydown);
};
```

Each disposer runs once. If one throws, the error is routed through `app.config.errorHandler` and
the remaining disposers still run.
