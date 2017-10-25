<template>
  <v-layout wrap>
    <v-flex :class="`article-card ${item.flexClass}`" d-flex v-for="(item, index) in listFormated" :key="index" :xs="12" md6 lg4>
      <nuxt-link :to="`/articles/${item.name}`" v-if="true">
        <v-card hover>
          <v-card-media height="190px" :src="item.img">
          </v-card-media>
          <v-card-text>
            <h2>{{item.title}}</h2>
            <p class="article-card-desc">{{item.desc}}</p>
            <article-tags class="article-card-tags" :tags="item.tags"></article-tags>
          </v-card-text>
        </v-card>
      </nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '../libs/api';
import ArticleTags from '../components/article-tags';
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
  }
};
</script>

<style scoped lang="scss">
.article-card {
  &>a {
    width: 100%;
  }

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
    margin: 5px auto -5px -5px;
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


