# 项目结构总览

```text
vidorra-blog/
├── apps/
│   ├── web/            # Next.js 前台
│   ├── admin/          # React + Vite 后台
│   └── server/         # NestJS + Prisma API
├── packages/
│   ├── ui/
│   ├── theme/
│   ├── utils/
│   └── types/
├── docker/
├── docs/
├── scripts/
├── package.json
└── pnpm-workspace.yaml
```

## 关键说明

- `apps/web/src/services/`：前台 API 与 mock 数据切换逻辑。
- `apps/admin/src/services/`：后台调用 Nest API 的服务层。
- `apps/server/src/`：Nest 模块化后端代码。
- `apps/server/prisma/`：数据库 schema 和迁移。

