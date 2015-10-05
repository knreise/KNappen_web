var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var LoadingScreenController = (function () {
            function LoadingScreenController() {
                this.loader = null;
                this.loaderText = null;
            }
            LoadingScreenController.prototype.init = function () {
                //phoneGapInterop.onPause.addHandler(function () { loadingScreenController.hideLoadingScreen(); }, "LoadingScreenController");
            };
            LoadingScreenController.prototype.showLoadingScreen = function (text) {
                this.loader = $("#loader");
                this.loaderText = $("#loadTxt");
                this.loaderText.html(text);
                this.loader.addClass("active");
            };
            LoadingScreenController.prototype.hideLoadingScreen = function () {
                this.loader = $("#loader");
                this.loaderText = $("#loadTxt");
                this.loader.removeClass("active");
            };
            return LoadingScreenController;
        })();
        Controllers.LoadingScreenController = LoadingScreenController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var loadingScreenController = new App.Controllers.LoadingScreenController();
startup.addInit(function () { loadingScreenController.init(); }, "LoadingScreenController");
