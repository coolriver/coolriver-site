<template>
  <v-layout wrap>
    <v-flex :class="`${item.flexClass}`" d-flex v-for="(item, index) in listFormated" :key="index" :xs="12" md6 lg4>
      <article-card :article="item"></article-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '../libs/api';
import ArticleTags from '../components/article-tags';
import ArticleCard from '../components/article-card';
import { cardFlexLayout } from '../config/constant';

export default {
  async asyncData({ params, err, req }) {
    const result = await api.article.getList();

    return {
      list: result
    };
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    listFormated() {
      return this.list.map((item, index) => {
        const flexClass = Object.keys(cardFlexLayout).map(key => {
          const flexList = cardFlexLayout[key];
          return `${key}${flexList[index % flexList.length]}`;
        }).join(' ');

        return Object.assign({}, item, {
          flexClass,
        });
      });
    }
  },
  created() {

  },
  components: {
    ArticleTags,
    ArticleCard,
  }
};
</script>

<style scoped lang="scss">

</style>


