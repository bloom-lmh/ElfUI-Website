# Compile diagnostics

`@elfui/vite-plugin` will give build-time diagnostics for macro components.

Common diagnoses:

| Scene                                                               | Processing                                                             |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Import macro API but not export `defineHtml()`                      | Add component export or delete macro import                            |
| Use removed macro aliases                                           | Change to new APIs such as `defineProps` / `defineEmits`               |
| The pragma position is illegal                                      | Move to the top of the file or use normal `.ts` export                 |
| `defineFragment()` is exported or not assigned to a local `const`   | Keep the fragment local: `const Card = defineFragment(...)`            |
| A fragment template is dynamic or used as an attribute value        | Return a static template literal and use fragments as template content |
| A fragment name conflicts with another local component              | Rename one local binding                                               |
| Named fragments form a dependency cycle                             | Break the cycle; fragments are non-recursive compile-time slices       |
| A key inside `fragment` `array.map()` is mistaken for list identity | Use `v-for :key` when stable reorder identity is required              |

During Vite startup, ElfUI also checks the exact beta versions and compiler protocols of Core,
Compiler, and Vite Plugin. A mismatch stops before the first template compile with
`ELF_VITE_VERSION_MISMATCH` or `ELF_VITE_PROTOCOL_MISMATCH`, resolved paths, a repair command, and a
Vite cache cleanup hint.

## strict mode

```ts
elfuiMacroPlugin({
  strictDiagnostics: true,
  templateTypeCheck: true,
});
```

`strictDiagnostics` is suitable for CI; `templateTypeCheck` is suitable for component libraries and pre-beta quality gates.
