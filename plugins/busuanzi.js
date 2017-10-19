/**
 * http://busuanzi.ibruce.info/
 */
let scriptTag = null;

const bszCaller = {
  fetch: function (a, b) {
    var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
    window[c] = function (result) {
      b(result);
      scriptTag.parentElement.removeChild(scriptTag);
    };
    a = a.replace("=BusuanziCallback", "=" + c);
    scriptTag = document.createElement("SCRIPT");
    scriptTag.type = "text/javascript";
    scriptTag.defer = !0;
    scriptTag.src = a;
    document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
  }
};

export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    setTimeout(() => { // 延迟更新访问信息，使路由路径先更新
      bszCaller.fetch('//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback', function (a) {
        const { site_uv, site_pv, page_pv } = a;
        store.commit('updatePvUv', {
          siteUv: site_uv,
          sitePv: site_pv,
          pagePv: page_pv,
        });
      });
    }, 0);
  });

  app.router.beforeEach((to, from, next) => {
    store.commit('updatePvUv', {
      siteUv: 0,
      sitePv: 0,
      pagePv: 0,
    });

    next();
  });
};
