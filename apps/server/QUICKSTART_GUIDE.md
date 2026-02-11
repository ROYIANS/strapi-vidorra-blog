# NestJS 后端开发快速指南

## 🎯 当前状态

✅ **已完成**：
- NestJS 项目初始化
- PostgreSQL 数据库连接
- Prisma ORM 配置
- 数据模型创建和迁移
- 基础配置（CORS, 验证管道, 环境变量）

🔄 **正在进行**：创建核心业务模块

## 🚀 快速创建所有模块

### 方式一：使用 NestJS CLI（推荐）

```bash
cd apps/server

# 1. 创建 Auth 模块
nest g module auth
nest g service auth --no-spec
nest g controller auth --no-spec

# 2. 创建 Users 模块
nest g resource users --no-spec

# 3. 创建 Posts 模块
nest g resource posts --no-spec

# 4. 创建 Categories 模块
nest g resource categories --no-spec

# 5. 创建 Tags 模块
nest g resource tags --no-spec

# 6. 创建 Moods 模块
nest g resource moods --no-spec

# 7. 创建 Common 模块（共享工具）
nest g module common
```

### 方式二：手动创建（参考下面的代码模板）

## 📝 核心模块代码模板

### 1. Auth 模块（认证）

#### `src/auth/dto/register.dto.ts`
```typescript
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name?: string;
}
```

#### `src/auth/dto/login.dto.ts`
```typescript
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
```

#### `src/auth/auth.service.ts`
```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        avatar: true,
      },
    });
  }
}
```

#### `src/auth/auth.controller.ts`
```typescript
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}
```

#### `src/auth/strategies/jwt.strategy.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return this.authService.validateUser(payload.sub);
  }
}
```

#### `src/auth/guards/jwt-auth.guard.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

#### `src/auth/auth.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN', '7d'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### 2. Common 模块（共享工具）

#### `src/common/decorators/current-user.decorator.ts`
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

#### `src/common/decorators/roles.decorator.ts`
```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

#### `src/common/guards/roles.guard.ts`
```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### 3. Posts 模块（文章）

#### `src/posts/dto/create-post.dto.ts`
```typescript
import { IsString, IsOptional, IsBoolean, IsEnum, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsBoolean()
  @IsOptional()
  recommend?: boolean;

  @IsEnum(['LARGE', 'NORMAL'])
  @IsOptional()
  displayMode?: 'LARGE' | 'NORMAL';

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsArray()
  @IsOptional()
  tagIds?: string[];
}
```

#### `src/posts/dto/update-post.dto.ts`
```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
```

#### `src/posts/posts.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePostDto) {
    const { tagIds, ...postData } = dto;

    return this.prisma.post.create({
      data: {
        ...postData,
        authorId: userId,
        tags: tagIds ? { connect: tagIds.map(id => ({ id })) } : undefined,
      },
      include: {
        author: { select: { id: true, username: true, name: true } },
        category: true,
        tags: true,
      },
    });
  }

  async findAll(page = 1, limit = 10, filters: any = {}) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          author: { select: { id: true, username: true, name: true } },
          category: true,
          tags: true,
        },
      }),
      this.prisma.post.count({ where: filters }),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true } },
        category: true,
        tags: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, username: true, name: true, avatar: true } },
        category: true,
        tags: true,
      },
    });
  }

  async update(id: string, dto: UpdatePostDto) {
    const { tagIds, ...postData } = dto;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...postData,
        tags: tagIds ? { set: tagIds.map(id => ({ id })) } : undefined,
      },
      include: {
        author: { select: { id: true, username: true, name: true } },
        category: true,
        tags: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
```

#### `src/posts/posts.controller.ts`
```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR', 'ADMIN')
  create(@CurrentUser() user: any, @Body() dto: CreatePostDto) {
    return this.postsService.create(user.id, dto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('published') published?: boolean,
    @Query('category') category?: string,
  ) {
    const filters: any = {};
    if (published !== undefined) filters.published = published;
    if (category) filters.categoryId = category;

    return this.postsService.findAll(page, limit, filters);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EDITOR', 'ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
```

## 📦 更新 app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
// 其他模块...

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    PostsModule,
    // 其他模块...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 🧪 测试 API

### 1. 注册用户
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "username": "admin",
    "password": "password123",
    "name": "Admin User"
  }'
```

### 2. 登录
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

### 3. 获取文章列表
```bash
curl http://localhost:3001/api/posts?page=1&limit=10
```

### 4. 创建文章（需要 Token）
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Post",
    "slug": "my-first-post",
    "content": "Post content here...",
    "published": true
  }'
```

## 📝 下一步

1. 按照上面的模板创建所有模块
2. 实现 Categories、Tags、Moods 模块（类似 Posts）
3. 添加文件上传功能
4. 连接前端应用
5. 对接后台管理系统

## 🔗 相关文档

- [开发进度](./DEVELOPMENT_PROGRESS.md)
- [Prisma Schema](./prisma/schema.prisma)
- [环境变量](./.env.example)

---

**提示**: 所有代码模板可以直接复制使用。遇到问题请查看 NestJS 官方文档。
