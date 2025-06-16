# Jam - V2

## Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **HTTP Client**: Axios
- **Routing**: React Router
- **State Management**: TanStack Query
- **UI Development**: Storybook
- **Icons**: Lucide React
- **Git Hooks**: Husky

## Quick Start

### Development Setup

```bash
# Install dependencies
npm install

# Start regtest environment
npm run regtest:up

# Initialize and create default wallet
npm run regtest:init

# Start development servers

## Development server
npm run dev

## Start StoryBook
npm run storybook
```

- **Frontend Development Server**: http://localhost:5173
- **Storybook Library**: http://localhost:6006

### Testing & Development

- `npm run test` - Run tests
- `npm run lint` - Lint code

### Proxy Configuration

Vite is configured to proxy `/api/*` requests to the Joinmarket service, handling HTTPS and CORS automatically.

## Why Not Alternatives?

- **DaisyUI / MUI / Chakra / Custom UI**: Too opinionated, heavy, or restrictive.
- **CRA / Next.js / Parcel**: Slower, overkill, or not as seamless as Vite.
- **Redux / MobX / Zustand**: Overhead we don’t need—TanStack covers our use case.
- **Styled Components / CSS Modules / Pure CSS**: Less efficient than Tailwind.

---

## Note

- Zustand might still be added for minimal global state.

---

## Summary

Fast, maintainable, and DX-friendly. This stack keeps us agile without sacrificing quality.

---

### Additional Commands

- Rebuild Docker images:

  ```sh
  npm run regtest:rebuild
  ```

- Stop the regtest environment:

  ```sh
  npm run regtest:down
  ```

- Clear all test data:
  ```sh
  npm run regtest:clear
  ```

## Troubleshooting

### Container Issues

```bash
# Check container status
npm run regtest:status

# View logs
npm run regtest:logs

# Manual restart
npm run regtest:restart
```
