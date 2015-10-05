/**
    Controller modules
    @namespace App.Controllers
*/
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var SettingsController = (function () {
            /**
              Settings
              @class App.Controllers.SettingsController
              @classdesc Settings
            */
            function SettingsController() {
                this.adminOpenCounter = 0;
            }
            /**
                PreInit
                @method App.Controllers.SettingsController#PreInit
                @public
            */
            SettingsController.prototype.PreInit = function () {
                log.debug("SettingsController", "PreInit()");
                viewController.addSelectEvent(this.onViewChanged);
                startup.finishedPreInit("SettingsController");
            };
            /**
                PreInit
                @method App.Controllers.SettingsController#Init
                @public
            */
            SettingsController.prototype.postInit = function () {
                var _this = this;
                log.debug("SettingsController", "postInit()");
                // Save button
                $("#settingsButtonSave").mousedown(function () {
                    settings.save();
                    userPopupController.sendSuccess(tr.translate('SETTINGS'), tr.translate('SETTINGS_SAVED'));
                    viewController.goBack();
                    return false;
                });
                // Open admin if logo clicked 10 times
                $("#logoFrame").mousedown(function () {
                    _this.adminOpenCounter++;
                    if (_this.adminOpenCounter == 10) {
                        $("#adminSettingsDiv").show();
                        $("#mainPopupMenuButtonDebug").show();
                        viewController.selectView("settingsView");
                    }
                });
                // Reset if view changes
                viewController.addSelectEvent(function (event, oldView, newView) {
                    if (oldView && newView && oldView.name != newView.name)
                        _this.adminOpenCounter = 0;
                });
            };
            SettingsController.prototype.onViewChanged = function (event, oldView, newView) {
                if (newView && newView.name == "settingsView") {
                }
            };
            SettingsController.prototype.updateDropDowns = function () {
                var _this = this;
            };
            return SettingsController;
        })();
        Controllers.SettingsController = SettingsController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var settingsController = new App.Controllers.SettingsController();
startup.addPreInit(function () { settingsController.PreInit(); }, "SettingsController");
startup.addPostInit(function () { settingsController.postInit(); }, "SettingsController");
