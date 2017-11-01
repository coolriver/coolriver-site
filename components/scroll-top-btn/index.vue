<template>
  <div v-scroll="onScrollThottle()">
    <v-fab-transition>
      <v-btn fixed dark floating fab bottom right class="red scroll-btn" v-show="showSrollTop" @click="scrollTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import _ from 'lodash';

let doc = null;
const SCROLL_TOP = 100;

export default {
  name: 'scroll-top-btn',
  data() {
    return {
      showSrollTop: false
    };
  },
  methods: {
    onScroll() {
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

      if (top > SCROLL_TOP) {
        this.showSrollTop = true;
      } else {
        this.showSrollTop = false;
      }
    },
    scrollTop() {
      window.scroll(0, 0);
    },
    onScrollThottle() {
      return _.throttle(this.onScroll.bind(this), 100);
    }
  },
  mounted() {
    doc = document.documentElement;
  }
};
</script>

<style lang="scss" scoped>
.btn--bottom {
  bottom: 34px !important;
}
</style>


