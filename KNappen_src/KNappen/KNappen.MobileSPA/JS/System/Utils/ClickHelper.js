/// <reference path="../_references.ts" />
/**
    Provider modules
    @namespace System.Utils
*/
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        var Click = (function () {
            /**
              * Click
              * @class System.Utils.Click
              * @classdesc Helper functions for click-events.
              */
            function Click() {
                this.clickToken = undefined;
            }
            /**
             * A timeout function to avoid multiple clicks in close succession.
             * Only the last callback-function will be called.
             * @method System.Utils.Click#delay
             */
            Click.prototype.delay = function (callback) {
                if (this.clickToken)
                    clearTimeout(this.clickToken);
                this.clickToken = setTimeout(callback, 350);
            };
            /**
              * Suppresses all calls to this function for the specified duration.
              * The callback fuction is called immediately.
              * @method System.Utils.Click#suppress
              */
            Click.prototype.suppress = function (callback, milliseconds) {
                var _this = this;
                if (this.suppressClick)
                    return;
                this.suppressClick = true;
                callback();
                setTimeout(function () {
                    _this.suppressClick = false;
                }, milliseconds);
            };
            return Click;
        })();
        Utils.Click = Click;
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
var clickHelper = new System.Utils.Click();
