<template>
  <p>tag content</p>
</template>

<script>
export default {
  async asyncData({ params, error, req }) {
    error({ statusCode: 404, message: 'article do not exist' });
  }
}
</script>

<style lang="scss" scoped>

</style>

