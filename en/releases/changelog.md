---
title: Changelog
---

# Changelog

This page records user-visible changes in the synchronized ElfUI framework package group:
`@elfui/shared`, `@elfui/reactivity`, `@elfui/runtime`, `@elfui/compiler-template`, `@elfui/compiler`,
`@elfui/core`, and `@elfui/vite-plugin`.

ElfUI is still in beta. Keep `@elfui/core` and `@elfui/vite-plugin` on the same exact version. When a
release changes the compiler/runtime protocol, mixed versions are unsupported.

## v0.1.0-beta.14 — 2026-07-28

- Fixed lifecycle ordering where a parent `onMounted()` could run before a child Custom Element
  completed setup. Parent mounted hooks can now reliably call child `defineExpose()` APIs through
  `useTemplateRef()`.
- Added the `overrideNative` option to `defineExpose()`. Components can explicitly enhance native
  semantics such as `focus()` and `blur()`; ordinary commands such as `scrollTo()` and `remove()`
  should still use component-specific names.
- Fixed Teleport subtrees losing Provider and App injection context. Their logical component
  parent, nearest-Provider precedence, and DevTools ownership now remain stable after moving to
  `body`.
- App or component teardown now removes teleported nodes and stops their detached effect scopes.
- Compiler and Runtime add development-only template-node source markers for components, named
  Fragments, and source ranges, enabling precise ElfUI DevTools inspection. Production builds
  remove all marker code.
- Debug markers use a compact codegen protocol. The 100-component production fixture is about
  200.5 KB min / 2.47 KB gzip / 1.09 KB Brotli, with a separate development-size guard.
- All seven framework packages are released as `0.1.0-beta.14`; Core and Vite Plugin must use the
  exact same version.

## v0.1.0-beta.13 — 2026-07-28

- Core, Compiler, and Vite Plugin now expose an independent compiler protocol and perform an exact
  beta-version check during Vite startup, before template compilation.
- Vite Plugin adds build-only `onMetadata` and `onDiagnostics` hooks for Language Tools, DevTools,
  and documentation generators without shipping the data in production bundles.
- `MacroComponentMetadata` moves to schema v2 with structured component data, Fragment
  dependencies/ownership/identity, source ranges, and diagnostic summaries while retaining a v1
  adapter.
- Fragment cycles are diagnosed at build time, and tools can identify the index-identity boundary
  of anonymous `array.map()` fragments.
- Fixed beta.12 named Fragment bindings capturing only their initial values. `:prop` and replaced
  `v-bind` objects now update existing DOM bindings without recreating the Fragment.
- Added `useId()` with stable client-side identity across component updates, multiple Apps, and
  Custom Element reconnects.
- App plugins may return synchronous disposers. `app.unmount()` runs them in LIFO order after root
  teardown and isolates cleanup errors.
- Form-associated Runtime now bridges native reset, disabled, and state-restore callbacks, with
  real Chromium host-matrix coverage.

## v0.1.0-beta.12 — 2026-07-28

### Compile-time fragments

- Added the `fragment\`...\`` anonymous template slice API.
- Added the `const Card = defineFragment<Props>((props) => \`...\`)` local named slice API.
- Fragment tags are transparent compile-time expansions: they do not register Custom Elements,
  create Shadow Roots, or own independent lifecycle scopes.
- Named fragment attributes are compiled into a readonly props object. Exported fragments,
  dynamic fragment templates, and unsupported fragment boundaries produce compiler diagnostics.
- The Vite macro plugin recognizes the new macro imports and keeps Core/compiler versions aligned.

### Release alignment

- All seven framework packages are published as `0.1.0-beta.12` and must be consumed at the same
  version.
- `@elfui/router` keeps its compatible peer range `>=0.1.0-beta.11 <0.2.0`; fragments do not change
  the runtime/router protocol.

## v0.1.0-beta.9 — 2026-07-22

