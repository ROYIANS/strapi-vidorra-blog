# Strapi 快速开始指南

> 完整文档请查看：[docs/STRAPI_SETUP.md](../../docs/STRAPI_SETUP.md)

## 🚀 快速开始（5分钟）

### 1. 安装 Strapi（选择一种方式）

**方式 A：独立安装（推荐）**
```bash
npx create-strapi-app@latest vidorra-cms --quickstart
cd vidorra-cms
npm run develop
```

**方式 B：在 monorepo 中安装**
```bash
cd apps
npx create-strapi-app@latest strapi --quickstart
cd strapi
npm run develop
```

首次启动会自动打开浏览器，创建管理员账号。

### 2. 创建内容模型

在 Strapi 管理面板（http://localhost:1337/admin）：

**Content-Type Builder → Create new collection type**

#### Post（文章）
添加字段：
- title (Text) - Required
- slug (UID) - Required, Unique
- description (Long text)
- content (Rich text/Markdown) - Required
- cover (Media - Single)
- author (Text) - Default: "ROYIANS"
- date (DateTime) - Required
- updated (DateTime) - Required
- published (Boolean) - Default: true
- recommend (Boolean)
- displayMode (Enumeration: "large", "normal")
- excerpt (Long text)

#### Category（分类）
- name (Text) - Required, Unique
- slug (UID) - Required, Unique
- 关系：One-to-many with Post

#### Tag（标签）
- name (Text) - Required, Unique
- slug (UID) - Required, Unique
- 关系：Many-to-many with Post

### 3. 配置 API 权限

**Settings → API Tokens → Create new API Token**
- Name: Frontend App
- Type: Read-only
- Duration: Unlimited
- 复制生成的 token

### 4. 配置前端环境变量

创建 `apps/web/.env.local`：
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=你的token
NEXT_PUBLIC_USE_MOCK=false
```

### 5. 创建测试数据

在 Strapi 中创建：
1. 2-3 个分类（前端开发、技术分享等）
2. 3-5 个标签（React、Next.js、TypeScript等）
3. 5-10 篇文章（记得上传封面图）

### 6. 启动项目

```bash
# 终端 1 - Strapi
cd vidorra-cms
npm run develop

# 终端 2 - Frontend
cd apps/web
pnpm dev
```

访问 http://localhost:3000 查看效果！

## 📋 验证清单

- [ ] Strapi 启动成功（端口 1337）
- [ ] 创建了管理员账号
- [ ] 创建了 Post、Category、Tag 内容模型
- [ ] 生成了 API Token
- [ ] 配置了 `.env.local`
- [ ] 设置 `NEXT_PUBLIC_USE_MOCK=false`
- [ ] 创建了测试数据
- [ ] 前端显示 Strapi 数据

## 🐛 常见问题

**Q: API 返回 403**
A: 检查 API Token 是否正确配置

**Q: 图片不显示**
A: 使用完整的 Strapi URL（包含域名）

**Q: 数据为空**
A: 确保在 Strapi 中创建了测试数据并发布

**Q: 关系字段为空**
A: API 请求中添加 `populate=*` 参数（已在代码中配置）

## 📚 更多信息

- [完整安装指南](../../docs/STRAPI_SETUP.md)
- [Strapi 官方文档](https://docs.strapi.io/)
- [内容模型详细配置](../../docs/STRAPI_SETUP.md#配置内容模型)

有问题？查看完整文档或提 Issue！
