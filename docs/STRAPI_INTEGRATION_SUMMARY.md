# 🎉 Strapi CMS 接入完成

恭喜！你已经准备好接入 Strapi Headless CMS 了。

## 📚 文档导航

我已经为你准备了完整的接入文档：

### 1. 快速开始（5分钟）
📄 **[apps/web/STRAPI_QUICKSTART.md](../apps/web/STRAPI_QUICKSTART.md)**
- 适合快速体验
- 5步完成基本配置
- 包含验证清单

### 2. 完整配置指南
📄 **[docs/STRAPI_SETUP.md](./STRAPI_SETUP.md)**
- 详细的安装步骤
- 内容模型完整配置
- 生产环境部署指南
- 常见问题解答

### 3. 环境变量配置
📄 **[apps/web/ENV_SETUP.md](../apps/web/ENV_SETUP.md)**
- 环境变量说明
- 配置模板
- 安全注意事项

## 🚀 接入流程概览

```
┌─────────────────────────────────────────────────────────────┐
│  第1步：安装 Strapi                                           │
│  npx create-strapi-app@latest vidorra-cms --quickstart     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  第2步：创建内容模型                                          │
│  - Post（文章）                                              │
│  - Category（分类）                                          │
│  - Tag（标签）                                               │
│  - Mood（心情）                                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  第3步：配置 API 权限                                         │
│  生成 API Token 或配置公开访问                                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  第4步：配置环境变量                                          │
│  创建 apps/web/.env.local                                   │
│  设置 NEXT_PUBLIC_USE_MOCK=false                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  第5步：创建测试数据                                          │
│  在 Strapi 中创建几篇文章                                     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  第6步：启动并测试                                            │
│  pnpm dev                                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ 可用命令

项目已配置好以下命令：

```bash
# 开发模式
pnpm dev               # 启动所有应用
pnpm dev:web           # 只启动前端
pnpm dev:strapi        # 只启动 Strapi

# 构建
pnpm build             # 构建所有应用
pnpm build:web         # 只构建前端
pnpm build:strapi      # 只构建 Strapi

# 数据迁移
pnpm migrate:strapi    # 将 mock 数据迁移到 Strapi
```

## 📂 已创建的文件

```
项目根目录/
├── docs/
│   └── STRAPI_SETUP.md              ← 完整安装指南
├── apps/web/
│   ├── .env.example                 ← 环境变量模板
│   ├── STRAPI_QUICKSTART.md         ← 快速开始
│   └── ENV_SETUP.md                 ← 环境变量说明
└── scripts/
    └── migrate-to-strapi.ts         ← 数据迁移脚本
```

## ⚡ 快速开始（命令行版）

```bash
# 1. 安装 Strapi
npx create-strapi-app@latest vidorra-cms --quickstart

# 2. 启动 Strapi（新终端）
cd vidorra-cms
npm run develop
# 访问 http://localhost:1337/admin 创建管理员账号

# 3. 在 Strapi 中：
#    - 创建内容模型（Post, Category, Tag）
#    - 生成 API Token
#    - 创建测试数据

# 4. 配置前端环境变量（新终端，回到项目根目录）
cd apps/web
cp .env.example .env.local
# 编辑 .env.local，填入配置

# 5. 启动前端
pnpm dev:web
# 访问 http://localhost:3000
```

## ✅ 验证步骤

完成配置后，按以下步骤验证：

### 1. Strapi 验证
```bash
# 访问 Strapi 管理面板
http://localhost:1337/admin

# 访问 API 端点
http://localhost:1337/api/posts?populate=*
```

### 2. 前端验证
```bash
# 启动前端
pnpm dev:web

# 访问首页
http://localhost:3000

