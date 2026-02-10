# Docker 部署文件

本目录包含所有 Docker 相关的配置文件。

## 文件说明

- `docker-compose.yml` - Docker Compose 主配置文件
- `docker-compose.prod.yml` - 生产环境配置覆盖
- `.env.docker.example` - 环境变量示例文件
- `web.Dockerfile` - Next.js 前台应用 Dockerfile
- `admin.Dockerfile` - React 后台应用 Dockerfile
- `strapi.Dockerfile` - Strapi CMS Dockerfile
- `admin-nginx.conf` - 后台应用 nginx 配置
- `nginx/` - Nginx 反向代理配置

## 快速开始

### 1. 配置环境变量

```bash
# 复制环境变量示例文件
cp .env.docker.example .env.docker

# 编辑环境变量
# 修改数据库密码和 Strapi 密钥
vim .env.docker
```

### 2. 启动所有服务

```bash
# 从项目根目录运行
docker-compose -f docker/docker-compose.yml --env-file docker/.env.docker up -d
```

或使用快捷脚本：

```bash
# Windows
.\docker\start.ps1

# Linux/Mac
./docker/start.sh
```

### 3. 访问应用

- 前台: http://localhost:3000
- 后台: http://localhost:5173
- Strapi: http://localhost:1337/admin

## 常用命令

```bash
# 查看日志
docker-compose -f docker/docker-compose.yml logs -f

# 停止服务
docker-compose -f docker/docker-compose.yml stop

# 重启服务
docker-compose -f docker/docker-compose.yml restart

# 清理 (保留数据)
docker-compose -f docker/docker-compose.yml down

# 完全清理 (删除数据)
docker-compose -f docker/docker-compose.yml down -v
```

## 目录结构

```
docker/
├── README.md                    # 本文件
├── docker-compose.yml          # 主配置
├── docker-compose.prod.yml     # 生产环境配置
├── .env.docker.example         # 环境变量示例
├── web.Dockerfile              # 前台 Dockerfile
├── admin.Dockerfile            # 后台 Dockerfile
├── strapi.Dockerfile           # CMS Dockerfile
├── admin-nginx.conf            # 后台 nginx 配置
├── nginx/                      # Nginx 配置
│   ├── nginx.conf             # 主配置
│   └── ssl/                   # SSL 证书
└── scripts/                    # 辅助脚本
    ├── start.sh               # Linux/Mac 启动脚本
    └── start.ps1              # Windows 启动脚本
```

## 更多信息

详细部署指南请参考：[../docs/deployment.md](../docs/deployment.md)
