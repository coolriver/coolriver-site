<template>
<v-flex xs12>
  <v-card hover class="article-recent-card">
    <h2>最近文章</h2>
    <v-progress-circular v-if="!recentList.length" indeterminate></v-progress-circular>
    <ul v-else>
      <nuxt-link v-for="(article, index) in recentList" :title="article.title" :key="index" :to="`/articles/${article.name}`">
        <li><v-icon>mdi-file-document</v-icon><span>{{article.title}}</span></li>
      </nuxt-link>
    </ul>
  </v-card>
</v-flex>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'article-recent',
  computed: {
    ...mapState(['recentList'])
  }
};
</script>

<style lang="scss" scoped>
.article-recent-card {
  overflow: hidden;

  h2 {
    font-size: 18px;
    padding: 10px 15px;
    margin-bottom: 0;
    border-bottom: 1px solid #ccc;
  }

  ul {
    padding: 10px 15px 15px 15px;
  }

  li {
    word-break: break-all;

    & > span {
      vertical-align: middle;
    }
  }

  a {
    color: rgba(0,0,0,.87);

    &:hover {
      color: #1976d2;

      i {
        color: #1976d2;
      }
    }
  }

  i {
    font-size: 18px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .progress-circular {
    margin: 30px auto;
    display: block;
  }
}
</style>

