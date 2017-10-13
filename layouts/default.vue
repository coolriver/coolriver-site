<template>
  <v-app id="example-2" light>
    <v-toolbar class="cyan darken" dark fixed>
      <nuxt-link to="/">
        <v-toolbar-title class="home-title">coolriver</v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
    </v-toolbar>
    <main>
      <v-container grid-list-md mt-2>
        <v-layout row wrap>
          <v-flex xs12 md9 order-xs2 order-md3>
            <nuxt/>
          </v-flex>
          <v-flex xs12 md3 order-xs1 order-md4 class="aside">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card hover>
                  <v-card-title primary class="title">Lorem</v-card-title>
                  <v-card-text>
                    lalalala
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card hover>
                  <v-card-title primary class="title">Lorem</v-card-title>
                  <v-card-text>
                    lalalala
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <v-footer class="grey darken-3 justify-center">
      <span class="white--text">Copyright © 2017 coolriver</span>
      <span class="white--text ml-3 hidden-xs-only">粤ICP备16047967号-1</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'default-layout',
  data() {
    return {
      drawer: true,
    };
  },
  created() {
    /*     return axios.get('/api/article/list')
          .then((res) => {
            this.list = res.data;
          }); */
  }
}
</script>

<style scoped>
.home-title {
  color: #fff;
}

.aside>.layout {
  position: sticky;
  top: 76px;
}

.toolbar--fixed {
  z-index: 100;
}

.footer {
  text-align: center;
  padding: 20px 0;
  height: auto;
}

.container>.layout {
  min-height: 100vh;
}

@media (min-width: 0) {
  .container>.layout {
    min-height: 0;
  }
}

@media (min-width: 960px) {
  .container>.layout {
    min-height: 100vh;
  }
}
</style>

