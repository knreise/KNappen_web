/**
    System modules
    @namespace System
*/
var System;
(function (System) {
    //declare var log: Log;
    /**
     * Provide startup events so modules can correctly sequence dependencies during startup.
     * @class
     */
    var Startup = (function () {
        /**
         * Startup
         * @class System.Startup
         * @classdesc Add event handler to PostInit event.
         */
        function Startup() {
            this.autoStartup = true;
            this.loadModulesCount = 0;
            this.preInitModulesCount = 0;
            this.eventHooks = $(this);
        }
        // Methods to hook up to events
        /**
          * Add event handler to Load event. (Run before all others)
          * @method System.Startup#addLoad
          * @param eventCallback Callback function with empty signature.
          * @param {string} [moduleName] Optional name of module (for error logging if exception).
          */
        Startup.prototype.addLoad = function (eventCallback, moduleName) {
            this.addEventHandler('Load', eventCallback, moduleName);
            this.loadModulesCount++;
        };
        /**
          * Add event handler to PreInit event.
          * @method System.Startup#addPreInit
          * @param eventCallback Callback function with empty signature.
          * @param {string} [moduleName] Optional name of module (for error logging if exception).
          */
        Startup.prototype.addPreInit = function (eventCallback, moduleName) {
            this.addEventHandler('PreInit', eventCallback, moduleName);
            this.preInitModulesCount++;
        };
        /**
          * Add event handler to Init event.
          * @method System.Startup#addInit
          * @param eventCallback Callback function with empty signature.
          * @param {string} [moduleName] Optional name of module (for error logging if exception).
          */
        Startup.prototype.addInit = function (eventCallback, moduleName) {
            this.addEventHandler('Init', eventCallback, moduleName);
        };
        /**
          * Add event handler to PostInit event.
          * @method System.Startup#addPostInit
          * @param eventCallback Callback function with empty signature.
          * @param {string} [moduleName] Optional name of module (for error logging if exception).
          */
        Startup.prototype.addPostInit = function (eventCallback, moduleName) {
            this.addEventHandler('PostInit', eventCallback, moduleName);
        };
        /**
          * Add event handler to StartupDone event. (executed last)
          * @method System.Startup#addDone
          * @param eventCallback Callback function with empty signature.
          * @param {string} [moduleName] Optional name of module (for error logging if exception).
          */
        Startup.prototype.addStartupDone = function (eventCallback, moduleName) {
            this.addEventHandler('StartupDone', eventCallback, moduleName);
        };
        /** @ignore */
        Startup.prototype.addEventHandler = function (eventName, eventCallback, moduleName) {
            log.debug("Startup", "Event hookup to " + eventName + ": " + moduleName);
            this.eventHooks.on(eventName, function () {
                try {
                    eventCallback();
                }
                catch (error) {
                    var exception = error;
                    log.error("Startup", "[" + eventName + "] Exception in event handler: ModuleName: " + (moduleName || "unknown") + ": " + exception);
                }
            });
        };
        Startup.prototype.finishedLoad = function (moduleName) {
            this.loadModulesCount--;
            log.debug("Startup", "Module '" + moduleName + "' finished loading, currently " + this.loadModulesCount + " loading modules");
            //debugger;
            if (this.loadModulesCount == 0) {
                this.continueWithLoad();
            }
        };
        Startup.prototype.finishedPreInit = function (moduleName) {
            this.preInitModulesCount--;
            log.debug("Startup", "Module '" + moduleName + "' finished pre-init, currently " + this.preInitModulesCount + " pre-init modules");
            if (this.preInitModulesCount == 0) {
                this.continueWithPreInit();
            }
        };
        /**
          * Timeout waiting for Load to complete so we can continue with PreInit, Init and PostInit.
          * @method System.Startup#waitForLoadContinue
          */
        Startup.prototype.continueWithLoad = function () {
            var _this = this;
            log.debug("Startup", "Load finished, proceeding with startup procedure.");
            log.debug("Startup", "PreInit(): Start");
            setTimeout(function () { return _this.eventHooks.trigger("PreInit"); }, 10);
            log.debug("Startup", "PreInit(): Done");
        };
        Startup.prototype.continueWithPreInit = function () {
            log.debug("Startup", "PreInit finished, proceeding with startup procedure.");
            var self = this;
            setTimeout(function () {
                log.debug("Startup", "Init(): Start");
                self.eventHooks.trigger('Init');
                setTimeout(function () {
                    log.debug("Startup", "Init(): Done");
                    log.debug("Startup", "PostInit(): Start");
                    self.eventHooks.trigger('PostInit');
                    loadingScreenController.hideLoadingScreen();
                    setTimeout(function () {
                        log.debug("Startup", "PostInit(): Done");
                        log.debug("Startup", "StartupDone(): Start");
                        self.eventHooks.trigger('StartupDone');
                    }, 10);
                }, 10);
            }, 10);
        };
        /**
          * Execute startup. Must only be done once by module itself!
          * @method System.Startup#executeStartup
          */
        Startup.prototype.executeStartup = function () {
            var _this = this;
            setTimeout(function () {
                loadingScreenController.showLoadingScreen("");
                log.debug("Startup", "Loading modules... " + _this.loadModulesCount + " modules to load.");
                _this.eventHooks.trigger('Load');
            });
        };
        return Startup;
    })();
    System.Startup = Startup;
})(System || (System = {}));
// Globally available to hook up to
var startup = new System.Startup();
// Execute when we are done loading
$(function () {
    if (startup.autoStartup) {
        startup.executeStartup();
    }
});
