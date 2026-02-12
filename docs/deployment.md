# Docker 本地部署指南

## 前置要求

- Docker Engine >= 20.10
- Docker Compose >= 2.0

## 快速开始

### 1. 环境配置

```bash
cp docker/.env.docker.example docker/.env.docker
```

### 2. 启动服务

```bash
docker-compose -f docker/docker-compose.yml --env-file docker/.env.docker up -d
```

### 3. 访问地址

- Web: `http://localhost:3000`
- Admin: `http://localhost:5173`
- Server API: `http://localhost:3001/api`

## 服务管理

```bash
docker-compose -f docker/docker-compose.yml ps
docker-compose -f docker/docker-compose.yml logs -f
docker-compose -f docker/docker-compose.yml stop
docker-compose -f docker/docker-compose.yml down
```

## 说明

当前 Docker 编排包含：
- PostgreSQL
- NestJS Server
- Next.js Web
- Vite Admin（Nginx）
- 可选统一 Nginx 反向代理
