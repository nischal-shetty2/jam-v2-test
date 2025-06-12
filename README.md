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

### 1. Automated Setup & Development (Recommended)

Run the setup script to automatically configure everything and start development **(Only Works for Linux and MacOS)**

```bash
npm run setup
```

This will:

- Install Node.js dependencies
- Set up Docker regtest environment with Joinmarket
- Create default wallet (`Satoshi.jmdat` with password `test`)
- Start all required services (Docker containers)
- Launch development server and Storybook
- Open both applications in your browser automatically

- **Frontend Development Server**: http://localhost:5173
- **Storybook Component Library**: http://localhost:6006

### 2. Manual Setup

If you prefer manual setup or encounter any issues:

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

### 3. Login to the Application

- Navigate to: http://localhost:5173
- **Login with**:
  - Wallet: `Satoshi.jmdat`
  - Password: `test`

### Regtest Environment

- `npm run regtest:up` - Start Joinmarket containers
- `npm run regtest:init` - Initialize with default wallet
- `npm run regtest:down` - Stop containers
- `npm run regtest:clear` - Stop and remove all data
- `npm run regtest:mine` - Mine a block
- `npm run regtest:fund` - Fund wallet with test Bitcoin
- `npm run regtest:logs` - View container logs
- `npm run regtest:status` - Check container status

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
