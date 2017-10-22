function isFunction( fn ) {
  return typeof fn === 'function';
}

export function AutoUnsubscribe( {blackList = []} = {}) {

  return function ( constructor : Function ) {
    const original = constructor.prototype.ngOnDestroy;

    if ( !isFunction(original) && !window['disableAuthUnsubscribeAot']) {
      console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
    }

    constructor.prototype.ngOnDestroy = function () {
      for ( let prop in this ) {
        const property = this[ prop ];
        blackList.indexOf(prop) === -1 && property && isFunction(property.unsubscribe) && property.unsubscribe();
      }
      isFunction(original) && original.apply(this, arguments);
    };
  }

}
