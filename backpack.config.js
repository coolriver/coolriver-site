module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/entry.js';
    config.entry.server = './server/server.js';
    config.entry.syncArticle = './server/syncArticleData.js';
    return config;
  }
}
