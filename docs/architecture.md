# 项目架构

## 概述

本项目采用 pnpm workspace Monorepo，核心由三部分组成：

- `apps/web`: Next.js 前台博客站点
- `apps/admin`: React + Vite 管理后台
- `apps/server`: NestJS + Prisma API 服务

## 目录结构

```text
vidorra-blog/
├── apps/
│   ├── web/
│   ├── admin/
│   └── server/
├── packages/
│   ├── ui/
│   ├── theme/
│   ├── utils/
│   └── types/
├── docker/
├── docs/
└── package.json
```

## 技术栈

### 前台 (apps/web)
- Next.js (App Router)
- React
- TailwindCSS
- Zustand

### 后台 (apps/admin)
- React + Vite
- TanStack Router
- React Query
- shadcn/ui

### 后端 (apps/server)
- NestJS
- Prisma
- PostgreSQL
- JWT + Passport

## 开发工作流

1. 安装依赖: `pnpm install`
2. 启动全部服务: `pnpm dev`
3. 单独启动:
   - `pnpm dev:web`
   - `pnpm dev:admin`
   - `pnpm dev:server`
4. 构建: `pnpm build`
5. 类型检查: `pnpm typecheck`

