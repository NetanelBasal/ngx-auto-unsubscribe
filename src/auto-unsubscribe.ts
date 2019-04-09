const isFunction = fn => typeof fn === "function";

const doUnsubscribe = subscription => {
  subscription &&
    isFunction(subscription.unsubscribe) &&
    !(subscription instanceof Subject) &&
    subscription.unsubscribe();
};

const doUnsubscribeIfArray = subscriptionsArray => {
  Array.isArray(subscriptionsArray) &&
    subscriptionsArray.forEach(doUnsubscribe);
};

export function AutoUnsubscribe({
  blackList = [],
  arrayName = "",
  event = "ngOnDestroy"
} = {}) {
  return function(constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original)) {
      throw new Error(
        `${
          constructor.name
        } is using @AutoUnsubscribe but does not implement OnDestroy`
      );
    }

    constructor.prototype[event] = function() {
      if (arrayName) {
        doUnsubscribeIfArray(this[arrayName]);
        isFunction(original) && original.apply(this, arguments);
        return;
      }

      for (let propName in this) {
        if (blackList.includes(propName)) continue;

        const property = this[propName];
        doUnsubscribe(property);
      }

      isFunction(original) && original.apply(this, arguments);
    };
  };
}