- Fixed macro codegen so `RenderContext.directives` reaches `resolveDirective()` in both root templates and derived `v-for` contexts.
- Consolidated `defineDirective` on the single-argument form `const loading = defineDirective(definition)`. The variable name is normalized to a kebab-case template name; the legacy two-argument form is no longer supported.
- Component-local directives continue to take precedence over same-name directives registered by the current App.
- Component unmount now releases live `v-if`/`v-for` detached scopes so directive cleanup hooks run reliably.

## v0.1.0-beta.8 — 2026-07-22

### Lifecycle ownership and API consolidation

- `onMounted()` can return a synchronous or asynchronous cleanup callback. Cleanups run in LIFO order after `onBeforeUnmount` and before component DOM and scopes are released; a late asynchronous cleanup runs immediately.
- The canonical public surface includes `onMounted`, `onUnmounted`, `useComputed`, `useEffect`, explicit-source `watch`, `theme`, `defineDirective`, and `app.directive`.
- Removed the beta aliases `onMount`, `onUnmount`, `computed`, `watchEffect`, `watchPostEffect`, `watchSyncEffect`, and `useTheme`, plus the process-global public `directive()` registry. Local directives use `defineDirective()`; application-wide directives use `app.directive()`.
- Added lifecycle cleanup regression coverage and public API boundary checks.

### Performance

- Same-length lists with unchanged key order now update item/index state without allocating the full keyed-diff structures or moving DOM.
- Macro-generated components lazily cache and clone larger pure-static native HTML/SVG subtrees. Directives, refs, components, custom elements, slots, and dynamic boundaries remain on the normal code path.
- Components without lifecycle hooks share frozen empty hook tables and detach a list only when its first hook is registered, avoiding eleven unconditional empty arrays per instance.
- Dynamic style bindings reuse two declaration buffers, so repeated updates no longer allocate a `Map` per update or per string fragment.
- The complete Core facade is now attributed by workspace package. Its aggregate budget is gzip 16.5 KB / Brotli 14.9 KB, while the real tree-shaken application budget remains gzip 9.8 KB / Brotli 8.9 KB.
- `verify:release` now enforces size budgets and relative real-Chromium performance checks in addition to external-tool, host-framework, multi-runtime, and packed-consumer verification.

### Migration

Update imports directly. When an external resource is created in `onMounted`, prefer returning its cleanup:

```ts
onMounted(() => {
  const chart = createChart(canvas.value!);
  return () => chart.destroy();
});
```

Migrate `watchEffect(fn)` to `useEffect(fn, { flush: "pre" })` to preserve its former default scheduling. Use `flush: "post"` and `flush: "sync"` for the removed shortcut variants.

## v0.1.0-beta.7 — 2026-07-22

### Less repetitive macro syntax

- Added `defineHtml(\`...\`)`; `${...}` holes continue to compile as reactive expressions.
- Added `defineStyle(\`...\`)`and`defineStyle(styleA, styleB)` for combining imported styles.
- Removed the public exports, source implementations, and legacy compiler branches for `html`, `css`, and `MacroHtmlTemplate`; this is a breaking beta.7 change.
- Removed obsolete compiler-diagnostic paths for `useName`, `useProps`, `useEmit`, and `useStyle`, and cleaned stale `useState` examples from source comments.
- Arbitrary runtime-generated HTML strings remain unsupported, so this change adds no runtime template compiler.

### Migration

Upgrade Core and the Vite plug-in together:

```bash
pnpm up @elfui/core@0.1.0-beta.7 @elfui/vite-plugin@0.1.0-beta.7
```

Remove `html` and `css` imports, then move each tagged template directly into its macro call:

```ts
import { defineHtml, defineStyle } from "@elfui/core";

defineStyle(`:host { display: block; }`);
export const Button = defineHtml(`<button><slot></slot></button>`);
```

Imported styles still work with `defineStyle(baseStyle, themeStyle)`. Old imports now produce a TypeScript or bundler error.

## v0.1.0-beta.6 — 2026-07-21

### Unified application entry

- `@elfui/core` is now the only direct runtime dependency for normal applications and component
  libraries.
