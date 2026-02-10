# 多阶段构建 - React + Vite 后台应用

# Stage 1: 依赖安装
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# 复制 workspace 配置
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./

# 复制所有 package.json
COPY apps/admin/package.json ./apps/admin/
COPY packages/*/package.json ./packages/

# 安装依赖
RUN pnpm install --frozen-lockfile

# Stage 2: 构建应用
FROM node:18-alpine AS builder
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/admin/node_modules ./apps/admin/node_modules

# 复制源代码
COPY . .

# 构建共享包
RUN pnpm --filter "@vidorra/*" build

# 构建 admin 应用
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm --filter admin build

# Stage 3: 生产运行 (使用 nginx)
FROM nginx:alpine AS runner

# 复制构建产物
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
