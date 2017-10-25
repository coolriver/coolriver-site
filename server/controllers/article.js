import { articleModel } from '../models/index';

export async function getList(ctx, next) {
  let { limit = Number.MAX_SAFE_INTEGER, offset = 0 } = ctx.query;
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  const list = articleModel.getList()
    .sort((a, b) => { // 按照最新的放在最前面排序
      return a.time > b.time ? -1 : 1;
    })
    .slice(offset, limit + offset)
    .value();
  ctx.status = 200;
  ctx.body = list;
}

export async function find(ctx, next) {
  const article = articleModel.find({ name: ctx.query.name }).value();
  ctx.status = 200;
  ctx.body = article;
}
