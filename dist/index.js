// We need to include a polyfill for the String.prototype.includes method. Else IE 11 support is not given. Fixes https://github.com/NetanelBasal/ngx-auto-unsubscribe/issues/5
// The Polyfill is copied from the offical polyfill. Source: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/includes
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

export { AutoUnsubscribe } from "./ngx-auto-unsubscribe";
//# sourceMappingURL=index.js.map
