const shell = require("shelljs");
const file = require("hexo-fs");
const generateRawData = require("./hexo-generate-raw-data.cjs");
const copyAssets = require("./hexo-copy-assets.cjs");

const blogStarter = (hexo) => {
  hexo.source.addProcessor('*path', async () => {
    hexo.log.debug('[update] update blog data...')
    hexo.locals.invalidate()
    await generateRawData(hexo)
    await copyAssets(hexo)
  })
  const themeDir = hexo.theme_dir
  if (!file.exists(`${themeDir}/node_modules`)) {
    hexo.log.error('请先进入主题文件夹安装依赖：yarn / npm install / pnpm install')
    return process.exit(-1)
  }
  shell.exec(`cd ${themeDir} && npm run dev`, (code, stdout, stderr) => {
    hexo.log.debug('Exit code:', code);
    hexo.log.debug('Program output:', stdout);
    hexo.log.debug('Program stderr:', stderr);
    hexo.log.info('服务器运行中，以下是服务器运行日志（Nuxt.js）')
    if (code === 0) {
      hexo.log.info('服务器运行完毕')
    } else {
      hexo.log.error('服务器运行失败！')
      return process.exit(-1)
    }
  });
}

module.exports = blogStarter
