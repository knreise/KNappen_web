/**
    Controller modules
    @namespace App.Controllers
*/
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var GoogleAnalyticsController = (function () {
            /**
                GoogleAnalyticsController
                @class App.Controllers.GoogleAnalyticsController
                @classdesc This class controls Google Analytics
            */
            function GoogleAnalyticsController() {
                /** @ignore **/ this.googleAnalyticsProvider = null;
            }
            /**
                Initialize properties
                @method App.Controllers.GoogleAnalyticsController#PreInit
                @public
            */
            GoogleAnalyticsController.prototype.PreInit = function () {
                this.googleAnalyticsProvider = new System.Providers.GoogleAnalyticsProvider();
                startup.finishedPreInit("GoogleAnalyticsController");
            };
            /**
                Adds an event to the ViewController to report page visits with Google Analytics when a new view is selected
                @method App.Controllers.GoogleAnalyticsController#Init
                @public
            */
            GoogleAnalyticsController.prototype.Init = function () {
                var _this = this;
                viewController.addSelectEvent(function (event, oldView, newView) {
                    _this.googleAnalyticsProvider.reportPageVisit(newView.name);
                });
            };
            return GoogleAnalyticsController;
        })();
        Controllers.GoogleAnalyticsController = GoogleAnalyticsController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var googleAnalyticsController = new App.Controllers.GoogleAnalyticsController();
startup.addPreInit(function () { googleAnalyticsController.PreInit(); }, "GoogleAnalyticsController");
startup.addInit(function () { googleAnalyticsController.Init(); }, "GoogleAnalyticsController");
