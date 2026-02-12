# Docker 部署文件

本目录包含 Docker 相关配置文件。

## 文件说明

- `docker-compose.yml` - Docker Compose 主配置
- `docker-compose.prod.yml` - 生产环境覆盖配置
- `.env.docker.example` - 环境变量示例
- `server.Dockerfile` - NestJS API Dockerfile
- `web.Dockerfile` - Next.js Dockerfile
- `admin.Dockerfile` - Admin Dockerfile
- `admin-nginx.conf` - Admin Nginx 配置

## 快速开始

```bash
cp docker/.env.docker.example docker/.env.docker
docker-compose -f docker/docker-compose.yml --env-file docker/.env.docker up -d
```

默认访问地址：
- Web: http://localhost:3000
- Admin: http://localhost:5173
- Server API: http://localhost:3001/api
