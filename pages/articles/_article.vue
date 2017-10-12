<template>
  <div>
    <!-- <h1>{{env}}</h1> -->
    <div class="markdown-body" v-html="content"></div>
    <!--PC和WAP自适应版-->
    <div id="SOHUCS" sid="test"></div>
  </div>
</template>

<script>
import { initComment, cleanComment } from '../../libs/changyan';

const sleep = function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export default {
  async asyncData({ params, error, req }) {
    const content = await import(`../../markdown/${params.article}.md`);

    try {
      return {
        content,
        env: req ? 'server' : 'client',
      };
    } catch (e) {
      error({ statusCode: 404, message: 'Unkown Article' });
    }
  },
  data() {
    return {
      content: '加载中。。。',
      env: '',
    }
  },
  destroyed() {
    cleanComment();
  },
  mounted() {
    initComment();
  }
};
</script>

<style scoped>
.markdown-body {
  background: #fff;
  padding: 20px;
}
</style>



