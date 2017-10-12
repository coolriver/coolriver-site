import { articleModel } from '../models/index';

export async function getList(ctx, next) {
    const list = articleModel.getList();
    ctx.status = 200;
    ctx.body = list;
    // next();
}
