
import Koa from 'koa';
import enforceHttps from'koa-sslify';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import { Nuxt, Builder } from 'nuxt';
import { DB } from './db/index';
import setupRouter from './router/router';
import setupCors from './libs/cors';

const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8000;

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

// 正式环境下启用https
if (!config.dev) {
  console.log('enable https');
  app.use(enforceHttps());
}

// Instantiate nuxt.js
const nuxt = new Nuxt(config);

// Build in development
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build().catch(e => {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

setupCors(app);
setupRouter(app);

app.use(ctx => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

// app.listen(port, '0.0.0.0');
http.createServer(app.callback()).listen(port);

if (!config.dev) {
  https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, './ssl/2_coolriver.net.cn.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './ssl/1_coolriver.net.cn_bundle.crt')),
  }, app.callback()).listen(443);
}

console.log('Server listening on a ' + host + ':' + port); // eslint-disable-line no-console
