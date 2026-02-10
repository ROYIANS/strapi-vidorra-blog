import posts from "~/server/data/posts.json";
import * as fs from "fs";

export default defineEventHandler((event) : { code: number, raw: string | null, post: any } => {
  const uniqueId = getRouterParam(event, 'id')
  const findPost = posts.find(item => {
    return `${item.uniqueId}` === `${uniqueId}`
  })
  let code = 404
  let fileData = null

  try {
    if (findPost !== undefined && findPost !== null) {
      const fullPath = findPost.full_source
      fileData = fs.readFileSync(fullPath, 'utf-8')
      code = 200
    }
  } catch (e) {
    code = 500
  }

  return {
    code: code,
    raw: fileData,
    post: findPost
  }
})
