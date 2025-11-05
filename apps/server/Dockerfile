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
RUN pnpm turbo run build

FROM base AS runner

COPY --from=installer . .
COPY --from=installer ./app/apps/server/dist/ .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "index.js"]