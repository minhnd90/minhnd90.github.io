---
trigger: always_on
---

# Code Style Guide

## Table of Contents
- [General](#general)
- [Linting & Formatting](#linting--formatting)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Imports](#imports)
- [React & JSX/TSX](#react--tsx)
- [TypeScript](#typescript)
- [Styling (Material UI)](#styling-material-ui)
- [Accessibility & Semantics](#accessibility--semantics)
- [Error Handling & Logging](#error-handling--logging)
- [Testing](#testing)
- [Commit Messages](#commit-messages)

---

## General
- Use **single quotes** for strings unless the string contains a single quote, then use double quotes.
- End files with a **single newline**.
- Keep line length to a maximum of **120 characters**.
- Prefer **async/await** over promise chains.
- Include a **JSDoc/@description** comment for exported functions.
- All code must pass **eslint** (configured via `eslint.config.mjs`).

## Linting & Formatting

### Auto-Lint Rule (Agent Behaviour)
> **After generating or modifying any `.ts`, `.tsx`, `.js`, or `.mjs` file, you MUST run:**
> ```bash
> npm run lint:fix
> ```
> Only report remaining lint errors that cannot be auto-fixed. Do **not** leave generated code in an unlinted state.

### ESLint Configuration (`eslint.config.mjs`)
The project uses **`eslint-config-next`** as the base, with the following active plugin suites:

| Plugin | Key rules enforced |
|---|---|
| `react` | `jsx-key`, `no-unescaped-entities`, `no-unknown-property`, `no-deprecated` |
| `react-hooks` | `rules-of-hooks` (error), `exhaustive-deps` (warn) |
| `@next/next` | `no-html-link-for-pages`, `no-head-element`, `google-font-display` |
| `jsx-a11y` | Accessibility attributes (`aria-*`, `alt`) |

Custom rules added on top of the base:

| Rule | Level | Rationale |
|---|---|---|
| `no-unused-vars` | `warn` | Keep dead code out; use `_` prefix to suppress intentionally |
| `no-console` | `warn` (allow `error`, `warn`) | No stray `console.log` in production |
| `prefer-const` | `error` | Always `const` unless reassignment is needed |
| `eqeqeq` | `error` | Enforce `===` / `!==` |
| `react/self-closing-comp` | `warn` | Self-close components without children |
| `react/jsx-no-useless-fragment` | `warn` | Avoid unnecessary `<>` wrappers |
| `@typescript-eslint/no-explicit-any` | `warn` | Use `unknown` or generics instead of `any` |

### Prettier (via `package.json` `prettier` key)
| Option | Value |
|---|---|
| `singleQuote` | `true` |
| `semi` | `false` |
| `tabWidth` | `2` |
| `trailingComma` | `none` |
| `arrowParens` | `always` |

### Available lint scripts
| Script | Command | Purpose |
|---|---|---|
| `npm run lint` | `eslint .` | Report all lint errors |
| `npm run lint:fix` | `eslint . --fix` | Auto-fix all fixable errors |

## File Organization
- Keep **component files** in `app/` or `components/` directories.
- One component per file; default export the component.
- Keep **utility/helper functions** in `lib/` or `scripts/`.
- Group related files (e.g., page, styles, tests) in the same folder when appropriate.

## Naming Conventions
- **PascalCase** for React components and classes.
- **camelCase** for functions, variables, and hooks.
- **SCREAMING_SNAKE_CASE** for constants.
- File names should match the exported component name (`MyComponent.tsx`).
- Directory names are **kebab-case** (e.g., `job-detail`).

## Imports
- Prefer **absolute imports** using the path aliases defined in `tsconfig.json` (`@/`, `@components/`, `@lib/`).
- Order imports:
  1. External libraries (e.g., `react`, `@mui/*`).
  2. Internal aliases.
  3. Relative imports.
- Separate each group with a blank line.
- Use named imports when possible; avoid `import * as`.

## React & TSX
- Use **function components** with explicit generic props type (`FC<Props>` or custom interface).
- Destructure props directly in the function signature.
- Prefer **Material UI** components for layout (`Box`, `Grid`, `Stack`, `Container`).
- Use **self‑closing tags** for components without children.
- Keep JSX attributes ordered alphabetically where practical, but group related props (e.g., `sx`, `variant`).
- Use **semantic HTML** elements when appropriate (`<section>`, `<article>`, `<header>`).
- Use **key** prop for lists, derived from stable identifiers.

## TypeScript
- Enable **strict mode** (`strict: true` in tsconfig).
- Export explicit **type/interface** for component props and data shapes.
- Use **optional chaining** and **nullish coalescing** for defensive coding.
- Prefer **`interface`** for object shapes used in multiple places; use **`type`** for unions.
- Avoid `any`; use `unknown` or generic constraints instead.

## Styling (Material UI)
- Use the **`sx` prop** for component‑level styling; avoid external CSS unless shared across many components.
- Leverage **theme values** (`primary`, `secondary`, `background.default`).
- Prefer **responsive values** (`{ xs: 6, md: 10 }`).
- Use **borderRadius**, **boxShadow**, and **color** from the theme for a consistent look.
- Keep **Typography** variants consistent (`overline`, `h3`, `h5`, `body1`, `caption`).

## Accessibility & Semantics
- Provide **`aria-label`** or **`alt`** where needed.
- Use **semantic HTML** tags (`<header>`, `<nav>`, `<main>`, `<section>`).
- Ensure contrast ratios meet WCAG AA using theme colors.
- Use **`<Button>`** from MUI for interactive elements; avoid raw `<a>` unless linking.

## Error Handling & Logging
- Wrap async code in `try/catch` blocks.
- Log meaningful messages with `console.error` for unexpected errors.
- Use `notFound()` from `next/navigation` for 404 handling.

## Testing
- Use **Jest** and **React Testing Library**.
- Write unit tests for pure functions and component snapshots.
- Keep test files alongside the component (`MyComponent.test.tsx`).

## Commit Messages
- Follow conventional commits:
  - `feat:` for new features.
  - `fix:` for bug fixes.
  - `chore:` for non‑code changes (e.g., docs, config).
  - Use a short imperative description after the colon.

---

*This guide was last updated to reflect active ESLint plugins, custom rules, and auto-lint agent behaviour.*
