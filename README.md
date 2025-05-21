# Vitaes - Modern Resume Builder

## Introduction

Vitaes is an open-source, modern resume builder designed to help you create professional and visually appealing resumes with ease. It offers a user-friendly interface and a variety of templates to choose from.

## Tech Stack

This project leverages a modern tech stack to provide a robust and performant experience:

*   **Framework:** Next.js (v15+ with Turbopack)
*   **Language:** TypeScript
*   **Package Manager:** Bun
*   **UI:**
    *   React
    *   shadcn/ui (built on Radix UI and Tailwind CSS v4)
    *   Lucide Icons
    *   Sonner (for toasts/notifications)
*   **State Management:** Zustand
*   **Forms:** TanStack Form
*   **API/Data Fetching:** tRPC with TanStack Query (React Query)
*   **Database:** PostgreSQL
*   **ORM:** Drizzle ORM
*   **Authentication:** Better Auth (a configurable, Lucia-based authentication solution)
*   **Internationalization (i18n):** `next-intl` for handling translations, `languine` for managing translation files.
*   **Email:** React Email for templating, Resend for sending emails.
*   **PDF Generation:** Puppeteer
*   **Analytics:** PostHog, OpenPanel
*   **Drag and Drop:** Atlassian Pragmatic Drag and Drop
*   **Linting/Formatting:** ESLint, Prettier
*   **Environment Variables:** T3 Env
*   **Containerization (for development):** Docker Compose (for PostgreSQL and Redis services)

## Getting Started

Follow these steps to get the project running locally:

### Prerequisites

*   **Node.js:** (While Bun is the primary package manager, some tools might still rely on Node.js)
*   **Bun:** Install from [bun.sh](https://bun.sh/)
*   **Docker:** Docker Desktop is recommended for managing local services.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vitaes.git # Replace with the actual repository URL
cd vitaes
```

### 2. Set Up Environment Variables

This project uses environment variables for configuration. An example file with all required variables is provided.

1.  **Copy the example file:**
    Create a new file named `.env` by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```

2.  **Fill in the values:**
    Open the newly created `.env` file and fill in the necessary values for your local development environment. These will include database connection strings, API keys for external services, authentication secrets, etc.

Refer to `env.ts` for a more complete list of environment variables and their validation schemas, managed by T3 Env.

### 3. Install Dependencies

```bash
bun install
```

### 4. Run Database and Redis Services

This project uses Docker Compose to manage development services like PostgreSQL and Redis.

```bash
docker compose up -d
# or if you have an older version of docker-compose
# docker-compose up -d
```
This will start the services in detached mode.

### 5. Run Database Migrations

The project uses Drizzle ORM. To set up your database schema:

First, generate migration files based on your schema definitions:
```bash
bun run db:generate
```

Then, apply the migrations to your database:
```bash
bun run db:migrate
```

Alternatively, for rapid prototyping (this will directly apply schema changes without generating migration files, potentially losing data):
```bash
bun run db:push
```

### 6. Run the Development Server

```bash
bun run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Available Scripts

Here are some of the key scripts available in `package.json`:

*   `dev`: Starts the Next.js development server with Turbopack.
*   `build`: Builds the application for production.
*   `start`: Starts a production Next.js server (after running `build`).
*   `lint`: Lints the codebase using Next.js's ESLint configuration.
*   `db:generate`: Generates SQL migration files based on Drizzle schema changes.
*   `db:migrate`: Applies pending migrations to the database. (Used for development)
*   `db:migrate:prod`: Applies migrations in a production environment (runs `server/db/migrate.ts`).
*   `db:push`: Pushes schema changes directly to the database (useful for prototyping, bypasses migration files).
*   `db:studio`: Starts Drizzle Studio, a GUI for managing your database.
*   `auth:generate`: Generates Auth schema based on your Better Auth configuration.
*   `translate`: Manages translation files using `languine`.
*   `email`: Starts a local development server for previewing React Email templates (on port 3001).

## Internationalization (i18n)

This project uses `next-intl` for internationalization.
*   Locale-specific pages and components are typically within the `app/[locale]/` directory.
*   Translation files (JSON format) are stored in the `locales/` directory (e.g., `locales/en.json`, `locales/es.json`).
*   Configuration for `next-intl` (middleware, routing) can be found in `i18n/` and `middleware.ts`.
*   The `languine` tool (`bun run translate`) is used to help manage and synchronize translation strings.

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Containerization

The application is also designed to be containerizable. You can build a Docker image and deploy it to any platform that supports Docker containers. Ensure your production environment variables are set up correctly in your deployment environment.

## Learn More (About Next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
