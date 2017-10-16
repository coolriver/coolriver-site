<template>
  <div>
    <!-- <h1>{{env}}</h1> -->
    <div class="markdown-body" v-html="content"></div>
    <!--PC和WAP自适应版-->
    <div id="SOHUCS" :sid="metaData.id"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { initComment, cleanComment } from '../../libs/changyan';

const sleep = function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export default {
  async asyncData({ params, error, req }) {
    // const content = await import(`../../markdown/${params.article}.md`);
    const { article } = params;
    const articleDataUrl = req ? `http://coolriver.net.cn/api/articles/${article}` : `/api/articles/${article}`;
    const [ content, articleData ] = await Promise.all([
      import(`../../markdown/${params.article}.md`),
      await axios.get(articleDataUrl)
    ]);

    try {
      return {
        content,
        metaData: articleData.data || {},
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
  head() {
    const { title, tags, img, desc } = this.metaData;

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: desc },
        { hid: 'keywords', name: 'keywords', content: tags.join(',') },
        { hid: 'shareimg', itemprop: 'image', content: img },
      ]
    };
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



