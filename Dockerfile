FROM node:22-bookworm-slim

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN DATABASE_URL=mysql://root:build-only@127.0.0.1:3306/tellstory pnpm exec prisma generate
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "exec", "next", "start", "--hostname", "0.0.0.0"]