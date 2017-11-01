<template>
  <div class="article-tag-list">
    <v-icon class="light-blue--text text--lighten-2">mdi-bookmark</v-icon>
    <article-tag v-for="(tag, index) in tags" :key="index" :tag="tag"></article-tag>
  </div>
</template>

<script>
import ArticleTag from '../article-tag';

export default {
  name: 'article-tags',
  props: {
    tags: Array
  },
  components: {
    ArticleTag,
  }
}
</script>

<style lang="scss" scoped>

.article-tag-list {
  background: #fff;

  i {
    margin-right: -5px;
  }
}
</style>

