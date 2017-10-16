require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_init__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__libs_init__["a"]; });




/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__article__ = __webpack_require__(7);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__article__; });




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {var low = __webpack_require__(5);
var FileSync = __webpack_require__(6);
var path = __webpack_require__(0);
var dbDataPath = path.resolve(__dirname, '../data.json');
var adapter = new FileSync(dbDataPath);
var DB = low(adapter);

// Set some defaults
DB.defaults({ posts: [], users: [] }).write();

/* harmony default export */ __webpack_exports__["a"] = (DB);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server\\db\\libs"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["insertOrUpdate"] = insertOrUpdate;
/* harmony export (immutable) */ __webpack_exports__["getList"] = getList;
/* harmony export (immutable) */ __webpack_exports__["find"] = find;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_shortid__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_shortid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_shortid__);



var articleModel = __WEBPACK_IMPORTED_MODULE_0__db_index__["a" /* DB */].get('articles');

// 添加或者更新（如果文章name已经存在的话）一个文章信息
function insertOrUpdate(_ref) {
  var title = _ref.title,
      time = _ref.time,
      img = _ref.img,
      desc = _ref.desc,
      tags = _ref.tags,
      name = _ref.name;

  var data = {
    title: title,
    img: img,
    desc: desc,
    tags: tags,
    name: name
  };
  var articleFind = articleModel.find({ name: name });

  if (!articleFind.value()) {
    // 新增article时，需要传入id和创建时间
    articleModel.push(Object.assign({}, data, {
      id: __WEBPACK_IMPORTED_MODULE_1_shortid___default.a.generate(),
      time: +time
    })).write();
  } else {
    articleFind.assign(data).write();
  }
};

// 根据条件返回文章列表
function getList() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return articleModel.filter(filter).value();
};

// 根据条件返回一个文章信息
function find() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return articleModel.find(filter).value();
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_sslify__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_sslify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_sslify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_https__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_https___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_https__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_nuxt__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__db_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__router_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__libs_cors__ = __webpack_require__(20);












var app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 80;

// Import and Set Nuxt.js options
var config = __webpack_require__(22);
config.dev = !(app.env === 'production');

// 正式环境下启用https
if (!config.dev) {
  console.log('enable https');
  app.use(__WEBPACK_IMPORTED_MODULE_1_koa_sslify___default()());
}

// Instantiate nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_6_nuxt__["Nuxt"](config);

// Build in development
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_6_nuxt__["Builder"](nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_9__libs_cors__["a" /* default */])(app);
Object(__WEBPACK_IMPORTED_MODULE_8__router_router__["a" /* default */])(app);

app.use(function (ctx) {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset

  return new Promise(function (resolve, reject) {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, function (promise) {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

// app.listen(port, '0.0.0.0');
__WEBPACK_IMPORTED_MODULE_2_http___default.a.createServer(app.callback()).listen(port);

if (!config.dev) {
  __WEBPACK_IMPORTED_MODULE_3_https___default.a.createServer({
    key: __WEBPACK_IMPORTED_MODULE_5_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_4_path___default.a.resolve(__dirname, './ssl/2_coolriver.net.cn.key')),
    cert: __WEBPACK_IMPORTED_MODULE_5_fs___default.a.readFileSync(__WEBPACK_IMPORTED_MODULE_4_path___default.a.resolve(__dirname, './ssl/1_coolriver.net.cn_bundle.crt'))
  }, app.callback()).listen(443);
}

console.log('Server listening on a ' + host + ':' + port); // eslint-disable-line no-console
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("koa-sslify");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setupRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_article__ = __webpack_require__(17);



var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

function setupRouter(app) {
  router.get('/api/article/list', __WEBPACK_IMPORTED_MODULE_1__controllers_article__["a" /* getList */]);

  app.use(router.routes());
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_testspace_coolriver_site_node_modules_babel_runtime_regenerator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_testspace_coolriver_site_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_testspace_coolriver_site_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_index__ = __webpack_require__(3);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



var getList = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_testspace_coolriver_site_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
        var list;
        return __WEBPACK_IMPORTED_MODULE_0_E_testspace_coolriver_site_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        list = __WEBPACK_IMPORTED_MODULE_1__models_index__["a" /* articleModel */].getList();

                        ctx.status = 200;
                        ctx.body = list;
                        // next();

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getList(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setupCors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa2_cors__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa2_cors__);


var whiteDomain = ['coolriver.net.cn', 'localhost', '127.0.0.1'];

function setupCors(app) {
  app.use(__WEBPACK_IMPORTED_MODULE_0_koa2_cors___default()({
    origin: function origin(ctx) {
      // return '*';
      console.log(ctx.hostname);
      if (whiteDomain.indexOf(ctx.hostname) >= 0) {
        return ctx.origin;
      }

      return false;
    }
  }));
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("koa2-cors");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {
  head: {
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "Meta description" }]
  },
  build: {
    extend: function extend(config) {
      config.module.rules = config.module.rules.concat([{
        test: /\.md$/,
        loaders: ["raw-loader", "markdown-code-highlight-loader"]
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 1000, // 1 KO
          name: "fonts/[name].[hash:7].[ext]"
        }
      }]);
    },
    loaders: [{
      test: /\.md$/,
      loaders: ["raw-loader", "markdown-code-highlight-loader"]
    }, {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: "url-loader",
      query: {
        limit: 1000, // 1 KO
        name: "fonts/[name].[hash:7].[ext]"
      }
    }]
  },
  css: ["vuetify/dist/vuetify.css", "~assets/css/common.css", "mdi/css/materialdesignicons.css", "highlight.js/styles/atom-one-dark.css", "github-markdown-css/github-markdown.css"],
  plugins: ["~plugins/vue-vuetify"],
  vendor: ['axios']
};

/***/ })
/******/ ]);
//# sourceMappingURL=server.map