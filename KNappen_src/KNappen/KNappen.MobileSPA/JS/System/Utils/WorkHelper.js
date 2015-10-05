/// <reference path="../_references.ts" />
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        var WorkQueueItem = (function () {
            function WorkQueueItem(work, doWork, wait) {
                if (wait === void 0) { wait = function (item) { return false; }; }
                this.work = work;
                this.doWork = doWork;
                this.wait = wait;
            }
            return WorkQueueItem;
        })();
        Utils.WorkQueueItem = WorkQueueItem;
        var WorkQueueState = (function () {
            function WorkQueueState() {
                this.aborted = false;
            }
            return WorkQueueState;
        })();
        Utils.WorkQueueState = WorkQueueState;
        var WorkHelper = (function () {
            function WorkHelper() {
            }
            WorkHelper.processWork = function (queue, state, callback, initialTimeout) {
                if (initialTimeout === void 0) { initialTimeout = 35; }
                setTimeout(function () { return WorkHelper.processItemsHandle(queue, state, callback); }, initialTimeout);
            };
            WorkHelper.processItemsHandle = function (queue, state, callback) {
                var wait = false;
                if (queue.length > 0 && !state.aborted) {
                    var nextItem = queue[0];
                    wait = nextItem.wait != null && nextItem.wait(nextItem.work);
                    if (!wait) {
                        queue.shift();
                        nextItem.doWork(nextItem.work);
                    }
                }
                if (!state.aborted && (wait || queue.length > 0)) {
                    setTimeout(function () { return WorkHelper.processItemsHandle(queue, state, callback); }, 35);
                }
                else {
                    if (callback) {
                        callback(!state.aborted);
                    }
                }
            };
            return WorkHelper;
        })();
        Utils.WorkHelper = WorkHelper;
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
