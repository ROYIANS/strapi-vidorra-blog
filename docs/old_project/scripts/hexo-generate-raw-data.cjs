const fs = require("hexo-fs");

let themeDir = ''

const saveData = (fileName, data) => {
    if (themeDir === '') {
        return
    }
    const jsonCode = JSON.stringify(data, null, 4);
    fs.writeFileSync(`${themeDir}/${fileName}.json`, jsonCode, {
        encoding: 'utf8'
    })
}

const filterHTMLTags = (str) => {
    return str ? str
        .replace(/<(?!img|br).*?>/g, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/<img(.*)>/g, ' [Figure] ') : ''
}

const posts_props = (val) => {
    return typeof val === 'function' ? val() : val;
}

const generatePostData = (posts) => {
    const postList = []
    posts.forEach((post) => {
        postList.push({
            uniqueId: posts_props(post.uniqueId),
            title: posts_props(post.title),
            layout: posts_props(post.layout),
            type: posts_props(post.type || 'post'),
            date: posts_props(post.date),
            updated: posts_props(post.updated),
            comments: posts_props(post.comments),
            full_source: posts_props(post.full_source),
            password: posts_props(post.password),
            description: posts_props(post.description),
            keywords: posts_props(post.keywords),
            author: posts_props(post.author),
            sticky: posts_props(post.sticky),
            cover: posts_props(post.cover),
            link: posts_props(post.link),
            photos: posts_props(post.photos),
            recommend: posts_props(post.recommend),
            categories: posts_props(() => {
                return post.categories.map((cat) => {
                    return {
                        id: cat._id,
                        path: cat.path,
                        permalink: cat.permalink,
                        name: cat.name,
                        slug: cat.slug,
                        length: cat.length
                    };
                });
            }),
            tags: posts_props(() => {
                return post.tags.map((tag) => {
                    return {
                        id: tag._id,
                        path: tag.path,
                        permalink: tag.permalink,
                        name: tag.name,
                        slug: tag.slug,
                        length: tag.length
                    };
                });
            })
        })
    })
    return postList
}

const generatePageData = (pages) => {
    const pageList = []
    pages.forEach(page => {
        pageList.push({
            id: posts_props(page._id),
            permalink: posts_props(page.permalink),
            title: posts_props(page.title),
            layout: posts_props(page.layout),
            content: posts_props(page._content),
            type: posts_props(page.type || ''),
            date: posts_props(page.date),
            updated: posts_props(page.updated),
            comments: posts_props(page.comments),
            full_source: posts_props(page.full_source),
            path: posts_props(page.path),
            cover: posts_props(page.cover),
            // raw: posts_props(page.raw),
            extendConfig: {}
        })
    })
    return pageList
}

const generateTagData = (tags) => {
    const tagList = []
    tags.forEach(tag => {
        tagList.push({
            id: posts_props(tag._id),
            permalink: posts_props(tag.permalink),
            name: posts_props(tag.name),
            slug: posts_props(tag.slug),
            path: posts_props(tag.path),
            count: posts_props(tag.length),
            posts: generatePostData(posts_props(tag.posts))
        })
    })
    return tagList
}

const generateUserData = (data) => {
    return data
}

const generateCategoryData = (categories) => {
    const categoryTagList = []
    categories.forEach(category => {
        categoryTagList.push({
            id: posts_props(category._id),
            permalink: posts_props(category.permalink),
            name: posts_props(category.name),
            slug: posts_props(category.slug),
            path: posts_props(category.path),
            count: posts_props(category.length),
            posts: generatePostData(posts_props(category.posts))
        })
    })
    return categoryTagList
}


const generateRawData = (hexo) => {
    themeDir = `${hexo.theme_dir}/server/data`
    return new Promise((resolve, reject) => {

        saveData('site', hexo.config)

        const posts = generatePostData(hexo.locals.get('posts'))
        saveData('posts', posts)

        const pages = generatePageData(hexo.locals.get('pages'))
        saveData('pages', pages)

        const categories = generateCategoryData(hexo.locals.get('categories'))
        saveData('categories', categories)

        const tags = generateTagData(hexo.locals.get('tags'))
        saveData('tags', tags)

        const data = generateUserData(hexo.locals.get('data'))
        saveData('data', data)

        resolve()
    })
}

module.exports = generateRawData
