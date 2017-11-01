/**
 * API列表，建议最多两层嵌套
 *
 * url值的格式为 String/Object
 * String: url的值
 * Object：{ // axios config options
 *  url: '',
 *  method: '',// get/post/put/delete, 为URL的请求方法，不写默认为post
 *  baseUrl: ''
 * }
 */
export default {
  article: {
    getList: '/api/articles',
    getArticle: '/api/article',
    getTags: '/api/tags',
  }
};
