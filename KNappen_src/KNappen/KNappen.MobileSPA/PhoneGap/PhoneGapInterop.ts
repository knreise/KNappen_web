/// <reference path="_References.ts" />

module PhoneGap {
    // Class
    export class PhoneGapInterop {
        public config = new System.ConfigBase();

        public onInteropCommand = new System.Utils.Event("onInteropCommand");
        public onDeviceReady = new System.Utils.Event("onDeviceReady");
        public onOnline = new System.Utils.Event("onOnline");
        public onOffline = new System.Utils.Event("onOffline");
        public onLoad = new System.Utils.Event("onLoad");
        public onResume = new System.Utils.Event("onResume");
        public onPause = new System.Utils.Event("onPause");

        constructor() {
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

        private bindEvents() {
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
        }

        public onExitApp() {
            log.info("PhoneGapInterop", "Application exiting...");
            (<any>navigator).app.exitApp();
        }
    }
}

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