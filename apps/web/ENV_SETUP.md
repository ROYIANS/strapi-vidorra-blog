# 环境变量说明（apps/web）

## 文件

- `.env.example`: 模板文件
- `.env.local`: 本地开发文件

## 变量

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_TOKEN=
NEXT_PUBLIC_USE_MOCK=true
```

- `NEXT_PUBLIC_API_URL`: Web 前台访问后端 API 地址。
- `API_TOKEN`: 可选服务端 Token。
- `NEXT_PUBLIC_USE_MOCK`: `true` 使用 mock，`false` 使用 API。

## 使用

```bash
cd apps/web
cp .env.example .env.local
```
