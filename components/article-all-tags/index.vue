<template>
<v-flex xs12>
  <v-card hover class="article-all-tags">
    <h2>文章标签</h2>
    <v-progress-circular v-if="!tagList.length" indeterminate></v-progress-circular>
    <div class="article-all-tags-list" v-else>
      <article-tag enableLink v-for="(tag, index) in tagList" :key="index" :tag="tag"></article-tag>
    </div>
  </v-card>
</v-flex>
</template>

<script>
import { mapState } from 'vuex';
import ArticleTag from '../article-tag';

export default {
  name: 'article-all-tags',
  computed: {
    ...mapState(['tagList'])
  },
  components: {
    ArticleTag,
  }
};
</script>

<style lang="scss" scoped>
.article-all-tags {
  overflow: hidden;

  h2 {
    font-size: 18px;
    padding: 10px 15px;
    margin-bottom: 0;
    border-bottom: 1px solid #ccc;
  }

  .progress-circular {
    margin: 30px auto;
    display: block;
  }

  &-list {
    padding: 10px 15px 15px;
    margin: auto auto -10px -10px;
  }
}
</style>

