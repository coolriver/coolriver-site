<template>
  <div>
    <!-- <h1>{{env}}</h1> -->
    <!-- <v-icon>mdi-bookmark</v-icon> -->
    <article-tags :tags="metaData.tags"></article-tags>
    <div class="markdown-body" v-html="content"></div>
    <changyan-comments :sid="metaData.id"></changyan-comments>
  </div>
</template>

<script>
import axios from 'axios';
import ArticleTags from '../../components/article-tags';
import ChangyanComments from '../../components/changyan-comments';
import imgPreviewMixin from '../../libs/mixins/imgPreview';

const sleep = function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export default {
  mixins: [imgPreviewMixin],
  async asyncData({ params, error, req }) {
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
  components: {
    'article-tags': ArticleTags,
    'changyan-comments': ChangyanComments
  }
};
</script>

<style lang="scss">
.markdown-body {
  background: #fff;
  padding: 20px;

  img {
    position: relative;
    cursor: zoom-in;
  }
}
</style>