- Stable runtime, reactivity, lifecycle, model, directive, plug-in, and built-in rendering APIs are
  available from Core.
- Compiler-generated helpers now use `@elfui/core/internal`. This subpath is a compiler protocol and
  must not be imported by application code.
- `@elfui/runtime`, `@elfui/reactivity`, and `@elfui/shared` remain independently published for
  low-level or standalone use, but normal applications do not declare them directly.

```bash
pnpm add @elfui/core@0.1.0-beta.6
pnpm add -D @elfui/vite-plugin@0.1.0-beta.6
```

### Public API and type corrections

- `directive()` and lifecycle APIs including `onMounted()` and `onUnmounted()` are exported by
  `@elfui/core`.
- Writable ref, computed, and model `set()` methods return `void`, so they can be used naturally in
  callbacks declared as returning `void`.
- `defineEmits<Interface>()` accepts finite event interfaces as well as readonly event-name arrays.
- `defineExpose<Interface>()` accepts ordinary finite-key interfaces without requiring a string index
  signature.
- Directive generics, primitive prop constructors, model values, and strict optional properties have
  more accurate inference.
- The runtime `useModel()` composable is no longer mistaken for a removed compiler macro alias.

### Compiler and integration stability

- Generated helpers and the public Core entry now share a versioned internal boundary.
- Template references, event contracts, list/control-flow values, and source diagnostics received
  stricter regression coverage.
- The release gate covers external canvas/SVG/WebGL tools, Floating UI-style overlays, observers,
  Worker/WASM resources, repeated mount/unmount cleanup, and multiple runtime copies.
- Native Custom Elements and React, Vue, Svelte, and Angular host integration contracts are exercised
  in a real browser.

### Upgrade notes

Upgrade Core and the Vite plug-in together, reinstall dependencies, and clear Vite's dependency cache:

```bash
pnpm up @elfui/core@0.1.0-beta.6 @elfui/vite-plugin@0.1.0-beta.6
pnpm install
```

Delete `node_modules/.vite` or restart Vite if an old prebundle remains. These messages usually mean the
project is mixing pre-beta.6 packages with beta.6 source:

- `does not provide an export named 'directive'`
- `Found ElfUI component pragma, but no import from "elfui"`

After both packages are on beta.6, macro components should import from `@elfui/core`; do not change them
back to the legacy `elfui` specifier to silence the old plug-in.

## v0.1.0-beta.5 — 2026-07-21

- Stabilized generated template integration and compiler/runtime code-generation parity.
- Improved template-ref portability and nested runtime-value unwrapping.
- Added regression coverage for generated macro components and development source metadata.

## v0.1.0-beta.4 — 2026-07-17

- Hardened mounted/unmounted lifecycle behavior and external-resource cleanup.
- Added browser integration matrices for external tools, React, Vue, Svelte, Angular, native Custom
  Elements, and multiple runtime copies.
- Expanded DevTools metadata for component trees, reactive effects, template bindings, model/control
  flow, and source locations.
- Added SSR, development-boundary, generated-code, size, package-artifact, and browser release gates.
- Improved prop inference, array effect tracking, event contracts, interpolation parsing, host
  properties, directives, and observer target handling.

## v0.1.0-beta.3 — 2026-07-14

- Corrected prerelease publishing so workspace dependencies resolve to published packages safely.
- Added dependency scanning and CodeQL automation.
- Refined README links and project branding assets.

## v0.1.0-beta.2 — 2026-07-12

- Established `@elfui/core` as the macro component package name.
- Completed public package metadata, package README files, exports, and publish-artifact validation.
- Changed releases to version-tag-triggered trusted publishing and fixed CI workspace linking and
  compiler global handling.

## v0.1.0-beta.1 — 2026-07-12

- Published the first public beta package group.
- Established the initial compiler-first macro component, reactivity, Custom Element runtime, and Vite
  plug-in baseline.

This historical entry is intentionally concise because it predates the tagged release-note workflow.
Starting with beta.6, every release should add its user-visible changes and migration requirements here
before publishing.
