# 快速开始

本指南将帮助你在本地环境搭建和运行 Strapi-Vidorra Blog。

## 前置要求

确保你的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **PostgreSQL**: >= 14 (可选，开发环境可以使用 SQLite)

### 安装 pnpm

如果还没有安装 pnpm，可以通过以下方式安装：

```bash
npm install -g pnpm
```

## 克隆项目

```bash
git clone https://github.com/ROYIANS/strapi-vidorra-blog.git
cd strapi-vidorra-blog
```

## 安装依赖

项目使用 pnpm workspace 管理 monorepo，一次性安装所有依赖：

```bash
pnpm install
```

这将安装根项目以及所有子包（apps 和 packages）的依赖。

## 环境配置

### 前台应用 (apps/web)

创建 `apps/web/.env.local` 文件：

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 后台应用 (apps/admin)

创建 `apps/admin/.env` 文件：

```env
VITE_API_URL=http://localhost:1337/api
```

### Strapi CMS

创建 `backend/strapi/.env` 文件：

```env
# 数据库 (开发环境使用 SQLite)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# 或使用 PostgreSQL (生产环境推荐)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=strapi_vidorra
# DATABASE_USERNAME=postgres
# DATABASE_PASSWORD=your_password

# 密钥
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
JWT_SECRET=toBeModified
```

## 启动开发服务器

### 启动所有服务

```bash
pnpm dev
```

这将同时启动：
- 前台应用: http://localhost:3000
- 后台应用: http://localhost:5173  
- Strapi CMS: http://localhost:1337

### 单独启动服务

```bash
# 仅启动前台
pnpm dev:web

# 仅启动后台
pnpm dev:admin

# 仅启动 Strapi
pnpm dev:strapi
```

## 首次设置 Strapi

1. 访问 http://localhost:1337/admin
2. 创建管理员账号
3. 登录后台并配置内容类型

## 开发工作流

### 代码风格检查

```bash
pnpm lint
```

### 类型检查

```bash
pnpm typecheck
```

### 格式化代码

```bash
pnpm format
```

## 构建生产版本

```bash
pnpm build
```

## 下一步

- 阅读 [开发指南](./development.md) 了解项目结构
- 查看 [主题开发](./theme-development.md) 学习如何创建自定义主题
- 阅读 [API 文档](./api.md) 了解 Strapi API 使用

## 常见问题

### Q: pnpm install 失败？
确保使用 pnpm >= 8.0.0，可以运行 `pnpm --version` 检查版本。

### Q: 端口被占用？
可以在对应的配置文件中修改端口设置。

### Q: Strapi 启动失败？
检查 `.env` 文件配置是否正确，特别是数据库相关配置。
