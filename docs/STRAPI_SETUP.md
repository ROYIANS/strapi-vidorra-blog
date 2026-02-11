# Strapi CMS 接入指南

本指南将帮助你将 Strapi Headless CMS 接入到 Vidorra 博客项目中。

## 📋 目录

1. [环境准备](#环境准备)
2. [安装 Strapi](#安装-strapi)
3. [配置内容模型](#配置内容模型)
4. [配置环境变量](#配置环境变量)
5. [测试 API 连接](#测试-api-连接)
6. [迁移数据](#迁移数据)

---

## 🔧 环境准备

### 所需环境
- Node.js >= 18.0.0
- npm >= 6.0.0 或 pnpm >= 8.0.0
- 数据库（PostgreSQL / MySQL / SQLite）

### 推荐配置
- PostgreSQL 14+ （生产环境）
- SQLite （开发环境）

---

## 📦 安装 Strapi

### 方式一：在 monorepo 中创建 Strapi 应用

```bash
# 在项目根目录执行
cd apps
npx create-strapi-app@latest strapi --quickstart

# 或使用特定数据库
npx create-strapi-app@latest strapi \
  --dbclient=postgres \
  --dbhost=localhost \
  --dbport=5432 \
  --dbname=vidorra \
  --dbusername=postgres \
  --dbpassword=password
```

### 方式二：独立安装（推荐）

```bash
# 在项目外单独创建
npx create-strapi-app@latest vidorra-cms --quickstart

# 启动 Strapi
cd vidorra-cms
npm run develop
```

首次启动会自动打开浏览器访问 `http://localhost:1337/admin`，创建管理员账号。

---

## 🗂️ 配置内容模型（Content Types）

### 1. Post（文章）

在 Strapi 管理面板中创建以下内容类型：

**Content-Type Builder → Create new collection type**

#### 基本字段

| 字段名 | 类型 | 配置 |
|--------|------|------|
| title | Text (Short text) | Required, Unique |
| slug | UID (Attached to title) | Required, Unique |
| description | Text (Long text) | Optional |
| content | Rich text (Markdown) | Required |
| cover | Media (Single) | Optional |
| author | Text (Short text) | Required, Default: "ROYIANS" |
| published | Boolean | Required, Default: true |
| date | DateTime | Required |
| updated | DateTime | Required |

#### 关系字段

| 字段名 | 类型 | 关系 |
|--------|------|------|
| category | Relation | Many-to-one with Category |
| tags | Relation | Many-to-many with Tag |

#### 高级字段

| 字段名 | 类型 | 配置 |
|--------|------|------|
| readTime | Number (Integer) | Optional |
| wordCount | Number (Integer) | Optional |
| recommend | Boolean | Default: false |
| displayMode | Enumeration | Values: "large", "normal" |
| excerpt | Text (Long text) | Optional |

### 2. Category（分类）

| 字段名 | 类型 | 配置 |
|--------|------|------|
| name | Text (Short text) | Required, Unique |
| slug | UID (Attached to name) | Required, Unique |
| description | Text (Long text) | Optional |
| posts | Relation | One-to-many with Post |

### 3. Tag（标签）

| 字段名 | 类型 | 配置 |
|--------|------|------|
| name | Text (Short text) | Required, Unique |
| slug | UID (Attached to name) | Required, Unique |
| posts | Relation | Many-to-many with Post |

### 4. Mood（心情）

| 字段名 | 类型 | 配置 |
|--------|------|------|
| date | DateTime | Required, Unique |
| mood | Enumeration | Values: "happy", "sad", "star", "love", "angry", etc. |
| name | Text (Short text) | Optional |
| description | Text (Long text) | Optional |

---

## 🔑 配置 API 权限

### 1. 创建 API Token

**Settings → API Tokens → Create new API Token**

- **Name**: Frontend App
- **Token type**: Read-only (或 Full access)
- **Token duration**: Unlimited
- **复制生成的 token**，稍后配置到环境变量

### 2. 配置公开权限（可选）

如果不想使用 token，可以设置公开访问：

**Settings → Users & Permissions Plugin → Roles → Public**

勾选以下权限：
- ✅ Post: find, findOne
- ✅ Category: find, findOne
- ✅ Tag: find, findOne
- ✅ Mood: find, findOne

---

## ⚙️ 配置环境变量

### 1. 创建前端环境变量文件

在 `apps/web` 目录下创建 `.env.local` 文件：

```bash
# apps/web/.env.local

# Strapi API 配置
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here

# 切换到真实数据（不使用 mock）
NEXT_PUBLIC_USE_MOCK=false
```

### 2. 创建环境变量示例文件

```bash
# apps/web/.env.example

# Strapi API 配置
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=

# 数据源切换
# true = 使用 mock 数据，false = 使用 Strapi API
NEXT_PUBLIC_USE_MOCK=true
```

---

## 🧪 测试 API 连接

### 1. 启动 Strapi

```bash
cd vidorra-cms
npm run develop
```

访问 http://localhost:1337/admin 确认 Strapi 正常运行。

### 2. 创建测试数据

在 Strapi 管理面板中：
1. 创建几个 Category（如：前端开发、技术分享）
2. 创建几个 Tag（如：React、Next.js、TypeScript）
3. 创建 1-2 篇测试文章

### 3. 测试 API 响应

在浏览器访问：
```
http://localhost:1337/api/posts?populate=*
```

应该返回 JSON 格式的文章数据。

### 4. 启动前端项目

```bash
cd apps/web
pnpm dev
```

访问 http://localhost:3000，检查是否正确显示 Strapi 数据。

---

## 🔄 迁移数据（从 mock 到 Strapi）

### 方式一：手动迁移

在 Strapi 管理面板中手动创建内容。

### 方式二：使用脚本迁移

创建迁移脚本 `scripts/migrate-to-strapi.ts`：

\`\`\`typescript
import { mockPosts } from '../apps/web/src/lib/mock-posts'

const STRAPI_URL = 'http://localhost:1337'
const API_TOKEN = 'your_token_here'

async function migrateData() {
  for (const post of mockPosts) {
    try {
      const response = await fetch(\`\${STRAPI_URL}/api/posts\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${API_TOKEN}\`
        },
        body: JSON.stringify({
          data: {
            title: post.title,
            slug: post.slug,
            description: post.description,
            content: post.excerpt,
            cover: post.cover,
            author: post.author,
            date: post.date,
            updated: post.updated,
            published: post.published,
            category: post.category,
            tags: post.tags,
            recommend: post.recommend,
            displayMode: post.displayMode,
            readTime: post.readTime,
            wordCount: post.wordCount,
            excerpt: post.excerpt
          }
        })
      })

      if (response.ok) {
        console.log(\`✅ 已迁移: \${post.title}\`)
      } else {
        console.error(\`❌ 失败: \${post.title}\`, await response.text())
      }
    } catch (error) {
      console.error(\`❌ 错误: \${post.title}\`, error)
    }
  }
}

migrateData()
\`\`\`

运行迁移：
```bash
npx tsx scripts/migrate-to-strapi.ts
```

---

## 📊 Strapi 响应格式适配

### Strapi 标准响应格式

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "文章标题",
        "slug": "article-slug",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "publishedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

### 前端数据转换（如果需要）

当前 API client 已经处理了 Strapi 响应格式，但如果需要进一步转换，可以在 `services/posts.ts` 中添加转换函数。

---

## 🚀 部署到生产环境

### 1. Strapi 部署

推荐部署平台：
- **Railway.app** - 简单快速
- **Render** - 免费套餐
- **Vercel** - 需要额外配置
- **自建服务器** - VPS/Docker

### 2. 配置生产环境变量

```bash
# Vercel 部署前端时配置
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=production_token
NEXT_PUBLIC_USE_MOCK=false
```

### 3. 配置 CORS

在 Strapi 中配置允许前端域名：

`config/middlewares.js`：

\`\`\`javascript
module.exports = [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://your-frontend-domain.com'],
      credentials: true,
    },
  },
]
\`\`\`

---

## 🎯 验证清单

配置完成后，检查以下项：

- [ ] Strapi 成功启动（http://localhost:1337/admin）
- [ ] 创建了管理员账号
- [ ] 创建了所有内容类型（Post, Category, Tag, Mood）
- [ ] 配置了 API 权限或生成了 API Token
- [ ] 前端 `.env.local` 配置正确
- [ ] 设置 `NEXT_PUBLIC_USE_MOCK=false`
- [ ] 创建了测试数据
- [ ] 前端能正确获取和显示 Strapi 数据
- [ ] 图片上传功能正常
- [ ] 分类和标签关联正常

---

## 🔧 常见问题

### Q1: API 请求返回 403 Forbidden
**A**: 检查 API Token 是否正确，或者配置公开权限。

### Q2: 图片无法显示
**A**: 确保图片 URL 包含完整的 Strapi 域名，检查 CORS 配置。

### Q3: 关系字段数据为空
**A**: 使用 `populate=*` 参数，或指定具体字段如 `populate[category]=*&populate[tags]=*`。

### Q4: 数据库连接失败
**A**: 检查数据库配置，确保数据库服务正在运行。

---

## 📚 参考资源

- [Strapi 官方文档](https://docs.strapi.io/)
- [Strapi REST API 文档](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html)
- [Next.js 数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

## ✅ 下一步

完成 Strapi 接入后，可以继续：
1. 配置文章详情页
2. 添加搜索功能
3. 实现评论系统
4. 配置 SEO 元数据
5. 添加站点地图

有任何问题随时咨询！🎉
