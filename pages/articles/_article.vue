<template>
  <div class="article card">
    <!-- <h1>{{env}}</h1> -->
    <!-- <v-icon>mdi-bookmark</v-icon> -->
    <article-tags class="article-tags" :tags="metaData.tags"></article-tags>
    <div class="article-info">
      <div class="article-info-time">
        <v-icon>mdi-av-timer</v-icon>
        <span>{{metaData.time | dateFormat}}</span>
      </div>
      <div class="article-info-pv" v-if="pvUv.pagePv">
        <v-icon>mdi-eye</v-icon>
        <span>{{pvUv.pagePv}}</span>
      </div>
    </div>
    <div class="markdown-body" v-html="content"></div>
    <changyan-comments :sid="metaData.id"></changyan-comments>
  </div>
</template>

<script>
// import axios from 'axios';
import api from '../../libs/api';
import { mapState } from 'vuex';
import ArticleTags from '../../components/article-tags';
import ChangyanComments from '../../components/changyan-comments';
import imgPreviewMixin from '../../libs/mixins/imgPreview';

let interval = null;

const sleep = function(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export default {
  mixins: [imgPreviewMixin],
  async asyncData({ params, error, req }) {
    try {
      const { article } = params;
      const [content, articleData] = await Promise.all([
        import(`../../markdown/${params.article}.md`),
        api.article.getArticle({ name: article })
      ]);

      return {
        content,
        metaData: articleData || {},
        env: req ? 'server' : 'client'
      };
    } catch (e) {
      error({ statusCode: 404, message: 'article do not exist' });
    }
  },
  data() {
    return {
      content: '加载中。。。',
      env: ''
    };
  },
  computed: {
    ...mapState(['pvUv'])
  },
  head() {
    const { title, tags, img, desc } = this.metaData;

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: desc },
        { hid: 'keywords', name: 'keywords', content: tags.join(',') },
        { hid: 'shareimg', itemprop: 'image', content: img }
      ]
    };
  },
  components: {
    'article-tags': ArticleTags,
    'changyan-comments': ChangyanComments
  }
};
</script>

<style lang="scss" scoped>
.article-tags {
  padding: 20px 20px 0 20px;
}

.article-info {
  padding: 5px 20px;
  background: #fff;
  position: relative;

  &-time {
    display: inline-block;

    & > span {
      vertical-align: middle;
      margin-left: 5px;
    }
  }

  &-pv {
    position: absolute;
    right: 20px;
    top: 5px;

    & > span {
      vertical-align: middle;
      margin-left: 5px;
    }
  }
}

#busuanzi_container_site_uv {
  display: none;
}

.markdown-body {
  background: #fff;
  padding: 0 20px 20px 20px;

  h1 {
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: -20px;
      width: 8px;
      height: 100%;
      background: #4fc3f7;
    }
  }

  img {
    position: relative;
    cursor: zoom-in;
  }
}
</style>



