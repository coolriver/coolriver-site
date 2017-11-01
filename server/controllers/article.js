import { articleModel } from '../models/index';

export async function getList(ctx, next) {
  let { limit = Number.MAX_SAFE_INTEGER, offset = 0, tag } = ctx.query;
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);

  let list = articleModel.getList()
    .sort((a, b) => { // 按照最新的放在最前面排序
      return a.time > b.time ? -1 : 1;
    })
    .slice(offset, limit + offset)
    .value();

  // 有标签筛选条件
  if (tag) {
    list = list.filter(item => item.tags.indexOf(tag) >= 0);
  }

  ctx.status = 200;
  ctx.body = list;
}

export async function find(ctx, next) {
  const article = articleModel.find({ name: ctx.query.name }).value();
  ctx.status = 200;
  ctx.body = article;
}

export async function getTags (ctx, next) {
  const articles = articleModel.getList().value();
  const tags = articles.map(article => article.tags)
    .reduce((result, cur) => result.concat(cur), []);
  const tagsUniq = Array.from(new Set(tags));

  ctx.status = 200;
  ctx.body = tagsUniq;
}
