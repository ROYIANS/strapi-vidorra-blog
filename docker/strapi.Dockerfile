# Strapi CMS Dockerfile

FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /opt/app

# 开发环境
FROM base AS development

COPY backend/strapi/package.json backend/strapi/pnpm-lock.yaml* ./
RUN pnpm install

COPY backend/strapi/ .

ENV NODE_ENV=development
EXPOSE 1337

CMD ["pnpm", "develop"]

# 生产构建
FROM base AS builder

COPY backend/strapi/package.json backend/strapi/pnpm-lock.yaml* ./
RUN pnpm install --prod=false

COPY backend/strapi/ .
RUN pnpm build

# 生产运行
FROM base AS production

COPY backend/strapi/package.json backend/strapi/pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/public ./public
COPY backend/strapi/config ./config
COPY backend/strapi/database ./database
COPY backend/strapi/src ./src

RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi
RUN chown -R strapi:strapi /opt/app

USER strapi

ENV NODE_ENV=production
EXPOSE 1337

CMD ["pnpm", "start"]
