import site from '../../data/site.json'
import siteData from '../../data/data.json'
import pages from '../../data/pages.json'
import posts from '../../data/posts.json'
import tags from '../../data/tags.json'
import categories from "../../data/categories.json"

export default defineEventHandler((event) => {
  return {
    site: site,
    data: siteData,
    pages: pages,
    posts: posts,
    tags: tags,
    categories: categories
  }
})
