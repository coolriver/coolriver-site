/**
 * http://busuanzi.ibruce.info/
 */

export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if (from.matched.length) { // 非初次加载页面时才执行
      document.getElementById('busuanzi_container_site_pv').style.display = 'none';
      document.getElementById('busuanzi_container_site_uv').style.display = 'none';
      document.getElementById('busuanzi_container_page_pv').style.display = 'none';

      setTimeout(() => { // 延迟更新访问信息，使路由路径先更新
        bszCaller.fetch('//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback', function (a) {
          bszTag.texts(a);
          bszTag.shows()
        });
      }, 0);
    }
  });
};
