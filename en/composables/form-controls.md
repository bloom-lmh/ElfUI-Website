# form control

ElfUI supports form-associated custom elements. After the component declares `formControl: true`, it can participate in native `<form>` submission, verification and reset.

```ts{5}
import { defineHtml, defineOptions, useFormControlContext } from "@elfui/core";

defineOptions({ formControl: true });

const form = useFormControlContext<string>();

const onInput = (event: Event): void => {
  form.setValue((event.target as HTMLInputElement).value);
};

export const ElfInput = defineHtml(` <input @input=${onInput} /> `);
```

When used, put it into the form like a native field and provide `name`:

```html
<form>
  <elf-input name="email"></elf-input>
  <button type="submit">提交</button>
</form>
```

## Verification and submission

```ts{3}
form.rules([{ validator: (value) => value.length > 0 || "请输入内容" }]);

const result = await form.validate();
if (!result.valid) form.report();
```

`setValue()` synchronizes the form value, `validate()` returns the verification result, and `report()` calls the browser's native verification prompt. The component should also synchronize public props such as disabled, required, name, etc. to the actual input elements to ensure that the keyboard and assistive technology behave consistently.

The Runtime bridges the native `formResetCallback`, `formDisabledCallback`, and
`formStateRestoreCallback` callbacks. Form reset, disabled fieldsets, and browser state restoration
therefore update the same controller. `form.disabled` exposes the current disabled state.
`setDisabled()` and `restore()` are platform bridges that application code normally does not call
directly.

## reset

```ts
form.reset();
```

::: warning
The reset should go back to the component's declared default value. Business form layout, error copy and field linkage belong to the component library layer and should not be stuffed into the framework form helper.
:::
