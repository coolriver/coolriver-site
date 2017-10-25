<template>
  <span class="article-tag-item card card--hover">{{tag}}</span>
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
  display: inline-block;
  border-radius: 3px;
  padding: 2px 10px;
  color: #aaa;

  &:first-of-type {
    margin-left: $tagSpace - 5;
  }
}
</style>


