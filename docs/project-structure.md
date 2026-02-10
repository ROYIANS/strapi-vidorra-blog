# 项目结构总览

本文档详细说明了 Strapi-Vidorra Blog 的完整项目结构。

## 完整目录树

```
strapi-vidorra-blog/
│
├── apps/                           # 应用程序
│   ├── web/                       # Next.js 前台应用
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── posts/
│   │   │   │   ├── mood/         # 心情日历页面
│   │   │   │   └── themes/       # 主题市场
│   │   │   ├── components/       # React 组件
│   │   │   │   ├── layout/       # 布局组件
│   │   │   │   ├── ui/           # UI 组件
│   │   │   │   └── features/     # 功能组件
│   │   │   ├── lib/              # 工具函数
│   │   │   │   ├── api.ts       # API 调用
│   │   │   │   └── utils.ts
│   │   │   └── styles/           # 样式文件
│   │   ├── public/               # 静态资源
│   │   ├── .env.local            # 环境变量
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── admin/                     # React + Vite 后台应用
│       ├── src/
│       │   ├── pages/            # 页面组件
│       │   │   ├── Dashboard/
│       │   │   ├── Posts/
│       │   │   ├── Comments/
│       │   │   └── Themes/
│       │   ├── components/       # 共享组件
│       │   ├── api/              # API 服务
│       │   ├── stores/           # Zustand stores
│       │   ├── router.tsx        # 路由配置
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/                       # 共享包
│   ├── ui/                        # UI 组件库
│   │   ├── src/
│   │   │   ├── components/       # 组件实现
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   └── Input/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── theme/                     # 主题系统
│   │   ├── src/
│   │   │   ├── themes/           # 主题定义
│   │   │   │   ├── default.ts   # 默认主题(old_project)
│   │   │   │   └── dark.ts
│   │   │   ├── engine.ts         # 主题引擎
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── utils/                     # 通用工具
│   │   ├── src/
│   │   │   ├── cn.ts            # className 合并
│   │   │   ├── date.ts          # 日期处理
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── types/                     # 类型定义
│       ├── src/
│       │   ├── post.ts
│       │   ├── mood.ts
│       │   ├── theme.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── backend/                        # 后端服务
│   └── strapi/                    # Strapi CMS
│       ├── config/                # Strapi 配置
│       │   ├── admin.ts
│       │   ├── api.ts
│       │   ├── database.ts
│       │   └── server.ts
│       ├── src/
│       │   ├── api/              # API 定义
│       │   │   ├── post/
│       │   │   ├── mood-entry/
│       │   │   └── theme/
│       │   ├── extensions/       # 扩展
│       │   └── index.ts
│       ├── public/               # 上传文件
│       ├── .env
│       └── package.json
│
├── docs/                          # 文档
│   ├── architecture.md           # 架构说明
│   ├── getting-started.md        # 快速开始
│   ├── development.md            # 开发指南
│   ├── theme-development.md      # 主题开发
│   ├── api.md                    # API 文档
│   └── deployment.md             # 部署指南
│
├── old_project/                   # 原项目参考
│   └── (保持不变)
│
├── .github/                       # GitHub 配置
│   └── workflows/
│       └── ci.yml
│
├── pnpm-workspace.yaml            # Workspace 配置
├── package.json                   # Root package
├── .npmrc                         # pnpm 配置
├── .gitignore
├── .prettierrc
├── .eslintrc.js
├── turbo.json                     # Turborepo 配置
├── LICENSE
└── README.md
```

## 关键文件说明

### 根目录
- `pnpm-workspace.yaml`: 定义 monorepo 包
- `package.json`: 根包，包含 catalog 和全局脚本
- `.npmrc`: pnpm 配置

### apps/web (前台)
- `src/app/`: Next.js 14 App Router
- `src/components/`: React 组件
- `tailwind.config.js`: TailwindCSS 配置

### apps/admin (后台)
- `src/pages/`: 管理页面
- `vite.config.ts`: Vite 配置

### packages/*
- 共享代码包，使用 `@vidorra/*` 作为包名
- 每个包都有独立的 tsconfig.json

### backend/strapi
- Strapi v4 标准结构
- `src/api/`: 内容类型定义

## 下一步

详细了解各个部分：
- [架构设计](./architecture.md)
- [开发指南](./development.md)
