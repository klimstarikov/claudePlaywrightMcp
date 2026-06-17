# Page Objects — Rules

- Every class extends `BasePage` (base.page.ts).
- Locators are `private readonly`, assigned in the constructor only.
- Prefer `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`; CSS selectors are last resort.
- Every public method has a JSDoc one-liner and an explicit `Promise<T>` return type.
- Never expose raw `Locator` properties publicly — wrap in a descriptive method.
- One file per physical page/screen; file name pattern: `<name>.page.ts`.
- Do not call `waitForTimeout` anywhere.
