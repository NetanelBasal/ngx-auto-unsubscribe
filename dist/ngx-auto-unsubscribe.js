export function AutoUnsubscribe(blackList) {
    if (blackList === void 0) { blackList = []; }
    return function (constructor) {
        var original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = function () {
            for (var prop in this) {
                var property = this[prop];
                if (blackList.indexOf(prop) !== -1) {
                    if (property && (typeof property.unsubscribe === "function")) {
                        property.unsubscribe();
                    }
                }
            }
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    };
}
//# sourceMappingURL=ngx-auto-unsubscribe.js.map