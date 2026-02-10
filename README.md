# Strapi-Vidorra Blog

<div align="center">

![Logo](./docs/assets/logo.png)

**一款对标 Medium 的现代化博客系统**

[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-4.0+-purple)](https://strapi.io/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)](https://pnpm.io/)

[在线演示](https://vidorra-blog.demo) | [文档](./docs) | [更新日志](./CHANGELOG.md)

</div>

## ✨ 特性

### 🎨 主题市场
- 支持自定义主题，轻松切换网站风格
- 默认主题继承自 [hexo-theme-vidorra](./old_project)，优雅简洁
- 主题编辑器，可视化定制配色和布局
- 社区主题商店，分享和下载优质主题

### 📅 心情日历
- 每日签到记录当天心情和天气
- 上传照片和文字，记录生活点滴
- 日历视图查看历史心情
- 心情统计和趋势分析

### 📝 极致阅读体验
- Medium 级别的排版和交互设计
- 优化的中文排版引擎
- 代码高亮和 Markdown 支持
- 暗黑模式和自适应布局
- 丝滑的页面切换动画

### ⚙️ 强大后台
- 完整的文章和评论管理
- 直观的 Markdown 编辑器
- 媒体库管理
- 数据统计和分析
- 用户权限控制

## 🏗️ 技术架构

Strapi-Vidorra Blog 采用现代化的 Monorepo 架构，基于 pnpm workspace 管理。

```
strapi-vidorra-blog/
├── apps/
│   ├── web/              # 📱 Next.js 前台应用
│   └── admin/            # ⚙️ React + Vite 后台应用
├── packages/
│   ├── ui/               # 🎨 共享 UI 组件库
│   ├── theme/            # 🌈 主题系统
│   ├── utils/            # 🔧 通用工具
│   └── types/            # 📘 TypeScript 类型
├── backend/
│   └── strapi/           # 🗄️ Strapi CMS
└── old_project/          # 🎨 原始设计参考
```

### 核心技术栈

| 模块 | 技术 |
|------|------|
| **前台** | Next.js 14, TailwindCSS, Zustand |
| **后台** | React 18, Vite, Ant Design |
| **CMS** | Strapi v4, PostgreSQL |
| **工具链** | pnpm, Turborepo, TypeScript |

详见 [技术架构文档](./docs/architecture.md)

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14 (生产环境)

### 安装

```bash
# 克隆仓库
git clone https://github.com/ROYIANS/strapi-vidorra-blog.git
cd strapi-vidorra-blog

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

这将同时启动：
- 前台应用: http://localhost:3000
- 后台应用: http://localhost:5173
- Strapi CMS: http://localhost:1337

### 构建和部署

```bash
# 构建所有应用
pnpm build

# 启动生产环境
pnpm start
```

详见 [部署指南](./docs/deployment.md)

## 📚 文档

- [快速开始](./docs/getting-started.md)
- [开发指南](./docs/development.md)
- [主题开发](./docs/theme-development.md)
- [API 文档](./docs/api.md)
- [部署指南](./docs/deployment.md)

## 🗺️ 路线图

### ✅ Phase 1: 基础架构 (已完成)
- [x] Monorepo 初始化
- [x] 前台项目搭建
- [x] 后台项目搭建
- [x] Strapi 配置

### 🚧 Phase 2: 核心功能 (进行中)
- [ ] 主题系统
- [ ] 文章系统
- [ ] 心情日历
- [ ] 用户认证

### 📋 Phase 3: 高级功能
- [ ] 主题市场
- [ ] 评论系统
- [ ] 数据分析
- [ ] SEO 优化

### 🔮 未来计划
- [ ] 多语言支持
- [ ] 全文搜索
- [ ] 移动端 App
- [ ] AI 辅助写作

详见 [完整路线图](./docs/roadmap.md)

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

请阅读 [贡献指南](./CONTRIBUTING.md) 了解详细信息。

## 📄 许可证

本项目采用 Apache-2.0 许可证 - 详见 [LICENSE](./LICENSE) 文件

## 👨‍💻 作者

**ROYIANS**
- 网站: [https://www.royians.cn](https://www.royians.cn)
- GitHub: [@ROYIANS](https://github.com/ROYIANS)
- Email: admin@royians.cn

## 🙏 致谢

- 设计灵感来自 [hexo-theme-vidorra](./old_project)
- 感谢所有贡献者和支持者

## 📮 联系方式

有问题或建议？欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/ROYIANS/strapi-vidorra-blog/issues)
- 发送邮件至 admin@royians.cn
- 加入我们的 [Discord 社区](https://discord.gg/vidorra)

---

<div align="center">
  Made with ❤️ by <a href="https://www.royians.cn">ROYIANS</a>
</div>
