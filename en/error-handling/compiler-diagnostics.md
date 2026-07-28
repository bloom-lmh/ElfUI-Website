# Compile diagnostics

`@elfui/vite-plugin` will give build-time diagnostics for macro components.

Common diagnoses:

| Scene                                                             | Processing                                                             |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Import macro API but not export `defineHtml()`                    | Add component export or delete macro import                            |
| Use removed macro aliases                                         | Change to new APIs such as `defineProps` / `defineEmits`               |
| The pragma position is illegal                                    | Move to the top of the file or use normal `.ts` export                 |
| `defineFragment()` is exported or not assigned to a local `const` | Keep the fragment local: `const Card = defineFragment(...)`            |
| A fragment template is dynamic or used as an attribute value      | Return a static template literal and use fragments as template content |
| A fragment name conflicts with another local component            | Rename one local binding                                               |

## strict mode

```ts
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true,
});
```

`strictDiagnostics` is suitable for CI; `templateTypeCheck` is suitable for component libraries and pre-beta quality gates.
