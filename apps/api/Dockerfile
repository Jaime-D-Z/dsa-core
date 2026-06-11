# ── Stage 1: deps ──────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN npm install -g pnpm turbo
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml turbo.json ./
COPY packages/dsa-ts/package.json   ./packages/dsa-ts/
COPY apps/api/package.json          ./apps/api/

RUN pnpm install --frozen-lockfile

# ── Stage 2: build ─────────────────────────────────────────────
FROM deps AS builder
COPY . .
RUN pnpm turbo run build --filter=@structra/api...

# ── Stage 3: runner ────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/api/dist      ./dist
COPY --from=builder /app/node_modules       ./node_modules
COPY --from=builder /app/packages/dsa-ts/dist ./packages/dsa-ts/dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/app.js"]
