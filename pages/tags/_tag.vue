<template>
  <div class="page-tag">
    <h2 class="card"><v-icon class="light-blue--text text--lighten-2">mdi-bookmark</v-icon>{{tag}}</h2>
    <v-layout wrap>
      <v-flex :class="`${item.flexClass}`" d-flex v-for="(item, index) in articles" :key="index" :xs="12" md6 lg4>
        <article-card :article="item"></article-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import api from '../../libs/api';
import ArticleCard from '../../components/article-card';
import { cardFlexLayout } from '../../config/constant';

export default {
  async asyncData({ params, error, req }) {
    const { tag } = params;
    const articles = await api.article.getList({ tag });
    return {
      articles,
      tag
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
  components: {
    ArticleCard
  }
};
</script>

<style lang="scss" scoped>
.page-tag {
  h2 {
    font-size: 26px;
    background: #fff;
    padding: 10px;
    margin-bottom: 10px;

    i {
      font-size: 32px;
      margin-right: 10px;
    }
  }
}
</style>

