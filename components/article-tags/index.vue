<template>
  <div class="article-tag-list">
    <v-icon class="light-blue--text text--lighten-2">mdi-bookmark</v-icon>
    <span class="card card--hover" v-for="(tag, index) in tags" :key="index">{{tag}}</span>
  </div>
</template>

<script>
export default {
  name: 'article-tags',
  props: {
    tags: Array
  }
}
</script>

<style lang="scss" scoped>
$tagSpace : 10px;

.article-tag-list {
  background: #fff;
  // padding: 20px 20px 0 20px;

  span {
    margin-left: $tagSpace;
    display: inline-block;
    border-radius: 3px;
    padding: 2px 10px;
    color: #aaa;

    &:first-of-type {
      margin-left: $tagSpace - 5;
    }
  }
}
</style>

