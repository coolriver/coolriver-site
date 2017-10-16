import { articleModel } from '../models/index';

export async function getList(ctx, next) {
    const list = articleModel.getList();
    ctx.status = 200;
    ctx.body = list;
    // next();
}

export async function find (ctx, next) {
  const article = articleModel.find({ name: ctx.params.name });
  ctx.status = 200;
  ctx.body = article;
}
