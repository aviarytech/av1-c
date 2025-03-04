# AV1-C Development Guide

## Commands
- Build: `bun run build` or `npm run build`
- Watch mode: `bun run dev` or `npm run dev`
- Docs development: `bun run docs:dev`
- Docs build: `bun run docs:build`
- Docs preview: `bun run docs:preview`

## Code Style
- Components: Use functional components with forwardRef pattern
- Types: Define explicit interfaces for props extending HTML elements
- Naming: PascalCase for components/interfaces, camelCase for functions/variables
- Styling: Use TailwindCSS with class-variance-authority (cva) for variants
- Formatting: No explicit ESLint/Prettier config, but maintain consistent formatting
- Error handling: Use ErrorState component with appropriate variants

## Project Structure
- Components in `/src/components/[component-name]/Component.tsx`
- Utils in `/src/utils/`
- Types in `/src/types/`

## Git Workflow
- Follow [Conventional Commits](https://www.conventionalcommits.org/) specification
- Format: `type(scope): description` (e.g., `feat(button): add new variant`)