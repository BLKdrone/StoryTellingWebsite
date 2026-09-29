# StoryTellingWebsite

This is a Next.js App Router application using Prisma with MariaDB. Database access stays server-side in Next.js API routes.

## Local Docker Test

Docker and Docker Compose are required. To start MariaDB locally, run this from the repository root:

```powershell
docker compose --env-file .env.local --profile local up -d --wait db-local
```

Then build and start the migration job and Next.js app:

```powershell
docker compose --env-file .env.local --profile local up --build
```

Open http://localhost:3001. Next.js starts only after the migration service exits successfully. The local database is published on host port 3600 and persists in a Docker volume.

In HeidiSQL, connect to host `127.0.0.1`, port `3600`, user `root`, database `tellstory`, and the password set in `.env.local` as `MARIADB_ROOT_PASSWORD`.

To inspect startup failures:

```powershell
docker compose --env-file .env.local --profile local logs migrate
docker compose --env-file .env.local --profile local logs nextjs
docker compose --env-file .env.local --profile local ps -a
```

Stop the services while preserving local database data with `docker compose --env-file .env.local --profile local down`. Remove the local database volume as well with `docker compose --env-file .env.local --profile local down --volumes`.

## Database URLs

For the Docker test, set `MARIADB_ROOT_PASSWORD` and `DATABASE_URL` in `.env.local`. Use `mysql://root:<URL-encoded-password>@db-local:3306/tellstory` for `DATABASE_URL`; URL-encode any special characters in the password. If connecting from an app running directly on the host, use port `3600`. Keep the actual password private and do not use a `NEXT_PUBLIC_` prefix.

For deployment, set the external MariaDB URL in the server-side `DATABASE_URL` environment variable; both `migrate` and `nextjs` receive that same value. Do not enable the local database profile in production.

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_gBPu3SxjV3MbxUtm3AhUoQYQZ4Ov)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
