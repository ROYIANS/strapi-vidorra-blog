const shell = require("shelljs");
const file = require("hexo-fs");
const blogStarter = (hexo) => {
    const themeDir = hexo.theme_dir
    const publicDir = hexo.public_dir

    console.log('themeDir', themeDir)
    console.log('publicDir', publicDir)

    if (!file.existsSync(`${themeDir}/node_modules`)) {
        hexo.log.error('请先进入主题文件夹安装依赖：yarn / npm install / pnpm install')
        return process.exit(-1)
    }
    shell.exec(`cd "${themeDir}" && npm run generate`, async (code, stdout, stderr) => {
        hexo.log.debug('Exit code:', code);
        hexo.log.debug('Program output:', stdout);
        hexo.log.debug('Program stderr:', stderr);
        if (code === 0) {
            await file.copyDir(`${themeDir}/.output/public`, publicDir)
            hexo.log.info(`生成成功，请查看您的${publicDir}文件夹`)
            return process.exit()
        } else {
            hexo.log.error(`生成失败！exit code: ${code}`)
            return process.exit(-1)
        }
    });
}

module.exports = blogStarter
