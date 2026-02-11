# NestJS 后端开发进度

## ✅ 已完成

### 1. 项目初始化
- ✅ NestJS 项目创建
- ✅ 依赖安装（Prisma, JWT, Passport, etc.）
- ✅ 项目结构配置

### 2. 数据库配置
- ✅ Prisma 初始化
- ✅ 数据模型定义（User, Post, Category, Tag, Mood）
- ✅ 数据库迁移完成
- ✅ Prisma 服务创建

### 3. 基础配置
- ✅ 环境变量配置
- ✅ ConfigModule 配置
- ✅ PrismaModule 全局模块
- ✅ 全局验证管道
- ✅ CORS 配置
- ✅ API 全局前缀（/api）

## 📋 数据库模型

### User（用户）
```typescript
- id: String (UUID)
- email: String (唯一)
- username: String (唯一)
- password: String (哈希)
- name: String? (可选)
- avatar: String? (可选)
- bio: String? (可选)
- role: Enum (USER, ADMIN, EDITOR)
- isActive: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

### Post（文章）
```typescript
- id: String (UUID)
- title: String
- slug: String (唯一)
- description: String?
- content: String
- excerpt: String?
- cover: String?
- published: Boolean
- recommend: Boolean
- displayMode: Enum (LARGE, NORMAL)
- readTime: Int?
- wordCount: Int?
- date: DateTime
- updatedAt: DateTime
- authorId: String (外键 → User)
- categoryId: String? (外键 → Category)
- tags: Tag[] (多对多)
```

### Category（分类）
```typescript
- id: String (UUID)
- name: String (唯一)
- slug: String (唯一)
- description: String?
- createdAt: DateTime
- updatedAt: DateTime
```

### Tag（标签）
```typescript
- id: String (UUID)
- name: String (唯一)
- slug: String (唯一)
- createdAt: DateTime
- updatedAt: DateTime
```

### Mood（心情）
```typescript
- id: String (UUID)
- date: DateTime (唯一)
- mood: String
- name: String?
- description: String?
- userId: String (外键 → User)
- createdAt: DateTime
- updatedAt: DateTime
```

## 🚧 正在进行

### 3. 核心 API 模块（当前任务）

需要创建以下模块：

#### 3.1 Auth 模块（认证）
- [ ] JWT 策略
- [ ] 本地策略（用户名密码登录）
- [ ] Auth Guard
- [ ] Auth Controller (login, register, profile)
- [ ] Auth Service

#### 3.2 User 模块
- [ ] User Controller (CRUD)
- [ ] User Service
- [ ] User DTO

#### 3.3 Post 模块
- [ ] Post Controller (CRUD + 查询)
- [ ] Post Service
- [ ] Post DTO

#### 3.4 Category 模块
- [ ] Category Controller
- [ ] Category Service
- [ ] Category DTO

#### 3.5 Tag 模块
- [ ] Tag Controller
- [ ] Tag Service
- [ ] Tag DTO

#### 3.6 Mood 模块
- [ ] Mood Controller
- [ ] Mood Service
- [ ] Mood DTO

## 📝 接下来的步骤

### 步骤 1：创建共享模块
```bash
# 创建 common 模块（装饰器、拦截器、过滤器）
nest g module common
nest g decorator common/decorators/current-user
nest g guard common/guards/roles
```

### 步骤 2：创建 Auth 模块
```bash
nest g module auth
nest g service auth
nest g controller auth
```

### 步骤 3：创建业务模块
```bash
# Users
nest g resource users --no-spec

# Posts
nest g resource posts --no-spec

# Categories
nest g resource categories --no-spec

# Tags
nest g resource tags --no-spec

