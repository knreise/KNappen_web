/// <reference path="../_references.ts" />
/**
    Provider modules
    @namespace System.Utils
*/
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        var CompatibilityInfo = (function () {
            /**
              * CompatibilityInfo
              * @class System.Utils.CompatibilityInfo
              * @classdesc Collects compatibility information about runtime environment.
              */
            function CompatibilityInfo() {
                this.isiPhone = false;
                this.isAndroid = false;
                this.isMobile = false;
                this.checkMobile();
            }
            CompatibilityInfo.prototype.checkMobile = function () {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
                    this.isMobile = true;
                if (/Android|webOS/i.test(navigator.userAgent))
                    this.isAndroid = true;
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
                    this.isiPhone = true;
                log.debug("CompatibilityInfo", "isMobile: " + this.isMobile);
                log.debug("CompatibilityInfo", "isAndroid: " + this.isAndroid);
                log.debug("CompatibilityInfo", "isiPhone: " + this.isiPhone);
            };
            return CompatibilityInfo;
        })();
        Utils.CompatibilityInfo = CompatibilityInfo;
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
var compatibilityInfo = new System.Utils.CompatibilityInfo();
