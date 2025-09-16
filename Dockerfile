FROM node:22-slim AS base

FROM base AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile;

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build;

FROM base AS runner

WORKDIR /app

RUN corepack enable pnpm && pnpm dlx puppeteer browsers install chrome

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
