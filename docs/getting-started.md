# 快速开始

## 前置要求

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

## 安装

```bash
git clone https://github.com/ROYIANS/vidorra-blog.git
cd vidorra-blog
pnpm install
```

## 环境变量

### `apps/server/.env`

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/vidorra_blog?schema=public"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK=true
```

### `apps/admin/.env`

```env
VITE_API_URL=http://localhost:3001/api
```

## 启动

```bash
pnpm dev
```

默认端口：
- Web: `http://localhost:3000`
- Admin: `http://localhost:5173`
- Server API: `http://localhost:3001/api`

## 常用命令

```bash
pnpm dev:web
pnpm dev:admin
pnpm dev:server
pnpm build
pnpm lint
pnpm typecheck
```

