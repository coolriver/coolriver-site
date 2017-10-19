<template>
  <v-app id="example-2" light>
    <v-toolbar class="cyan darken" dark fixed>
      <nuxt-link to="/">
        <v-toolbar-title class="home-title">coolriver</v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <embed class="svg-bg" :src="chilunSvg" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md9 order-xs2 order-md3>
            <nuxt/>
          </v-flex>
          <v-flex xs12 md3 order-xs3 order-md4 class="aside">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card hover>
                  <v-card-title primary class="title">最近文章</v-card-title>
                  <v-card-text>
                    别急，正在开发中。。
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card hover>
                  <v-card-title primary class="title">文章标签</v-card-title>
                  <v-card-text>
                    别急，正在开发中。。
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <div class="view-count">
      <span id="busuanzi_container_site_pv">
        site pv:
        <span id="busuanzi_value_site_pv"></span>
      </span>
      <span id="busuanzi_container_site_uv">
        site uv:
        <span id="busuanzi_value_site_uv"></span>
      </span>
      <span id="busuanzi_container_page_pv">
        page pv:
        <span id="busuanzi_value_page_pv"></span>
      </span>
    </div>
    <v-footer class="grey darken-3 justify-center">
      <span class="white--text">Copyright © 2017 coolriver</span>
      <span class="white--text ml-3 hidden-xs-only">粤ICP备16047967号-1</span>
    </v-footer>
    <v-fab-transition>
      <v-btn fixed dark floating fab bottom right class="red scroll-btn" v-show="showSrollTop" @click="scrollTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import zhanZhang from '../libs/zhanzhang';
const chilunSvg = require('../assets/image/chilun.svg');

const SCROLL_TOP = 100;
let doc = null;

export default {
  name: 'default-layout',
  data() {
    return {
      drawer: true,
      chilunSvg,
      showSrollTop: false
    };
  },
  methods: {
    onScroll(e) {
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (top > SCROLL_TOP) {
        this.showSrollTop = true;
      } else {
        this.showSrollTop = false;
      }
    },
    scrollTop() {
      window.scroll(0, 0);
    }
  },
  mounted() {
    doc = document.documentElement;
    window.onscroll = _.throttle(this.onScroll.bind(this), 100);
    zhanZhang();
  }
}
</script>

<style scoped lang="scss">
.view-count {
  color: #666;
  text-align: center;
  margin: 15px auto 15px -10px;

  & > span {
    margin-left: 10px;
    display: none;
  }
}

.svg-bg {
  position: fixed;
  z-index: 0;
}

.home-title {
  color: #fff;
}

.aside>.layout {
  position: sticky;
  top: 76px;
}

.toolbar--fixed {
  z-index: 100;
}

.footer {
  text-align: center;
  padding: 20px 0;
  height: auto;
}

.container {
  position: relative;
}

.container>.layout {
  min-height: 100vh;
}

.scroll-btn {
  bottom: 32px;
  z-index: 1000;
}

@media (min-width: 0) {
  .container>.layout {
    min-height: 0;
  }

  .container.grid-list-md {
    padding: 0;
  }

  .container {
    margin-top: 0;
  }
}

@media (min-width: 960px) {
  .container>.layout {
    min-height: 100vh;
  }

  .container.grid-list-md {
    padding: 8px;
  }

  .container {
    margin-top: 8px;
  }
}
</style>

