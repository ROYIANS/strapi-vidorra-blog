# P0 Implementation Plan

## Overview

Based on the architecture review, this plan addresses the two P0 issues:
1. **API Abstraction Layer** - Decouple data fetching from components
2. **Layout & Theme Restructuring** - Migrate old project (Nuxt/Vidorra) design to Next.js

## Old Project Design Analysis

### Layout Structure
- **Left Sidebar** (fixed, ~173px): Vertical site title (heti--serif, vertical text), nav items with dashed underlines, action buttons (search, language, dark mode, theme), login button
- **Green Border Frame** (#699054): 4 edges with mask animations (`--mask-width: .7rem`), using `animate-default-mask-*` classes
- **Main Content Area**: Offset by `ml-[--side-width]`, white bg with grid-bg pattern (light) / SVG decorations (dark)
- **Footer**: Green bg, social links, copyright info, offset by sidebar width

### Home Page Components
- **Recommend Section**: Carousel (sticky posts) + Recommend list (right column)
- **Content Section**: Category tabs (horizontal scroll) + Post list (date square + title + description + metadata) + Pagination
- **Sidebar Widgets**: Author Card, Mood Card, Weather Card, Tag Cloud

### Post Page
- **Cover**: Full-width, 4:1 aspect ratio, image with brightness filter, title overlay at bottom
- **Metadata Bar**: Author, date, page views, word count, reading time (grid layout)
- **Content**: `heti heti--serif` typography, `px-24` padding, text-shadow
- **Copyright Block**: Rounded card with CC license info

### Design Tokens
- Primary: `#699054` (green) with full scale (100-900, dark-100 to dark-700)
- Background: `#fffcf5` (cream white)
- Fonts: Oswald, Newsreader, Noto Sans/Serif SC
- Mask Width: `.7rem` (desktop), `.4rem` (tablet), `1.5vw` (mobile)
- Sidebar Width: `173px` (responsive)
- Animations: mask slide-in, left-in, fade-out
- Custom scrollbar with primary color

## Implementation Steps

### Step 1: API Service Layer
Create `apps/web/src/services/`:
- `api-client.ts` - Axios/fetch wrapper with Strapi URL config
- `posts.ts` - Post CRUD operations (mock → Strapi seamless switch)
- `categories.ts` - Category operations

### Step 2: Layout Components
Create shared layout in `apps/web/src/components/layout/`:
- `Sidebar.tsx` - Left sidebar navigation
- `BorderFrame.tsx` - Green border mask frame
- `Footer.tsx` - Footer with social links
- `MobileHeader.tsx` - Mobile top bar + drawer
- `MainLayout.tsx` - Compose all layout pieces

### Step 3: Home Page Components
- `HomeRecommend.tsx` - Carousel + recommend list
- `HomeContent.tsx` - Category tabs + post list
- `HomeSidebar.tsx` - Author Card, Mood Card, etc.

### Step 4: Post Page
- Update `posts/[slug]/page.tsx` with cover banner, metadata bar, heti typography

### Step 5: CSS & Theme
- Update `globals.css` with old project's CSS variables and animations
- Verify `@vidorra/theme` colors match old project
