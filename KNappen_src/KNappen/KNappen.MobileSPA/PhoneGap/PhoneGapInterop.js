/// <reference path="_References.ts" />
var PhoneGap;
(function (PhoneGap) {
    // Class
    var PhoneGapInterop = (function () {
        function PhoneGapInterop() {
            this.config = new System.ConfigBase();
            this.onInteropCommand = new System.Utils.Event("onInteropCommand");
            this.onDeviceReady = new System.Utils.Event("onDeviceReady");
            this.onOnline = new System.Utils.Event("onOnline");
            this.onOffline = new System.Utils.Event("onOffline");
            this.onLoad = new System.Utils.Event("onLoad");
            this.onResume = new System.Utils.Event("onResume");
            this.onPause = new System.Utils.Event("onPause");
            if (compatibilityInfo.isMobile) {
                // Don't trigger startup until we are ready.
                debugger;
                startup.autoStartup = false;
                this.bindEvents();
                this.onDeviceReady.addHandler(function () {
                    log.info("PhoneGapInterop", "onDeviceReady: Executing startup...");
                    startup.executeStartup();
                });
            }
        }
        PhoneGapInterop.prototype.bindEvents = function () {
            var _this = this;
            // Bind Event Listeners
            //
            // Bind any events that are required on startup. Common events are:
            // 'load', 'deviceready', 'offline', and 'online'.
            document.addEventListener('deviceready', function () {
                log.debug("PhoneGapInterop", "Triggering: onDeviceReady");
                _this.onDeviceReady.trigger();
            }, false);
            document.addEventListener('load', function () {
                log.debug("PhoneGapInterop", "Triggering: onLoad");
                _this.onLoad.trigger();
            }, false);
            document.addEventListener('offline', function () {
                log.debug("PhoneGapInterop", "Triggering: onOffline");
                _this.onOffline.trigger();
            }, false);
            document.addEventListener('online', function () {
                log.debug("PhoneGapInterop", "Triggering: onOnline");
                _this.onOnline.trigger();
            }, false);
            document.addEventListener("resume", function () {
                log.debug("PhoneGapInterop", "Triggering: onResume");
                _this.onResume.trigger();
            }, false);
            document.addEventListener("pause", function () {
                log.debug("PhoneGapInterop", "Triggering: onPause");
                _this.onPause.trigger();
            }, false);
        };
        PhoneGapInterop.prototype.onExitApp = function () {
            log.info("PhoneGapInterop", "Application exiting...");
            navigator.app.exitApp();
        };
        return PhoneGapInterop;
    })();
    PhoneGap.PhoneGapInterop = PhoneGapInterop;
})(PhoneGap || (PhoneGap = {}));
///**
//  *  This function extracts an url parameter
//  */
//function getUrlParameterForKey(url, requestedParam) {
//    requestedParam = requestedParam.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
//    var regexS = "[\\?&]" + requestedParam + "=([^&#]*)";
//    var regex = new RegExp(regexS);
//    var results = regex.exec(url);
//    if (results == null)
//        return "";
//    else
//    {
//        var result = decodeURIComponent(results[1]);
//        return result;
//    }
//}
// Local variables
var phoneGapInterop = new PhoneGap.PhoneGapInterop();