# Moods
nest g resource moods --no-spec
```

## 🎯 API 端点设计

### Auth
```
POST   /api/auth/register     # 注册
POST   /api/auth/login        # 登录
GET    /api/auth/profile      # 获取当前用户信息
POST   /api/auth/refresh      # 刷新 Token
```

### Users
```
GET    /api/users             # 获取用户列表（管理员）
GET    /api/users/:id         # 获取用户详情
PATCH  /api/users/:id         # 更新用户信息
DELETE /api/users/:id         # 删除用户（管理员）
```

### Posts
```
GET    /api/posts                    # 获取文章列表（分页、筛选）
GET    /api/posts/:id                # 获取文章详情
GET    /api/posts/slug/:slug         # 根据 slug 获取文章
POST   /api/posts                    # 创建文章
PATCH  /api/posts/:id                # 更新文章
DELETE /api/posts/:id                # 删除文章
GET    /api/posts/recommended        # 获取推荐文章
GET    /api/posts/category/:category # 按分类获取文章
```

### Categories
```
GET    /api/categories        # 获取分类列表
GET    /api/categories/:id    # 获取分类详情
POST   /api/categories        # 创建分类
PATCH  /api/categories/:id    # 更新分类
DELETE /api/categories/:id    # 删除分类
```

### Tags
```
GET    /api/tags              # 获取标签列表
GET    /api/tags/:id          # 获取标签详情
POST   /api/tags              # 创建标签
PATCH  /api/tags/:id          # 更新标签
DELETE /api/tags/:id          # 删除标签
```

### Moods
```
GET    /api/moods                    # 获取心情列表
GET    /api/moods/today              # 获取今日心情
GET    /api/moods/month/:year/:month # 获取某月心情
POST   /api/moods                    # 创建心情
PATCH  /api/moods/:id                # 更新心情
DELETE /api/moods/:id                # 删除心情
```

## 🔐 权限设计

### 角色
- `USER`: 普通用户
- `EDITOR`: 编辑（可创建、编辑文章）
- `ADMIN`: 管理员（所有权限）

### 权限矩阵

| 资源 | 创建 | 读取 | 更新 | 删除 |
|------|------|------|------|------|
| Post | EDITOR, ADMIN | ALL | EDITOR(own), ADMIN | EDITOR(own), ADMIN |
| Category | ADMIN | ALL | ADMIN | ADMIN |
| Tag | ADMIN | ALL | ADMIN | ADMIN |
| User | - | ADMIN | USER(own), ADMIN | ADMIN |
| Mood | USER(own) | USER(own), ADMIN | USER(own), ADMIN | USER(own), ADMIN |

## 📦 项目结构

```
apps/server/
├── prisma/
│   ├── migrations/          # 数据库迁移
│   └── schema.prisma        # 数据模型
├── src/
│   ├── auth/                # 认证模块
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/              # 共享模块
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── posts/               # 文章模块
│   │   ├── dto/
│   │   ├── posts.controller.ts
│   │   ├── posts.service.ts
│   │   └── posts.module.ts
│   ├── categories/          # 分类模块
│   ├── tags/                # 标签模块
│   ├── users/               # 用户模块
│   ├── moods/               # 心情模块
│   ├── prisma/              # Prisma 服务
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts
├── .env                     # 环境变量
├── .env.example             # 环境变量模板
└── package.json
```

## 🚀 快速命令

```bash
# 开发模式
pnpm --filter server dev

# 构建
pnpm --filter server build

# 启动生产
pnpm --filter server start:prod

# Prisma 命令
cd apps/server

# 生成 Client
npx prisma generate

# 创建迁移
npx prisma migrate dev --name migration_name

# 重置数据库
npx prisma migrate reset

# 查看数据库
npx prisma studio
```

## 🔧 环境变量

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=""
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

## 📚 技术栈

- **框架**: NestJS 10
- **数据库**: PostgreSQL
- **ORM**: Prisma 7
- **认证**: JWT + Passport
- **验证**: class-validator, class-transformer
- **密码**: bcrypt

## ⏭️ 下一步行动

1. ✅ **基础配置完成**
2. 🔄 **正在创建核心模块** ← 当前
3. ⏳ 实现认证系统
4. ⏳ 连接前端
5. ⏳ 对接后台管理

---

**状态**: 🟢 进行中
**完成度**: 40%
**预计完成时间**: 继续开发中...
