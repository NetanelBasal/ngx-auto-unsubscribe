export function AutoUnsubscribe( blackList = [] ) {

  return function ( constructor: any ) {
    const original = constructor.prototype.ngOnDestroy;
  
   constructor.prototype.ngOnDestroy = function () {
      for ( let prop in this ) {
        const property = this[ prop ];

        blackList.indexOf(prop) === -1 && property && (typeof property.unsubscribe === 'function') && property.unsubscribe();
      }
      original && typeof original === 'function' && original.apply(this, arguments);
    };
  }

}