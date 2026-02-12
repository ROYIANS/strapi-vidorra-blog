# Server Dockerfile (NestJS API)

FROM node:18-alpine
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY apps/server/package.json ./apps/server/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter server build

EXPOSE 3001

CMD ["pnpm", "--filter", "server", "start:prod"]