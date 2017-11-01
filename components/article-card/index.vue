<template>
  <nuxt-link class="article-card" :to="`/articles/${article.name}`">
    <v-card hover>
      <v-card-media height="190px" :src="article.img">
      </v-card-media>
      <v-card-text>
        <h2>{{article.title}}</h2>
        <p class="article-card-desc">{{article.desc}}</p>
        <article-tags class="article-card-tags" :tags="article.tags"></article-tags>
      </v-card-text>
    </v-card>
  </nuxt-link>
</template>

<script>
import ArticleTags from '../article-tags';

export default {
  name: 'article-card',
  props: {
    article: Object
  },
  components: {
    ArticleTags,
  }
};
</script>

<style lang="scss" scoped>
.article-card {
  width: 100%;

  h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  &-desc {
    white-space: normal;
    color: rgba(0, 0, 0, .6);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 42px;
    margin-bottom: 0;
    transition: all 300ms;
  }

  .card__media {
    transition: all 300ms;
  }

  &-tags {
    margin: 5px auto -10px -5px;
  }

  &:hover {
    .article-card-desc {
      height: 84px;
      -webkit-line-clamp: 4;
    }

    .card__media {
      height: 148px !important;
    }
  }
}

.card__text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


