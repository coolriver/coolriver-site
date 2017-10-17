module.exports = {
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "coolriver的个人博客站点" },
      { hid: "keywords", name: "keywords", content: "coolriver,前端,博客" },
      { hid: "shareimg", itemprop: "image", content: "https://coolriver.net.cn/avatar.jpg" },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?406ea27bfbb3000b689c8ab5f17ebb86'
      }
    ],
    title: 'coolriver的空间',
  },
  build: {
    extend: function (config) {
      const imageLoaderConf = config.module.rules.find(function (item) {
        return item.test.toString().indexOf('|svg') >= 0;
      });

      const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
      vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';

      imageLoaderConf.test = /\.(png|jpe?g|gif)$/;

      config.module.rules = config.module.rules.concat([
        {
          test: /\.md$/,
          loaders: ["raw-loader", "markdown-code-highlight-loader"]
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader',
          options: {
            limit: 1000
          }
        }
      ]);
    }
  },
  css: [
    "vuetify/dist/vuetify.css",
    "~assets/css/common.css",
    "mdi/css/materialdesignicons.css",
    "highlight.js/styles/atom-one-dark.css",
    "github-markdown-css/github-markdown.css"
  ],
  plugins: ["~plugins/vue-vuetify"],
  vendor: ['axios']
};
