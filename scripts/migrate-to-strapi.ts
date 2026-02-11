/**
 * Strapi 数据迁移脚本
 * 将 mock 数据迁移到 Strapi CMS
 *
 * 使用方法：
 * 1. 确保 Strapi 已启动（http://localhost:1337）
 * 2. 配置下方的 STRAPI_URL 和 API_TOKEN
 * 3. 运行: npx tsx scripts/migrate-to-strapi.ts
 */

import { mockPosts } from '../apps/web/src/lib/mock-posts'

// ==================== 配置 ====================
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''

if (!API_TOKEN) {
  console.error('❌ 错误: 请设置 STRAPI_API_TOKEN 环境变量')
  console.error('   或直接在脚本中修改 API_TOKEN 变量')
  process.exit(1)
}

// ==================== 辅助函数 ====================

/**
 * 创建或获取分类
 */
async function ensureCategory(categoryName: string): Promise<number | null> {
  if (!categoryName) return null

  try {
    // 先查找是否存在
    const findResponse = await fetch(
      `${STRAPI_URL}/api/categories?filters[name][$eq]=${encodeURIComponent(categoryName)}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      }
    )

    const findData = await findResponse.json()

    if (findData.data && findData.data.length > 0) {
      console.log(`  ℹ️  分类已存在: ${categoryName}`)
      return findData.data[0].id
    }

    // 不存在则创建
    const createResponse = await fetch(`${STRAPI_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-')
        }
      })
    })

    const createData = await createResponse.json()
    console.log(`  ✅ 创建分类: ${categoryName}`)
    return createData.data.id
  } catch (error) {
    console.error(`  ❌ 分类处理失败: ${categoryName}`, error)
    return null
  }
}

/**
 * 创建或获取标签
 */
async function ensureTags(tagNames: string[]): Promise<number[]> {
  const tagIds: number[] = []

  for (const tagName of tagNames) {
    try {
      // 先查找是否存在
      const findResponse = await fetch(
        `${STRAPI_URL}/api/tags?filters[name][$eq]=${encodeURIComponent(tagName)}`,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`
          }
        }
      )

      const findData = await findResponse.json()

      if (findData.data && findData.data.length > 0) {
        tagIds.push(findData.data[0].id)
        continue
      }

      // 不存在则创建
      const createResponse = await fetch(`${STRAPI_URL}/api/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
          data: {
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, '-')
          }
        })
      })

      const createData = await createResponse.json()
      tagIds.push(createData.data.id)
      console.log(`  ✅ 创建标签: ${tagName}`)
    } catch (error) {
      console.error(`  ❌ 标签处理失败: ${tagName}`, error)
    }
  }

  return tagIds
}

/**
 * 迁移单篇文章
 */
async function migratePost(post: typeof mockPosts[0]) {
  console.log(`\n📝 迁移文章: ${post.title}`)

  try {
    // 1. 处理分类
    const categoryId = await ensureCategory(post.category || '')

    // 2. 处理标签
    const tagIds = post.tags ? await ensureTags(post.tags) : []

    // 3. 创建文章
    const postData = {
      data: {
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.excerpt, // 使用 excerpt 作为内容
        cover: post.cover,
        author: post.author,
        date: post.date,
        updated: post.updated || post.date,
        published: post.published,
        recommend: post.recommend || false,
        displayMode: post.displayMode || 'normal',
        readTime: post.readTime,
        wordCount: post.wordCount,
        excerpt: post.excerpt,
        category: categoryId,
        tags: tagIds,
        publishedAt: post.published ? new Date().toISOString() : null
      }
    }

    const response = await fetch(`${STRAPI_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(postData)
    })

    if (response.ok) {
      const data = await response.json()
      console.log(`✅ 成功迁移: ${post.title} (ID: ${data.data.id})`)
      return true
    } else {
      const error = await response.text()
      console.error(`❌ 迁移失败: ${post.title}`)
      console.error(`   状态: ${response.status}`)
      console.error(`   详情: ${error}`)
      return false
    }
  } catch (error) {
    console.error(`❌ 迁移出错: ${post.title}`, error)
    return false
  }
}

/**
 * 主迁移函数
 */
async function migrateAllData() {
  console.log('🚀 开始迁移数据到 Strapi...')
  console.log(`📍 Strapi URL: ${STRAPI_URL}`)
  console.log(`📊 共有 ${mockPosts.length} 篇文章待迁移\n`)

  let successCount = 0
  let failCount = 0

  for (const post of mockPosts) {
    const success = await migratePost(post)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('🎉 迁移完成！')
  console.log(`✅ 成功: ${successCount} 篇`)
  console.log(`❌ 失败: ${failCount} 篇`)
  console.log('='.repeat(50))
}

// 运行迁移
migrateAllData().catch((error) => {
  console.error('💥 迁移过程发生严重错误:', error)
  process.exit(1)
})
