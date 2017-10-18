export function bindEvent (elem, eventType, fn) {
  if (elem.addEventListener) {
    elem.addEventListener(eventType, fn, false);
  } else if (elem.attachEvent) {
    elem.attachEvent('on' + eventType, fn);
  } else {
    elem['on' + eventType] = fn;
  }
}

export function unbindEvent (elem, eventType, fn) {
  if (elem.removeEventListener) {
    elem.removeEventListener(eventType, fn, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + eventType, fn);
  } else {
    elem['on' + eventType] = null;
  }
}
