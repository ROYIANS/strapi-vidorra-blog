const path = require("path");
const matter = require('front-matter');
const { customAlphabet } = require('nanoid');
const fs = require("hexo-fs");

const posts_props = (val) => {
    return typeof val === 'function' ? val() : val;
}

const generateUniqueID = (hexo) => {
    const posts = hexo.locals.get('posts')
    const pages = hexo.locals.get('pages')

    posts.forEach(post => {
        generateId(post)
    })

    pages.forEach(page => {
        generateId(page)
    })
}

const generateId = (item) => {
    const fullPath = posts_props(item.full_source)

    const tmpPost = matter(posts_props(item.raw))

    if (!tmpPost.attributes.uniqueId) {
        const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10)
        const newUniqueId = nanoid()
        let frontMatter = `uniqueId: ${newUniqueId}\n`
        if (tmpPost.frontmatter) {
            frontMatter += tmpPost.frontmatter + ''
        }
        const rawData = `---\n${frontMatter}\n---\n${tmpPost.body}`
        item.uniqueId = newUniqueId

        fs.writeFileSync(fullPath, rawData, 'utf-8');
    }
}

module.exports = generateUniqueID
