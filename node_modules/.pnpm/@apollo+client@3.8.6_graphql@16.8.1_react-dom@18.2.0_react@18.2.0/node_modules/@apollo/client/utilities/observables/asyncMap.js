import { Observable } from "./Observable.js";
export function asyncMap(observable, mapFn, catchFn) {
    return new Observable(function (observer) {
        var promiseQueue = {
            then: function (callback) {
                return new Promise(function (resolve) { return resolve(callback()); });
            },
        };
        function makeCallback(examiner, key) {
            return function (arg) {
                if (examiner) {
                    var both = function () {
                        return observer.closed
                            ? 0
                            : examiner(arg);
                    };
                    promiseQueue = promiseQueue.then(both, both).then(function (result) { return observer.next(result); }, function (error) { return observer.error(error); });
                }
                else {
                    observer[key](arg);
                }
            };
        }
        var handler = {
            next: makeCallback(mapFn, "next"),
            error: makeCallback(catchFn, "error"),
            complete: function () {
                promiseQueue.then(function () { return observer.complete(); });
            },
        };
        var sub = observable.subscribe(handler);
        return function () { return sub.unsubscribe(); };
    });
}
//# sourceMappingURL=asyncMap.js.map