# 心情卡片修复说明

## 完成的修改

### 1. **复制心情图标资源**
- 源路径：`docs/old_project/assets/image/default/mood/`
- 目标路径：`apps/web/public/images/mood/`
- 共复制 **30 个心情图标** PNG 文件

### 2. **创建心情配置文件** (apps/web/src/lib/moods.ts)
- 映射心情名称到图片路径
- 支持多种命名格式（camelCase 和 kebab-case）
- 包含所有 30 种心情图标的映射

心情类型包括：
- happy, sad, angry, cry, shocked
- love, heart, kiss
- star, shinny
- surprised, wondering
- dead, hurt, ill
- 等 30 种心情

### 3. **更新 MoodCalendar 组件** (apps/web/src/components/home/MoodCalendar.tsx)
**主要改进**：
- ✅ 使用真实的心情图片（替换 emoji）
- ✅ 使用 Next.js Image 组件优化性能
- ✅ 日历格子布局（7x6 网格）
- ✅ 月份导航（上一月/当前月/下一月）
- ✅ 当天标记（右下角橙色圆点）
- ✅ Hover 效果（图片淡出动画）
- ✅ 响应式星期标签颜色（浅色/深色模式）

**颜色配置**：
- 星期标签背景：`#699054` (浅色) / `#5f834f` (深色)
- 日期背景：`#e4ebe0` (浅色) / `#567647` (深色)

### 4. **更新 MoodToday 组件** (apps/web/src/components/home/MoodToday.tsx)
**主要改进**：
- ✅ 使用真实的心情图片（替换 emoji）
- ✅ 图片尺寸 80x80px
- ✅ Hover Y轴旋转动画
- ✅ 左右渐变遮罩
- ✅ 滚动文字背景动画
- ✅ 奇数行显示心情描述，偶数行显示日期

**动画效果**：
- 图片 hover 时 Y 轴旋转（1.5秒）
- 背景文字无限滚动（5秒循环）

### 5. **更新 HomeSidebarMood 组件** (apps/web/src/components/home/HomeSidebarMood.tsx)
**主要改进**：
- ✅ 使用 shadcn UI Tabs 组件
- ✅ 响应式布局优化
  - 小屏到大屏（md-xl）：Tabs 切换
  - 超大屏（>xl）：并排显示
- ✅ 顶部彩色渐变背景
- ✅ 问候语（根据时间变化）
- ✅ 一言展示
- ✅ 城市信息显示

**时间问候语**：
- 4-10点：早上好
- 11-13点：中午好
- 14-18点：下午好
- 19-3点：晚上好

### 6. **添加滚动动画 CSS** (apps/web/src/app/globals.css)
**新增动画**：

1. **心情滚动动画**：
   ```css
   .animate-scroll-mood
   @keyframes mood-slide
   @keyframes mood-slide-2
   ```
   - 奇数行和偶数行不同方向滚动
   - 5秒线性无限循环

2. **Y轴旋转动画**：
   ```css
   @keyframes spin-y
   .hover\:animate-spin-y
   ```
   - Hover 触发 360° Y 轴旋转
   - 1.5秒缓动效果

3. **淡出动画**：
   ```css
   @keyframes fade-out
   .hover\:animate-fade-out
   ```
   - Hover 触发透明度变化
   - 0.3秒缓动效果

### 7. **创建 Tabs 组件** (apps/web/src/components/ui/tabs.tsx)
- 基于 @radix-ui/react-tabs 实现
- 包含 Tabs, TabsList, TabsTrigger, TabsContent
- 完整的深色模式支持
- 无障碍访问支持

### 8. **安装依赖**
```bash
pnpm add @radix-ui/react-tabs
```

## 文件结构

```
apps/web/
├── public/
│   └── images/
│       └── mood/               # 30个心情图标
│           ├── happy.png
│           ├── sad.png
│           ├── star.png
│           └── ...
├── src/
│   ├── app/
│   │   └── globals.css         # 添加了动画CSS
│   ├── components/
│   │   ├── home/
│   │   │   ├── HomeSidebarMood.tsx   # 更新：使用Tabs
│   │   │   ├── MoodCalendar.tsx      # 更新：使用图片
│   │   │   └── MoodToday.tsx         # 更新：使用图片
│   │   └── ui/
│   │       └── tabs.tsx              # 新增：shadcn Tabs
│   └── lib/
│       └── moods.ts                  # 新增：心情配置
```

## 响应式布局

### 小屏到大屏（md 到 xl）
- 使用 Tabs 切换
- 两个 Tab：「今日」和「心情日历」
- 紧凑布局，节省空间

### 超大屏（> xl）
- Grid 两列布局
- 左侧：今日心情
- 右侧：心情日历
- 并排显示，充分利用空间

## 与原版的一致性

### ✅ 完全复刻的特性
1. 顶部彩色渐变背景
2. 问候语根据时间变化
3. 一言和城市信息展示
4. 心情日历布局和交互
5. 今日心情滚动动画
6. 响应式 Tabs/Grid 布局
7. 心情图标和样式
8. 所有动画效果

### 🔄 后续可接入真实数据
- 一言 API（hitokoto.cn）
- IP 定位 API
- 心情数据 API
- Strapi 后端集成

## 启动查看

```bash
cd apps/web
pnpm dev
```

访问 http://localhost:3000 查看右侧心情卡片的完整效果！

## 效果预览

### 今日心情
- 大尺寸心情图标（80x80px）
- Hover Y轴旋转动画
- 背景文字滚动效果
- 左右渐变遮罩

### 心情日历
- 7x6 日历网格
- 星期标签（周日到周六）
- 月份导航按钮
- 心情图标显示
- 当天橙色标记
- Hover 图片淡出效果

完美复刻原版设计！🎉
