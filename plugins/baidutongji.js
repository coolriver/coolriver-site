export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    const { path } = to;
    const { name } = from;

    name && _hmt && _hmt.push(['_trackPageview', path]);
  });
};
