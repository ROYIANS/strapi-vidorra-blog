# Docker 本地部署指南

本指南将帮助你使用 Docker Compose 在本地部署 Strapi-Vidorra Blog。

## 前置要求

- Docker Engine >= 20.10
- Docker Compose >= 2.0

### 安装 Docker

请参考官方文档安装 Docker:
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

## 快速开始

### 1. 环境配置

复制环境变量示例文件：

```bash
cp docker/.env.docker.example docker/.env.docker
```

编辑 `docker/.env.docker` 文件，设置必要的环境变量：

```env
# 数据库配置
POSTGRES_PASSWORD=your_secure_password_here

# Strapi 密钥（使用强随机字符串）
STRAPI_APP_KEYS=your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4
STRAPI_API_TOKEN_SALT=your_api_token_salt
STRAPI_ADMIN_JWT_SECRET=your_admin_jwt_secret
STRAPI_JWT_SECRET=your_jwt_secret
```

> 💡 **提示**: 可以使用 `openssl rand -base64 32` 生成随机密钥

### 2. 启动所有服务

```bash
docker-compose -f docker/docker-compose.yml --env-file docker/.env.docker up -d
```

这将启动以下服务：
- **PostgreSQL** (端口: 5432)
- **Strapi CMS** (端口: 1337)
- **Next.js 前台** (端口: 3000)
- **React 后台** (端口: 5173)

### 3. 访问应用

- 前台应用: http://localhost:3000
- 后台管理: http://localhost:5173
- Strapi 管理面板: http://localhost:1337/admin

### 4. 首次配置 Strapi

1. 访问 http://localhost:1337/admin
2. 创建管理员账号
3. 配置内容类型

## 服务管理

### 查看服务状态

```bash
docker-compose -f docker/docker-compose.yml ps
```

### 查看服务日志

```bash
# 查看所有服务日志
docker-compose -f docker/docker-compose.yml logs -f

# 查看特定服务日志
docker-compose -f docker/docker-compose.yml logs -f web
docker-compose -f docker/docker-compose.yml logs -f admin
docker-compose -f docker/docker-compose.yml logs -f strapi
```

### 重启服务

```bash
# 重启所有服务
docker-compose -f docker/docker-compose.yml restart

# 重启特定服务
docker-compose -f docker/docker-compose.yml restart web
```

### 停止服务

```bash
# 停止所有服务（保留数据）
docker-compose -f docker/docker-compose.yml stop

# 停止并删除容器（保留数据卷）
docker-compose -f docker/docker-compose.yml down

# 停止并删除所有内容（包括数据）
docker-compose -f docker/docker-compose.yml down -v
```

## 部署模式

### 仅启动数据库和 Strapi

适用于前端开发场景：

```bash
docker-compose -f docker/docker-compose.yml up -d postgres strapi
```

### 启动包含 Nginx 的完整服务

```bash
docker-compose -f docker/docker-compose.yml --profile with-nginx up -d
```

访问地址将变为：
- 所有服务: http://localhost (Nginx 反向代理)

### 生产环境部署

使用生产环境配置覆盖：

```bash
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml --env-file docker/.env.docker up -d
```

## 数据管理

### 数据持久化

Docker Compose 创建了以下数据卷：
- `postgres_data`: PostgreSQL 数据库数据
- `strapi_uploads`: Strapi 上传的媒体文件

### 备份数据

```bash
# 备份 PostgreSQL 数据库
docker-compose -f docker/docker-compose.yml exec postgres pg_dump -U postgres vidorra_blog > backup.sql

# 备份 Strapi 上传文件
docker run --rm -v vidorra_strapi_uploads:/data -v $(pwd):/backup alpine tar czf /backup/strapi-uploads.tar.gz -C /data .
```

### 恢复数据

```bash
# 恢复 PostgreSQL 数据库
docker-compose -f docker/docker-compose.yml exec -T postgres psql -U postgres vidorra_blog < backup.sql

# 恢复 Strapi 上传文件
docker run --rm -v vidorra_strapi_uploads:/data -v $(pwd):/backup alpine tar xzf /backup/strapi-uploads.tar.gz -C /data
```

## 性能优化

### 构建优化

使用 BuildKit 加速构建：

```bash
DOCKER_BUILDKIT=1 docker-compose -f docker/docker-compose.yml build
```

### 资源限制

编辑 `docker/docker-compose.yml` 添加资源限制：

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 故障排查

### 容器无法启动

```bash
# 查看容器日志
docker-compose -f docker/docker-compose.yml logs [service_name]

# 检查容器状态
docker-compose -f docker/docker-compose.yml ps
```

### 端口冲突

修改 `docker/docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "3001:3000"  # 将本地端口改为 3001
```

### 数据库连接失败

检查 Strapi 的数据库配置和 PostgreSQL 健康检查状态：

```bash
docker-compose -f docker/docker-compose.yml exec postgres pg_isready -U postgres
```

### 重建镜像

清除缓存重新构建：

```bash
docker-compose -f docker/docker-compose.yml build --no-cache
docker-compose -f docker/docker-compose.yml up -d
```

## 开发工作流

### 本地开发 + Docker 数据库

仅启动数据库，本地运行应用：

```bash
# 启动数据库
docker-compose -f docker/docker-compose.yml up -d postgres

# 本地运行应用
pnpm dev
```

## 安全建议

1. **修改默认密码**: 确保修改所有默认密码
2. **使用强密钥**: 使用随机生成的强密钥
3. **网络隔离**: 生产环境不要暴露数据库端口
4. **HTTPS**: 生产环境使用 HTTPS (配置 Nginx SSL)
5. **定期备份**: 设置自动备份任务

## 下一步

- 配置 [Nginx 反向代理](./nginx-setup.md)
- 设置 [SSL 证书](./ssl-setup.md)
- 配置 [CI/CD 流程](./ci-cd.md)
