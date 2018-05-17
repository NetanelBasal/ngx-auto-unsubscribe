const isFunction = (fn) => typeof fn === 'function';

const doUnsuscribe = (subscription) => {
  subscription && isFunction(subscription.unsubscribe) && subscription.unsubscribe();
}

const doUnsuscribeIfArray = (subscriptionsArray) => {
  Array.isArray(subscriptionsArray) && subscriptionsArray.forEach(doUnsuscribe);
}

export function AutoUnsubscribe({ blackList = [], includeArrays = false, arrayName = '', event = 'ngOnDestroy'} = {}) {

  return function (constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original) && !disableAutoUnsubscribeAot()) {
      console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
    }

    constructor.prototype[event] = function () {
      if (arrayName) {
        return doUnsuscribeIfArray(this[arrayName]);
      }
      
      for (let propName in this) {
        if (blackList.includes(propName)) continue;

        const property = this[propName];
        doUnsuscribe(property);
        doUnsuscribeIfArray(property);
      }

      isFunction(original) && original.apply(this, arguments);
    };
  }


  function disableAutoUnsubscribeAot() {
    return window['disableAutoUnsubscribeAot'] || window['disableAuthUnsubscribeAot'];
  }
}
