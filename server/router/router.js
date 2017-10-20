import Router from 'koa-router';
import * as article from '../controllers/article';

const router = new Router();

export default function setupRouter (app) {
  router.get('/api/articles', article.getList);
  router.get('/api/article', article.find);

  app.use(router.routes());
};
