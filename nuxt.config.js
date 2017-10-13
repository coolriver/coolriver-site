module.exports = {
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" }
    ]
  },
  build: {
    extend: function(config) {
      config.module.rules = config.module.rules.concat([
        {
          test: /\.md$/,
          loaders: ["raw-loader", "markdown-code-highlight-loader"]
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: "url-loader",
          query: {
            limit: 1000, // 1 KO
            name: "fonts/[name].[hash:7].[ext]"
          }
        }
      ]);
    },
    loaders: [
      {
        test: /\.md$/,
        loaders: ["raw-loader", "markdown-code-highlight-loader"]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 1000, // 1 KO
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
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
