/**
 * 解析md文档中的tag占位符，得到文章的tags
 * @export
 * @param {String} content md内容文本
 * @returns {Array} tags列表
 */
export function parseTags (content) {
  const TAG_REG = /^<!--TAG\s*(.*)\s*\/TAG-->$/m;
  const matches = content.match(TAG_REG) || [];
  const tagsStr = matches[1];

  return tagsStr ? tagsStr.split(';') : [];
};

/**
 * 解析md文档中的描述点位符，得到文章的简介信息
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 文章简介
 */
export function parseDesc (content) {
  //const DESC_REG = /^<!--DESC\s*(.*)\s*\/DESC-->$/m;
  const DESC_REG = /^(?=[\u4e00-\u9fa5]|[\w])(.*)$/m;
  const matches = content.match(DESC_REG) || [];

  return matches[1] || '暂无简介信息';
};

/**
 * 解析文档中的图片信息，得到第一张图片链接
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 图片链接
 */
export function parseImage (content) {
  const IMG_REG = /!\[\]\(([^\(\)]+)\)/;
  const matches = content.match(IMG_REG) || [];

  return matches[1] || '/image/default-article-img.jpg';
};

/**
 * 解析文档中的标题信息
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 文章标题
 */
export function parseTitle (content) {
  const TITLE_REG = /^#(.+)$/m;
  const matches = content.match(TITLE_REG) || [];
  const title = matches[1] && matches[1].trim() || '未知标题';

  console.log('title: ' + title);
  return title;
}
