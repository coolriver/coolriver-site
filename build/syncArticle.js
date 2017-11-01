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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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
  var articleFind = find({ name: name });

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

  return articleModel.filter(filter);
};

// 根据条件返回一个文章信息
function find() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return articleModel.find(filter);
}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_walk__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_walk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_walk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_mdParser__ = __webpack_require__(25);






var mdDir = __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(__dirname, '../markdown/');

// articleModel.addOrUpdateArticle('test');

function walkMd() {
  var walker = __WEBPACK_IMPORTED_MODULE_1_walk___default.a.walk(mdDir, {});

  walker.on('file', function (root, fileStats, next) {
    var name = fileStats.name,
        birthtime = fileStats.birthtime;

    var fileNamePur = name.replace(/\.md$/, '');
    var filePath = __WEBPACK_IMPORTED_MODULE_0_path___default.a.resolve(mdDir, name);

    __WEBPACK_IMPORTED_MODULE_2_fs___default.a.readFile(filePath, 'utf8', function (err, data) {
      var tags = Object(__WEBPACK_IMPORTED_MODULE_4__libs_mdParser__["c" /* parseTags */])(data);
      var desc = Object(__WEBPACK_IMPORTED_MODULE_4__libs_mdParser__["a" /* parseDesc */])(data);
      var img = Object(__WEBPACK_IMPORTED_MODULE_4__libs_mdParser__["b" /* parseImage */])(data);
      var title = Object(__WEBPACK_IMPORTED_MODULE_4__libs_mdParser__["d" /* parseTitle */])(data);

      __WEBPACK_IMPORTED_MODULE_3__models_index__["a" /* articleModel */].insertOrUpdate({
        title: title,
        img: img,
        desc: desc,
        tags: tags,
        name: fileNamePur,
        time: birthtime
      });

      next();
    });
  });
}

walkMd();

console.log('sync article done');
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("walk");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = parseTags;
/* harmony export (immutable) */ __webpack_exports__["a"] = parseDesc;
/* harmony export (immutable) */ __webpack_exports__["b"] = parseImage;
/* harmony export (immutable) */ __webpack_exports__["d"] = parseTitle;
/**
 * 解析md文档中的tag占位符，得到文章的tags
 * @export
 * @param {String} content md内容文本
 * @returns {Array} tags列表
 */
function parseTags(content) {
  var TAG_REG = /^<!--TAG\s*(.*)\s*\/TAG-->$/m;
  var matches = content.match(TAG_REG) || [];
  var tagsStr = matches[1];
  var tags = tagsStr ? tagsStr.split(';') : [];

  return tags.map(function (tag) {
    return tag.trim();
  });
};

/**
 * 解析md文档中的描述点位符，得到文章的简介信息
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 文章简介
 */
function parseDesc(content) {
  //const DESC_REG = /^<!--DESC\s*(.*)\s*\/DESC-->$/m;
  var DESC_REG = /^(?=[\u4e00-\u9fa5]|[\w])(.*)$/m;
  var matches = content.match(DESC_REG) || [];

  return matches[1] || '暂无简介信息';
};

/**
 * 解析文档中的图片信息，得到第一张图片链接
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 图片链接
 */
function parseImage(content) {
  var IMG_REG = /!\[\]\(([^\(\)]+)\)/;
  var matches = content.match(IMG_REG) || [];

  return matches[1] || '/image/default-article-img.jpg';
};

/**
 * 解析文档中的标题信息
 *
 * @export
 * @param {String} content md内容文本
 * @returns {String} 文章标题
 */
function parseTitle(content) {
  var TITLE_REG = /^#(.+)$/m;
  var matches = content.match(TITLE_REG) || [];
  var title = matches[1] && matches[1].trim() || '未知标题';

  console.log('title: ' + title);
  return title;
}

/***/ })
/******/ ]);
//# sourceMappingURL=syncArticle.map