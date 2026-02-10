# 多阶段构建 - Next.js 前台应用

# Stage 1: 依赖安装
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# 复制 workspace 配置
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./

# 复制所有 package.json
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/

# 安装依赖
RUN pnpm install --frozen-lockfile

# Stage 2: 构建应用
FROM node:18-alpine AS builder
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# 复制源代码
COPY . .

# 构建共享包
RUN pnpm --filter "@vidorra/*" build

# 构建 web 应用
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm --filter web build

# Stage 3: 生产运行
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制必要文件
COPY --from=builder /app/apps/web/public ./apps/web/public

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/web/server.js"]