# 检查控制台是否有错误
```

### 3. 数据验证
- [ ] 首页显示 Strapi 中的文章
- [ ] 文章封面图正常显示
- [ ] 分类和标签关联正确
- [ ] 推荐文章角标显示
- [ ] 大图/小图模式正确

## 🎯 内容模型配置清单

### Post（文章）- 必需字段

```typescript
{
  title: string          // 标题 *
  slug: string          // URL别名 * (唯一)
  content: string       // 内容 * (Markdown/Rich text)
  author: string        // 作者 * (默认: "ROYIANS")
  date: datetime        // 发布日期 *
  updated: datetime     // 更新日期 *
  published: boolean    // 是否发布 * (默认: true)

  // 可选但推荐
  description: string   // 描述
  cover: media         // 封面图
  excerpt: string      // 摘要
  recommend: boolean   // 推荐 (默认: false)
  displayMode: enum    // 显示模式 ["large", "normal"]
  readTime: number     // 阅读时间（分钟）
  wordCount: number    // 字数

  // 关系
  category: relation   // 分类 (Many-to-One)
  tags: relation       // 标签 (Many-to-Many)
}
```

### Category（分类）

```typescript
{
  name: string         // 名称 * (唯一)
  slug: string        // URL别名 * (唯一)
  description: string // 描述
  posts: relation     // 文章 (One-to-Many)
}
```

### Tag（标签）

```typescript
{
  name: string        // 名称 * (唯一)
  slug: string       // URL别名 * (唯一)
  posts: relation    // 文章 (Many-to-Many)
}
```

## 🔐 API Token 配置

在 Strapi 管理面板：

**Settings → API Tokens → Create new API Token**

配置项：
- **Name**: `Frontend App`
- **Description**: `Token for frontend application`
- **Token type**: `Read-only` (推荐) 或 `Full access`
- **Token duration**: `Unlimited`

生成后复制 Token，配置到 `.env.local`：
```bash
STRAPI_API_TOKEN=你的token
```

## 📊 数据迁移

如果你已经有 mock 数据想迁移到 Strapi：

```bash
# 1. 配置迁移脚本
# 编辑 scripts/migrate-to-strapi.ts
# 填入 STRAPI_URL 和 API_TOKEN

# 2. 运行迁移
pnpm migrate:strapi

# 或直接使用环境变量
STRAPI_URL=http://localhost:1337 \
STRAPI_API_TOKEN=your_token \
pnpm migrate:strapi
```

## 🐛 常见问题

### Q1: Strapi 安装失败
**原因**: Node.js 版本过低或数据库连接失败
**解决**:
- 确保 Node.js >= 18
- 使用 `--quickstart` 参数自动配置 SQLite

### Q2: API 返回 403 Forbidden
**原因**: API Token 未配置或权限不足
**解决**:
- 检查 `.env.local` 中的 `STRAPI_API_TOKEN`
- 或在 Strapi 中配置公开访问权限

### Q3: 前端显示 mock 数据
**原因**: `NEXT_PUBLIC_USE_MOCK` 仍为 `true`
**解决**:
```bash
# apps/web/.env.local
NEXT_PUBLIC_USE_MOCK=false
```

### Q4: 图片不显示
**原因**: 图片 URL 不完整或 CORS 配置问题
**解决**:
- 确保图片 URL 包含完整域名
- 检查 Strapi CORS 配置

### Q5: 关系字段数据为空
**原因**: API 请求未包含 populate 参数
**解决**: 已在代码中配置 `populate=*`，检查 Strapi 中是否创建了关联数据

## 📞 需要帮助？

- 查看完整文档：[docs/STRAPI_SETUP.md](./STRAPI_SETUP.md)
- Strapi 官方文档：https://docs.strapi.io/
- 提交 Issue：项目 GitHub Issues

## 🎓 下一步

完成 Strapi 接入后，你可以：

1. **配置文章详情页** - 实现单篇文章的展示
2. **添加搜索功能** - 集成全文搜索
3. **实现分页** - 完善文章列表分页
4. **优化图片加载** - 配置图片 CDN
5. **添加 SEO** - 配置元数据和 sitemap
6. **部署到生产** - 部署 Strapi 和前端

祝你接入顺利！🚀
