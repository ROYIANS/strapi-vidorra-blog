# 项目架构

## 概述

Strapi-Vidorra Blog 采用 Monorepo 架构，使用 pnpm workspace 管理多个包。

## 目录结构

```
strapi-vidorra-blog/
├── apps/
│   ├── web/                    # Next.js 前台应用
│   │   ├── src/
│   │   │   ├── app/           # App Router
│   │   │   ├── components/    # React 组件
│   │   │   ├── lib/           # 工具函数
│   │   │   └── styles/        # 样式文件
│   │   ├── public/            # 静态资源
│   │   └── package.json
│   │
│   └── admin/                  # React + Vite 后台应用
│       ├── src/
│       │   ├── pages/         # 页面组件
│       │   ├── components/    # React 组件
│       │   ├── api/           # API 调用
│       │   └── main.tsx       # 入口文件
│       └── package.json
│
├── packages/
│   ├── ui/                     # 共享 UI 组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── theme/                  # 主题系统
│   │   ├── src/
│   │   │   ├── themes/        # 主题定义
│   │   │   ├── engine.ts      # 主题引擎
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── utils/                  # 通用工具函数
│   │   ├── src/
│   │   └── package.json
│   │
│   └── types/                  # TypeScript 类型定义
│       ├── src/
│       └── package.json
│
├── backend/
│   └── strapi/                 # Strapi CMS
│       ├── config/
│       ├── src/
│       │   └── api/
│       └── package.json
│
├── docs/                       # 文档
│   ├── architecture.md
│   ├── getting-started.md
│   └── api.md
│
├── pnpm-workspace.yaml         # Workspace 配置
├── package.json                # Root package (catalog)
├── .npmrc                      # pnpm 配置
└── README.md
```

## 包依赖关系

```
apps/web
  ├─ @vidorra/ui
  ├─ @vidorra/theme
  ├─ @vidorra/utils
  └─ @vidorra/types

apps/admin
  ├─ @vidorra/ui
  ├─ @vidorra/utils
  └─ @vidorra/types

@vidorra/ui
  └─ react, react-dom

@vidorra/theme
  └─ @vidorra/types

@vidorra/utils
  (无依赖)

@vidorra/types
  (无依赖)
```

## 技术栈详情

### 前台 (apps/web)
- Next.js 14+ (App Router)
- React 18
- TailwindCSS
- Zustand (状态管理)
- React Query (数据获取)

### 后台 (apps/admin)
- React 18
- Vite
- React Router v6
- Ant Design
- Zustand

### CMS (backend/strapi)
- Strapi v4
- PostgreSQL
- JWT 认证

## 开发工作流

1. **安装依赖**: `pnpm install`
2. **启动开发**: `pnpm dev` (同时启动所有应用)
3. **单独启动**:
   - 前台: `pnpm dev:web`
   - 后台: `pnpm dev:admin`
   - Strapi: `pnpm dev:strapi`
4. **构建**: `pnpm build`
5. **类型检查**: `pnpm typecheck`
6. **代码检查**: `pnpm lint`
