hexo.extend.generator.register('post', function(locals){
  return []
});
hexo.extend.generator.register('page', function(locals){
  return []
});

hexo.extend.generator.register('hint', function (locals) {
  return {
    path: 'index.html',
    layout: ['hint']
  }
})
