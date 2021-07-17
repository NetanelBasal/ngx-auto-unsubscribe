const isFunction = fn => typeof fn === 'function';

const doUnsubscribe = subscription => {
  subscription &&
    isFunction(subscription.unsubscribe) &&
    (subscription.isStopped === false || subscription.closed === false) &&
    subscription.unsubscribe();
};

const doUnsubscribeIfArray = subscriptionsArray => {
  Array.isArray(subscriptionsArray) &&
    subscriptionsArray.forEach(doUnsubscribe);
};

interface AutoUnsubParamType {
  blackList?: string[];
  arrayName?: string;
  event?: string;
}

export function AutoUnsubscribe({
  blackList = [],
  arrayName = '',
  event = 'ngOnDestroy'
}: AutoUnsubParamType = {}) {
  return function(constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original)) {
      throw new Error(
        `${
          constructor.name
        } is using @AutoUnsubscribe but does not implement ${event}`
      );
    }

    constructor.prototype[event] = function() {
      isFunction(original) && original.apply(this, arguments);

      if (arrayName) {
        doUnsubscribeIfArray(this[arrayName]);
        return;
      }

      for (let propName in this) {
        if (blackList.includes(propName)) continue;

        const property = this[propName];
        doUnsubscribe(property);
      }
    };
  };
}
