<template>
  <v-layout wrap>
    <v-flex d-flex v-for="(item, index) in list" :key="index" xs12 md6 lg4>
      <nuxt-link :to="`/articles/${item.name}`" v-if="true">
        <v-card hover>
          <v-card-media height="190px" :src="item.img">
          </v-card-media>
          <v-card-text>
            {{item.title}}
          </v-card-text>
        </v-card>
      </nuxt-link>
    </v-flex>
    <v-flex d-flex v-for="(item, index) in list" :key="index" xs12 md6 lg4>
      <nuxt-link :to="`/articles/${item.name}`" v-if="true">
        <v-card hover>
          <v-card-media height="190px" :src="item.img">
          </v-card-media>
          <v-card-text>
            {{item.title}}
          </v-card-text>
        </v-card>
      </nuxt-link>
    </v-flex>
    <v-flex d-flex v-for="(item, index) in list" :key="index" xs12 md6 lg4>
      <nuxt-link :to="`/articles/${item.name}`" v-if="true">
        <v-card hover>
          <v-card-media height="190px" :src="item.img">
          </v-card-media>
          <v-card-text>
            {{item.title}}
          </v-card-text>
        </v-card>
      </nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ params, err, req }) {
    const url = req ? 'http://localhost/api/article/list' : '/api/article/list';
    const result = await axios.get(url);
    return {
      list: result.data
    };
  },
  data() {
    return {
      list: []
    };
  },
  created() {

  }
};
</script>

<style>

</style>


