# Base Image
FROM oven/bun:1-debian AS base

FROM base AS builder
# Set working directory
WORKDIR /app
RUN bun install turbo --global
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-pip build-essential && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/out/json/ .

RUN bun install

COPY --from=builder /app/out/full/ .
RUN bunx turbo run build

FROM base AS runner

COPY --from=installer . .
COPY --from=installer ./app/apps/web/dist/ .

ENV NODE_ENV=production
EXPOSE 3001

CMD ["bun", "run", "start"]