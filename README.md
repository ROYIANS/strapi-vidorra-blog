# Vidorra Blog

<div align="center">

**一款对标 Medium 的现代化博客系统**

[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red)](https://nestjs.com/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)](https://pnpm.io/)

</div>

## 项目结构

```text
apps/
  web/      Next.js 前台
  admin/    React + Vite 后台
  server/   NestJS + Prisma API
packages/
  theme/ utils/ types/ ui/
```

## 技术栈

- 前台: Next.js, React, TailwindCSS
- 后台: React, Vite, TanStack Router, React Query
- API: NestJS, Prisma, PostgreSQL, JWT
- Monorepo: pnpm workspace

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

### 安装与启动

```bash
git clone https://github.com/ROYIANS/vidorra-blog.git
cd vidorra-blog
pnpm install
pnpm dev
```

默认端口：
- Web: http://localhost:3000
- Admin: http://localhost:5173
- Server API: http://localhost:3001/api

## 常用命令

```bash
pnpm dev
pnpm dev:web
pnpm dev:admin
pnpm dev:server

pnpm build
pnpm build:web
pnpm build:admin
pnpm build:server

pnpm lint
pnpm typecheck
```

