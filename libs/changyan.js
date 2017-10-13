/**
 * 畅言评论相关功能
 *
 * http://changyan.kuaizhan.com/overview
 */

export function initComment() {
  var appid = 'cytgcmlY2';
  var conf = 'prod_e6045fe8e9fac35fc691f9daf888b2dd';
  var width = window.innerWidth || document.documentElement.clientWidth;
  var loadJs = function (d, a, id) {
    var c = document.getElementsByTagName("head")[0] || document.head || document.documentElement;
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript");
    b.setAttribute("charset", "UTF-8");
    b.setAttribute("src", d);
    if (id) {
      b.setAttribute("id", id);
    }
    if (typeof a === "function") {
      if (window.attachEvent) {
        b.onreadystatechange = function () {
          var e = b.readyState;
          if (e === "loaded" || e === "complete") {
            b.onreadystatechange = null;
            a()
          }
        }
      } else {
        b.onload = a
      }
    }
    c.appendChild(b)
  };
  if (width < 960) {
    loadJs('https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf, null, 'changyan_mobile_js');
  } else {
    loadJs("https://changyan.sohu.com/upload/changyan.js", function () {
      window.changyan.api.config({
        appid: appid,
        conf: conf
      })
    });
  }
};

export function cleanComment() {
  window.changyan = window.cyan = undefined;
}
