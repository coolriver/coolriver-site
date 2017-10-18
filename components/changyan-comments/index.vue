<template>
  <div id="SOHUCS" :sid="sid">
  </div>
</template>

<script>
export default {
  name: 'changyan-comments',
  props: {
    sid: String
  },
  mounted() {
    let appid = 'cytgcmlY2';
    let conf = 'prod_e6045fe8e9fac35fc691f9daf888b2dd';
    let width = window.innerWidth || document.documentElement.clientWidth;
    let loadJs = function(d, a, id) {
      let c = document.getElementsByTagName("head")[0] || document.head || document.documentElement;
      let b = document.createElement("script");
      b.setAttribute("type", "text/javascript");
      b.setAttribute("charset", "UTF-8");
      b.setAttribute("src", d);
      if (id) {
        b.setAttribute("id", id);
      }
      if (typeof a === "function") {
        if (window.attachEvent) {
          b.onreadystatechange = function() {
            let e = b.readyState;
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
      loadJs("https://changyan.sohu.com/upload/changyan.js", function() {
        window.changyan.api.config({
          appid: appid,
          conf: conf
        })
      });
    }
  },
  destroyed() {
    window.changyan = window.cyan = undefined;
  }
}
</script>

<style lang="scss" scoped>
#SOHUCS {
  background: #fff;
  padding: 20px;
  margin: 20px 0;
}
</style>


