const blogStarter = require('./hexo-start-blog.cjs')
const blogGenerator = require('./hexo-generate-blog.cjs')
const generateUniqueID = require("./hexo-generate-uniqueid.cjs")
const generateRawData = require('./hexo-generate-raw-data.cjs')
const copyAssets = require("./hexo-copy-assets.cjs");

hexo.extend.console.register('dreamland', 'serve and build for hexo-dreamland-book blog', {
  options: [
    { name: '--server', desc: 'Start Blog Server' },
    { name: '--generate', desc: 'Generate SSR Files For Blog' },
    { name: '--dev', desc: 'Build Raw Data For Dev' }
  ]
}, (args = { s: true, g: false, dev: false }) => {
  hexo.source.watch().then(async () => {
    // do generate Blog Data
    hexo.locals.invalidate()
    await generateUniqueID(hexo)
    await generateRawData(hexo)
    await copyAssets(hexo)

    console.log('准备部分完毕了')

    if (args.dev) {
      hexo.exit()
      return process.exit()
    }
    if (args.s || args.server) {
      // do server
      blogStarter(hexo)
      return
    }
    if (args.g || args.generate) {
      // do generate
      blogGenerator(hexo)
    }
  })
});
