const file = require("hexo-fs");
// 将assets文件夹中的文件复制到博客项目中
const copyAssets = (hexo) => {
    return new Promise(async (resolve, reject) => {
        const themeDir = hexo.theme_dir
        const baseDir = hexo.base_dir
        if (!file.existsSync(`${baseDir}/assets`)) {
            hexo.log.info(`[Dreamland] 您还没有建立资源文件夹，请注意，请将您博客的静态资源存放在 ${baseDir}assets 下面`)
        } else {
            await file.copyDir(`${baseDir}/assets`, `${themeDir}/public`)
        }
        resolve()
    })
}

module.exports = copyAssets