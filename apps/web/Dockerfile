FROM oven/bun:1 as base

FROM base AS builder

WORKDIR /app

RUN bun add -g turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN bun install

COPY --from=builder /app/out/full/ .

RUN bun turbo build

FROM base AS runner
WORKDIR /app

EXPOSE 3001

COPY --from=installer /app/apps/web/dist ./
CMD ["bun", "run", "start"]