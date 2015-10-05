/**
    Controller modules
    @namespace App.Controllers
*/
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var WindowSizeController = (function () {
            /**
                WindowSizeController
                @class App.Controllers.WindowSizeController
                @classdesc Screen layout size controller. One stop shop for controlling top, middle and bottom parts of screen. Programatic control of layout.
            */
            function WindowSizeController() {
            }
            WindowSizeController.prototype.Load = function () {
                this._window = $(window);
                this.headerSectionSize = $("#headerSectionSize");
                this.headerSection = $("#headerSection");
                this.mainSection = $("#mainSection");
                this.footerSection = $("#footerSection");
                this.map = $("#map");
                this.originalHeaderSectionHeight = this.headerSection.css('height');
                this.originalFooterSectionHeight = this.footerSection.css('height');
                this.footerSection.css('height', '0px');
                startup.finishedLoad("WindowSizeController");
            };
            WindowSizeController.prototype.PreInit = function () {
                var _this = this;
                jQuery(window).resize(function () { _this.resize(); });
                viewController.addPostSelectEvent(function (event, oldView, newView) {
                    _this.resize();
                });
                startup.finishedPreInit("WindowSizeController");
            };
            WindowSizeController.prototype.PostInit = function () {
                this.resize();
            };
            /**
                Main resize event, will resize content according to screen size and current state.
                @method App.Controllers.WindowSizeController#resize
                @public
            */
            WindowSizeController.prototype.resize = function () {
                var windowHeight = this._window.outerHeight();
                var headerHeight = this.headerSection.outerHeight();
                var footerHeight = this.footerSection.outerHeight();
                var mainHeight = windowHeight - headerHeight - footerHeight;
                this.headerSectionSize.outerHeight(headerHeight);
                this.mainSection.css('height', '100%');
                this.map.css('height', '100%');
                //this.mainSection.css('top', headerHeight);
                //this.map.css('top', headerHeight);
            };
            /**
                Toggle visibility of header section
                @method App.Controllers.WindowSizeController#ShowHeader
                @param {bool} visible Visibility
                @public
            */
            WindowSizeController.prototype.ShowHeader = function (visible) {
                log.debug("WindowSizeController", "showHeader: " + visible);
                if (visible) {
                    this.headerSection.show();
                    this.headerSection.css('height', this.originalHeaderSectionHeight);
                    this.headerSectionSize.css('height', this.originalHeaderSectionHeight);
                }
                else {
                    this.headerSection.css('height', '0px');
                    this.headerSectionSize.css('height', '0px');
                    this.headerSection.hide();
                }
                this.resize();
            };
            /**
                Toggle visibility of footer section
                @method App.Controllers.WindowSizeController#ShowFooter
                @param {bool} visible Visibility
                @public
            */
            WindowSizeController.prototype.ShowFooter = function (visible) {
                log.debug("WindowSizeController", "showFooter: " + visible);
                if (visible) {
                    this.footerSection.show();
                    this.footerSection.css('height', this.originalFooterSectionHeight);
                }
                else {
                    this.footerSection.css('height', '0px');
                    this.footerSection.hide();
                }
                this.resize();
            };
            /**
                Toggle visibility of whole page (usually used by augmented reality to hide page)
                @method App.Controllers.WindowSizeController#ShowPage
                @param {bool} visible Visibility
                @public
            */
            WindowSizeController.prototype.ShowPage = function (visible) {
                log.debug("WindowSizeController", "showPage: " + visible);
                if (visible) {
                    $("body").css('background-color', this.originalPageBGColor);
                    $("html").css('height', this.originalHTMLHeight);
                    $("body").css('height', this.originalBodyHeight);
                    this.mainSection.show();
                    this.ShowHeader(true);
                }
                else {
                    this.headerSection.css('height', '0px');
                    this.headerSectionSize.css('height', '0px');
                    this.ShowFooter(false);
                    this.mainSection.css('height', '0px');
                    this.mainSection.hide();
                    this.originalPageBGColor = $("body").css('background-color');
                    this.originalBodyHeight = $("body").css('height');
                    this.originalHTMLHeight = $("html").css('height');
                    $("body").css('background-color', 'transparent');
                    $("body").css('height', '0');
                    $("html").css('height', '0');
                }
            };
            /**
                Scroll to top left of page
                @method App.Controllers.WindowSizeController#scrollToTop
                @public
            */
            WindowSizeController.prototype.scrollToTop = function () {
                window.scrollTo(0, 0);
            };
            return WindowSizeController;
        })();
        Controllers.WindowSizeController = WindowSizeController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var windowSizeController = new App.Controllers.WindowSizeController();
startup.addLoad(function () { windowSizeController.Load(); }, "WindowSizeController");
startup.addPreInit(function () { windowSizeController.PreInit(); }, "WindowSizeController");
startup.addPostInit(function () { windowSizeController.PostInit(); }, "WindowSizeController");
