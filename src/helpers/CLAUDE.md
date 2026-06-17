# Helpers — Rules

- Pure exported functions only — no classes with internal state.
- Accept page object instances as parameters, never a raw `Page`.
- Normalize strings before comparison: `.trim().toLowerCase()`.
- File name pattern: `<name>.helper.ts`.
