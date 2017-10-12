import { DB } from '../db/index';
import shortid from 'shortid';

const articleModel = DB.get('articles');

// 添加或者更新（如果文章name已经存在的话）一个文章信息
export function insertOrUpdate({ title, time, img, desc, tags, name }) {
  const data = {
    title,
    img,
    desc,
    tags,
    name
  };
  const articleFind = find({ name });

  if (!articleFind) {
    // 新增article时，需要传入id和创建时间
    articleModel.push(Object.assign({}, data, {
      id: shortid.generate(),
      time: +time,
    })).write();
  } else {
    articleModel.assign(data).write();
  }
};

// 根据条件返回文章列表
export function getList (filter = {}) {
  return articleModel.filter(filter).value();
};

// 根据条件返回一个文章信息
export function find (filter = {}) {
  return articleModel.find(filter).value();
}
