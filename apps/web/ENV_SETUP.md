# 环境变量说明

本项目使用环境变量来配置不同的功能和服务。

## 📁 文件位置

```
apps/web/
├── .env.example       # 环境变量模板（提交到 git）
├── .env.local         # 本地开发配置（不提交到 git）
└── .env.production    # 生产环境配置（部署时使用）
```

## 🔧 配置说明

### Strapi CMS 配置

```bash
# Strapi API 地址
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Strapi API Token（在 Strapi 管理面板生成）
# Settings → API Tokens → Create new API Token
STRAPI_API_TOKEN=your_token_here

# 数据源切换
# true  = 使用 mock 数据（开发阶段）
# false = 使用 Strapi API（Strapi 配置完成后）
NEXT_PUBLIC_USE_MOCK=true
```

### 其他配置（未来扩展）

```bash
# 评论系统
NEXT_PUBLIC_COMMENT_ENABLED=false

# 分析统计
NEXT_PUBLIC_GA_ID=

# 搜索服务
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_API_KEY=
```

## 🚀 使用方法

### 1. 开发环境

复制示例文件并配置：

```bash
cd apps/web
cp .env.example .env.local
```

编辑 `.env.local` 填入你的配置。

### 2. 生产环境

在部署平台（如 Vercel）配置环境变量：

- 进入项目设置
- 找到 Environment Variables
- 添加上述环境变量
- 重新部署

## ⚠️ 注意事项

1. **不要提交 `.env.local` 到 git**
   - 已在 `.gitignore` 中忽略
   - 包含敏感信息（API Token 等）

2. **`NEXT_PUBLIC_` 前缀的变量**
   - 会暴露到浏览器端
   - 不要在这些变量中存储敏感信息

3. **敏感信息保护**
   - API Token 应只有服务端使用
   - 使用 `STRAPI_API_TOKEN`（无前缀）而不是 `NEXT_PUBLIC_STRAPI_API_TOKEN`

## 📚 相关文档

- [Strapi 快速开始](./STRAPI_QUICKSTART.md)
- [Strapi 完整配置](../../docs/STRAPI_SETUP.md)
- [Next.js 环境变量文档](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🔍 验证配置

启动开发服务器验证配置是否正确：

```bash
pnpm dev
```

检查终端输出，确认没有环境变量相关的错误。
