import { bindEvent, unbindEvent } from '../event';
import _ from 'lodash';

let iframeList = [];

// 初始化iframe列表
function initIframeList() {
  iframeList = [].slice.call(document.getElementsByClassName('js-lazy-iframe'))
    .map($iframe => ({
      $iframe,
      load: false
    }));

  checkIframe();
  console.log(iframeList);
}

// 加载iframe
function loadIframe(iframe) {
  const { $iframe } = iframe;
  const iframeSrc = $iframe.getAttribute('lazy-src');
  $iframe.src = iframeSrc;
  iframe.load = true;
}

// 判断 iframe是否在视察中
function isIframeInSight($iframe) {
  if (!$iframe.getBoundingClientRect) {
    return true;
  }

  const rect = $iframe.getBoundingClientRect();
  const { top, bottom, height } = rect;
  const windowHeight = window.innerHeight;

  return top < windowHeight && bottom > 0;
}

// 对所有未加载的iframe做一次检测
function checkIframe() {
  iframeList = iframeList.filter(iframe => !iframe.load);

  iframeList.filter(({ $iframe }) => isIframeInSight($iframe))
    .forEach(iframe => loadIframe(iframe));
}

// 经过debounce的检测函数
const debounceCheckIframe = _.debounce(checkIframe, 100);

export default {
  mounted() {
    initIframeList();
    bindEvent(window, 'scroll', debounceCheckIframe);
  },
  destroyed() {
    unbindEvent(window, 'scroll', debounceCheckIframe);
    iframeList = [];
  }
};
