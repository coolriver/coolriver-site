import Router from 'koa-router';
import * as article from '../controllers/article';

const router = new Router();

export default function setupRouter (app) {
  router.get('/api/article/list', article.getList);

  app.use(router.routes());
};
