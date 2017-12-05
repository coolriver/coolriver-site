# coolriver 站点

站点地址: [https://coolriver.net.cn](https://coolriver.net.cn)

## 目标
构建一个自己的博客系统，方便在上面尝试各种技术。虽然现有的[hexo](https://hexo.io/zh-cn/index.html)可以快捷地生成静态博客页面，但是为了尝试更多服务端的功能，这里还是选择有后端服务的方式来搭建一个（前提是有自己的云服务器）。

兼顾技术尝试的同时，保证发表文章的快捷。目前通过构建工具和git hook，可以通过简单地添加/修改一个markdown文件，然后直接commit并push到云主机的仓库，线上就可以更新文章内容。

## 涉及技术（包含todo）
- [x] **Nuxt**: 直接打开页面是直出(SSR), 在后在页面上操作进行路由切换时是异步渲染。
- [x] **Markdown**: 博客的内容都是由markdown文章构成，所有页面的构建和源数据都是自动从markdown目录中的文件进行处理的。
- [x] **Material Design**: 使用的UI库是基于vue的[Vuetify](https://vuetifyjs.com/)。同时网站是响应式的。
- [x] **Lowdb**: 不想在数据库上花费太多精力，使用lowdb作为简单的json文本数据库，数据库里的文章源数据通过npm script脚本写入和更新。
- [x] **Koa2**: 后台使用koa2作为服务端框架。
- [x] **Webpack**: webpack作为前端构建(实际上是nuxt封装好的，只是添加了一些loader)。
- [x] **畅言**: 使用畅言作为第三方评论工具
- [ ] **Backpack**: server端代码使用backpack构建。
- [ ] **Service Worker**: 使用service worker使站点向PWA靠拢
- [ ] **Graphql**: 使用graphql统一异步查询接口

## 本地开发
```shell
npm install # or yarn install
npm run dev # 会在本地起服务
```
