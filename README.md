# AV1-C

AV1-C is a library of React UI components for building AV1 products and related projects. The component library features seamless light and dark mode support.

## Installation

```bash
# npm
npm install av1-c

# yarn
yarn add av1-c

# bun
bun add av1-c
```

## Tailwind Setup

AV1-C uses Tailwind CSS for styling. Add the following to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // ... your existing content
    "./node_modules/av1-c/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
}
```

## Theme Support

Wrap your application with the ThemeProvider for proper dark/light mode support:

```tsx
import { ThemeProvider } from "av1-c";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

The ThemeProvider respects system preferences by default, but allows manual override through the useTheme hook:

```tsx
import { useTheme, Button } from "av1-c";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

## Component Usage

```tsx
import { Card, Button, SchemaEditor } from "av1-c";

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Example Card</Card.Title>
      </Card.Header>
      <Card.Content>
        Content goes here
      </Card.Content>
      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card>
  );
}
```

For complete documentation and examples, see the [documentation site](https://av1-c.up.railway.app/).

## Contributing

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. Please format your commit messages accordingly:

- `feat(scope): description` - for new features
- `fix(scope): description` - for bug fixes
- `docs(scope): description` - for documentation changes
- `style(scope): description` - for code style changes
- `refactor(scope): description` - for code refactoring
- `test(scope): description` - for adding or modifying tests
- `chore(scope): description` - for maintenance tasks

Examples:
- `feat(editor): add syntax highlighting`
- `fix(compiler): resolve memory leak`