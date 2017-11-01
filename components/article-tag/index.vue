<template>
  <nuxt-link class="article-tag-item" :to="`/tags/${tag}`" v-if="enableLink">
    <span class="card card--hover">{{tag}}</span>
  </nuxt-link>
  <span class="article-tag-item card" v-else>{{tag}}</span>
</template>

<script>
export default {
  name: 'article-tag',
  props: {
    tag: String,
    enableLink: Boolean
  }
};
</script>

<style lang="scss" scoped>
$tagSpace: 10px;

.article-tag-item {
  margin-left: $tagSpace;
  margin-bottom: 10px;
  display: inline-block;
}

.card {
  display: inline-block;
  border-radius: 3px;
  padding: 2px 10px;
  color: #aaa;
}

.card--hover {
  color: #666;

  &:hover {
    color: #1976d2;
  }
}
</style>


