function isFunction( fn ) {
  return typeof fn === 'function';
}

export function AutoUnsubscribe({ blackList = [], includeArrays = false, event = 'ngOnDestroy' } = {}) {

  return function (constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original) && !disableAutoUnsubscribeAot()) {
      console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
    }

    constructor.prototype.[event] = function () {
      for (let prop in this) {
        const property = this[prop];
        blackList.indexOf(prop) === -1 && property && isFunction(property.unsubscribe) && property.unsubscribe();

        includeArrays && blackList.indexOf(prop) === -1 && Array.isArray(property) && property.forEach(singleProp => singleProp && isFunction(singleProp.unsubscribe) && singleProp.unsubscribe());
      }

      isFunction(original) && original.apply(this, arguments);
    };
  }


  function disableAutoUnsubscribeAot() {
    return window['disableAutoUnsubscribeAot'] || window['disableAuthUnsubscribeAot'];
  }
}
