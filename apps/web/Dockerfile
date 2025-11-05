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
RUN turbo prune web --docker

FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=web...

FROM base AS runner
RUN pnpm install --global serve

# Preserve pnpm layout and pruned workspace
COPY --from=installer /app /app

WORKDIR /app/apps/web

ENV NODE_ENV=production
EXPOSE 4173

# Use the production preview server for built assets
CMD ["serve", "-s", "dist", "-l", "4173"]