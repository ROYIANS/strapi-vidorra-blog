# 🎉 Vidorra Blog - NestJS 后端 API

基于 NestJS + PostgreSQL + Prisma 构建的现代化博客后端系统。

## ✅ 项目状态

**当前版本**: v0.1.0
**状态**: 🟢 基础配置完成，准备开发业务逻辑
**数据库**: ✅ 已连接并迁移
**文档**: ✅ 完整

## 📂 项目结构

```
apps/server/
├── prisma/
│   ├── migrations/          # 数据库迁移文件
│   │   └── 20260211072124_init/
│   └── schema.prisma        # ✅ 数据模型（User, Post, Category, Tag, Mood）
├── src/
│   ├── prisma/              # ✅ Prisma 服务（全局模块）
│   ├── auth/                # 🔜 认证模块（待创建）
│   ├── posts/               # 🔜 文章模块（待创建）
│   ├── categories/          # 🔜 分类模块（待创建）
│   ├── tags/                # 🔜 标签模块（待创建）
│   ├── moods/               # 🔜 心情模块（待创建）
│   ├── users/               # 🔜 用户模块（待创建）
│   ├── common/              # 🔜 共享模块（待创建）
│   ├── app.module.ts        # ✅ 主模块
│   └── main.ts              # ✅ 入口文件
├── .env                     # ✅ 环境变量（已配置）
├── .env.example             # ✅ 环境变量模板
├── DEVELOPMENT_PROGRESS.md  # 📋 开发进度
├── QUICKSTART_GUIDE.md      # 🚀 快速指南（含完整代码模板）
└── README.md                # 📖 本文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd apps/server
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env`（已配置好）

```bash
cp .env.example .env
```

### 3. 运行开发服务器

```bash
pnpm run start:dev
```

服务器启动在: **http://localhost:3001/api**

### 4. 访问数据库管理界面

```bash
npx prisma studio
```

打开: **http://localhost:5555**

## 📝 核心功能

### 已完成
- ✅ NestJS 项目初始化
- ✅ PostgreSQL 数据库连接
- ✅ Prisma ORM 配置
- ✅ 数据模型定义（5个核心模型）
- ✅ 数据库迁移
- ✅ 全局配置（CORS、验证管道、JWT准备）
- ✅ 完整文档

### 待开发
- [ ] Auth 模块（注册、登录、JWT）
- [ ] Posts 模块（文章 CRUD）
- [ ] Categories 模块（分类管理）
- [ ] Tags 模块（标签管理）
- [ ] Moods 模块（心情日历）
- [ ] Users 模块（用户管理）
- [ ] 文件上传
- [ ] API 文档（Swagger）

## 📊 数据模型

### User（用户）
- 认证信息：email, username, password
- 角色：USER, EDITOR, ADMIN
- 关联：文章作者、心情记录

### Post（文章）
- 基本信息：title, slug, content, description
- 展示配置：displayMode (LARGE/NORMAL), recommend
- 关联：作者、分类、标签

### Category（分类）
- name, slug, description

### Tag（标签）
- name, slug
- 多对多关联文章

### Mood（心情）
- date (唯一), mood, name, description
- 关联用户

## 🎯 API 端点规划

### Auth
```
POST   /api/auth/register     # 注册
POST   /api/auth/login        # 登录
GET    /api/auth/profile      # 获取用户信息
```

### Posts
```
GET    /api/posts             # 文章列表（分页、筛选）
GET    /api/posts/:id         # 文章详情
GET    /api/posts/slug/:slug  # 根据 slug 获取
POST   /api/posts             # 创建文章
PATCH  /api/posts/:id         # 更新文章
DELETE /api/posts/:id         # 删除文章
```

详见：[DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md)

## 🔧 常用命令

```bash
# 开发
pnpm run start          # 启动
pnpm run start:dev      # 开发模式（热重载）
pnpm run start:prod     # 生产模式

# 构建
pnpm run build          # 构建项目

# Prisma
npx prisma generate     # 生成 Client
npx prisma migrate dev  # 创建迁移
npx prisma studio       # 打开数据库管理界面
npx prisma db push      # 同步 schema（开发用）

# 测试
pnpm run test           # 单元测试
pnpm run test:e2e       # E2E 测试
pnpm run test:cov       # 测试覆盖率
```

## 📚 开发指南

### 创建新模块

**方式一：NestJS CLI（推荐）**
```bash
nest g resource module-name --no-spec
```

**方式二：手动创建**
参考 [QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md) 中的完整代码模板。

### 代码模板

`QUICKSTART_GUIDE.md` 包含：
- ✅ Auth 模块完整代码
- ✅ Posts 模块完整代码
- ✅ DTO、Service、Controller 模板
- ✅ JWT 策略和守卫
- ✅ 角色权限控制

直接复制使用即可！

## 🔐 认证与权限

### 角色
- `USER` - 普通用户
- `EDITOR` - 编辑（创建、编辑文章）
- `ADMIN` - 管理员（所有权限）

### 使用示例
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'EDITOR')
@Post()
create(@CurrentUser() user: any, @Body() dto: CreateDto) {
  // ...
}
```

## 🌐 环境变量

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://blog:password@host:5432/blog"
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

## 🧪 测试 API

### 注册用户
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"test","password":"123456"}'
```

### 登录
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"123456"}'
```

详见：[QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md#测试-api)

## 📖 文档

- [DEVELOPMENT_PROGRESS.md](./DEVELOPMENT_PROGRESS.md) - 开发进度和详细规划
- [QUICKSTART_GUIDE.md](./QUICKSTART_GUIDE.md) - 快速开始（含完整代码）
- [prisma/schema.prisma](./prisma/schema.prisma) - 数据模型定义
- [README.nestjs.md](./README.nestjs.md) - NestJS 官方文档

## 🛠️ 技术栈

- **框架**: NestJS 10
- **语言**: TypeScript 5
- **数据库**: PostgreSQL
- **ORM**: Prisma 7
- **认证**: JWT + Passport
- **验证**: class-validator + class-transformer
- **加密**: bcrypt

## 📈 开发路线图

- [x] 项目初始化
- [x] 数据库配置
- [x] 数据模型设计
- [ ] Auth 模块
- [ ] Posts 模块
- [ ] Categories 模块
- [ ] Tags 模块
- [ ] Moods 模块
- [ ] Users 模块
- [ ] 文件上传
- [ ] API 文档
- [ ] 单元测试
- [ ] 部署配置

## ⚠️ 注意事项

### 安全
- `.env` 文件已在 `.gitignore` 中，切勿提交
- 生产环境请更换强 JWT_SECRET
- 使用 HTTPS 连接数据库

### 开发
- 使用 Prisma Studio 查看数据
- 修改 schema 后运行 `npx prisma migrate dev`
- 使用 NestJS CLI 生成模块

## 🤝 贡献

本项目是 Vidorra Blog 的后端部分。

## 📄 License

Apache-2.0

---

**作者**: ROYIANS
**Email**: royians@vidorra.life
**文档**: 📖 完整 | **状态**: 🟢 准备开发 | **版本**: v0.1.0
