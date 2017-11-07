import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _332f8876 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages\\index" */).then(m => m.default || m)
const _729f3e00 = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages\\about" */).then(m => m.default || m)
const _0d3777d1 = () => import('..\\pages\\tags\\_tag.vue' /* webpackChunkName: "pages\\tags\\_tag" */).then(m => m.default || m)
const _292dd75e = () => import('..\\pages\\articles\\_article.vue' /* webpackChunkName: "pages\\articles\\_article" */).then(m => m.default || m)



const scrollBehavior = (to, from, savedPosition) => {
  // SavedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // If no children detected
    if (to.matched.length < 2) {
      // Scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // If one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // If link has anchor, scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _332f8876,
			name: "index"
		},
		{
			path: "/about",
			component: _729f3e00,
			name: "about"
		},
		{
			path: "/tags/:tag?",
			component: _0d3777d1,
			name: "tags-tag"
		},
		{
			path: "/articles/:article?",
			component: _292dd75e,
			name: "articles-article"
		}
    ],
    fallback: false
  })
}
