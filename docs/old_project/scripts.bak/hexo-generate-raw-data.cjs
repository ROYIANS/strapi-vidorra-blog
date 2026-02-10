const path = require("path");
const matter = require('front-matter');
const nanoId = require('nanoid')
const fs = require("hexo-fs");

let themeDir = ''

const saveData = (fileName, data) => {
    if (themeDir === '') {
        return
    }
    const jsCode = `export default ${JSON.stringify(data, null, 4)};`;
    fs.writeFileSync(`${themeDir}/${fileName}.js`, jsCode, {
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
            id: posts_props(post._id),
            slug: posts_props(post.slug),
            title: posts_props(post.title),
            layout: posts_props(post.layout),
            type: posts_props(post.type || 'post'),
            date: posts_props(post.date),
            updated: posts_props(post.updated),
            comments: posts_props(post.comments),
            full_source: posts_props(post.full_source),
            path: posts_props(post.path),
            password: posts_props(post.password),
            excerpt: posts_props(post.excerpt),
            keywords: posts_props(post.keywords),
            cover: posts_props(post.cover),
            content: posts_props(post.excerpt ? null : post.content),
            text: posts_props(filterHTMLTags(post.content).substring(0, 140)),
            link: posts_props(post.link),
            // raw: posts_props(post.raw),
            photos: posts_props(post.photos),
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
            }),
            extendConfig: {}
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

const generateBookData = (hexo) => {
    const generateChapters = (dirPath, level, bookTitle, bookPath, bookId) => {
        const chapters = [];
        const articles = [];

        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                // 是目录则递归处理子章节
                const subChapters = generateChapters(filePath, level + 1, bookTitle, bookPath, bookId);
                // 处理章节信息...
                const indexFile = path.join(filePath, 'index.md');
                const content = fs.readFileSync(indexFile, {
                    encoding: 'utf-8'
                });
                const data = matter(content).attributes
                // 将子章节合并到父章节中
                chapters.push({
                    level: level + 1,
                    ...data,
                    ...subChapters
                });
            } else if (stats.isFile()) {
                const extname = path.extname(filePath);
                const basename = path.basename(filePath)
                if (extname === '.md' && basename !== 'index.md') {
                    // 获取文章信息
                    const postPath = filePath.replace(hexo.source_dir, '').replace(/\\/g, '/');
                    let post = hexo.locals.get('posts').find({ source: postPath });
                    post.data[0].book = {
                        title: bookTitle,
                        path: bookPath,
                        id: bookId
                    }

                    if (post.data && post.data.length === 1) {
                        articles.push({
                            path: post.data[0].path,
                            title: post.data[0].title
                        });
                    }
                }
            }
        }
        articles.sort((a, b) => {
            if (a.order && b.order) {
                return a.order - b.order
            }
            return b.date - a.date
        });
        // 按照章节顺序排序
        chapters.sort((a, b) => a.order - b.order);
        return {
            chapters,
            articles
        };
    }

    const postDir = `${hexo.source_dir}/_posts`;

    const booksCategoryMap = {};
    const allBooks = [];

    // 读取_post目录下的所有文件和目录
    const files = fs.readdirSync(postDir);

    // 遍历所有文件和目录
    for (const file of files) {
        const filePath = path.join(postDir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const indexFile = path.join(filePath, 'index.md');
            // 如果该目录下存在index.md文件，则认为是一个书籍目录
            if (fs.existsSync(indexFile)) {
                // 处理书籍信息...
                const content = fs.readFileSync(indexFile, {
                    encoding: 'utf-8'
                });
                const data = matter(content).attributes;
                const bookPath = `books/${file}/`
                let category = data.category || "uncategorized"
                let booksCategory = booksCategoryMap[category] || []
                const bookId = nanoId.nanoid()
                const book = {
                    id: bookId,
                    path: bookPath,
                    level: 0,
                    ...data,
                    category: data.category || "uncategorized",
                    ...generateChapters(filePath, 0, data.title, bookPath, bookId)
                }
                booksCategory.push(book)
                allBooks.push(book)
                // 处理完所有文件和目录之后，books数组就包含了所有书籍的信息
                booksCategory.sort((a, b) => a.order - b.order);
                booksCategoryMap[category] = booksCategory
            }
        }
    }

    return {
        allBooks,
        booksCategoryMap
    }
}


const generateRawData = (hexo) => {
    themeDir = `${hexo.theme_dir}/data`
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

        const bookData = generateBookData(hexo)
        saveData('books', bookData.allBooks)
        saveData('books-category', bookData.booksCategoryMap)

        resolve()
    })
}

module.exports = generateRawData
