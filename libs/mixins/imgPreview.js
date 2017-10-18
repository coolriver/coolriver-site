/**
 * 文章内容图片点击预览mixin
 */
import { bindEvent, unbindEvent } from '../event';

let docElem = null;
let curImg = null;
let layoutElem = null;
let windowWidth = 0;
let windowHeight = 0;

/**
 * 点击页面事件代理
 *
 * @param {Event} e 事件对象
 */
function previewClickHandle(e) {
  if (curImg) {
    unpreviewImg();
    return;
  }

  if (e.target.tagName.toLowerCase() === 'img') {
    previewImg(e.target);
  }
}

/**
 * 将一个img元素进行preview展示
 *
 * @param {Element} imgElem img元素
 */
function previewImg(imgElem) {
  getImgOriginWidth(imgElem, function ({ width, height }) {
    const imgElemRect = imgElem.getBoundingClientRect();
    const offsetXCur = imgElemRect.x;
    const offsetYCur = imgElemRect.y;
    const imgOriginWidth = width;
    const imgOriginHeight = height;
    const imgCurWidth = imgElemRect.width;
    const imgCurHeight = imgElemRect.height;
    const scaleWidth = Math.min(imgOriginWidth, windowWidth);
    const scale = scaleWidth / imgCurWidth;
    const scaleHeight = imgCurHeight * scale;
    const offsetXCurNew = (windowWidth - scaleWidth) / 2;
    const offsetYCurNew = (windowHeight - scaleHeight) / 2;
    const translateX = (offsetXCurNew - offsetXCur) / scale;
    const translateY = (offsetYCurNew - offsetYCur) / scale;

    curImg = imgElem;
    curImg.style.position = 'relative';
    curImg.style.zIndex = 1001;
    curImg.style.cursor = 'zoom-out';
    curImg.style.transition = 'all 300ms';
    curImg.style.transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;
    curImg.style.transformOrigin = '0 0 0';

    appendLayout();
  });
}

/**
 * 取消当前preview img元素的preview展示
 */
function unpreviewImg() {
  if (curImg) {
    removeLayout();
    curImg.style.position = 'static';
    curImg.style.transform = 'none';
    curImg.style.cursor = null;

    curImg = null;
  }
}

/**
 * 添加preview背景layout
 */
function appendLayout() {
  if (!layoutElem) {
    layoutElem = document.createElement('div');
    layoutElem.id = 'img-preview-layout';
    layoutElem.style.position = 'fixed';
    layoutElem.style.left = 0;
    layoutElem.style.right = 0;
    layoutElem.style.top = 0;
    layoutElem.style.bottom = 0;
    layoutElem.style.background = '#fff';
    layoutElem.style.zIndex = 1000;
    layoutElem.style.cursor = 'zoom-out';
  }

  docElem.getElementsByTagName('body')[0].appendChild(layoutElem);
}

/**
 * 移除preview背景layout
 */
function removeLayout() {
  layoutElem && layoutElem.parentNode && layoutElem.parentNode.removeChild(layoutElem);
}

/**
 * 获取一个图片元素原始图片尺寸
 *
 * @param {Element} imgElem 图片元素
 * @param {Function} cb 获取到尺寸后的回调函数
 */
function getImgOriginWidth(imgElem, cb) {
  var newImg = new Image();

  newImg.onload = function () {
    var height = newImg.height;
    var width = newImg.width;
    cb({ height: newImg.height, width: newImg.width });

    newImg = null;
  }

  newImg.src = imgElem.src;
}

export default {
  mounted() {
    console.log('mixin mounted');
    docElem = document;
    windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    bindEvent(docElem, 'click', previewClickHandle);
    bindEvent(window, 'scroll', unpreviewImg);
  },
  destroyed() {
    console.log('mixin destroyed');
    unbindEvent(docElem, 'click', previewClickHandle);
    unbindEvent(window, 'scroll', unpreviewImg);
    removeLayout();
    docElem = null;
    curImg = null;
    layoutElem = null;
  }
};
