# Base Image
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN pnpm install turbo --global
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune server --docker

FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=server...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# Copy the entire pruned workspace to preserve pnpm layout and dependencies
COPY --from=installer --chown=hono:nodejs /app /app

WORKDIR /app/apps/server

USER hono
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.mjs"]