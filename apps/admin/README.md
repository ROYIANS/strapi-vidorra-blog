# Admin 后台应用

基于 shadcn-admin 架构的管理后台。

## 技术栈

- **UI 框架**: React 18
- **构建工具**: Vite
- **UI 组件**: shadcn/ui (Radix UI + TailwindCSS)
- **路由**: TanStack Router
- **状态管理**: Zustand
- **数据获取**: TanStack Query (React Query)
- **表单**: React Hook Form + Zod
- **图表**: Recharts
- **图标**: Lucide Icons

## 项目结构

```
apps/admin/
├── src/
│   ├── components/       # UI组件
│   │   └── ui/          # shadcn/ui 组件
│   ├── features/        # 功能模块
│   ├── routes/          # TanStack Router 路由
│   ├── lib/             # 工具函数
│   ├── hooks/           # 自定义 Hooks
│   ├── stores/          # Zustand stores
│   ├── config/          # 配置文件
│   └── main.tsx         # 入口文件
├── public/              # 静态资源
├── vite.config.ts
├── tailwind.config.js
├── components.json      # shadcn/ui 配置
└── package.json
```

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter admin dev

# 构建生产版本
pnpm --filter admin build
```

## 参考项目

本架构参考 [shadcn-admin](../../docs/backend/) 项目。

## 特性

- ✅ 响应式设计
- ✅ 深色/浅色模式
- ✅ 全局搜索命令
- ✅ 侧边栏导航
- ✅ 表单验证
- ✅ 数据表格
- ✅ 图表展示
