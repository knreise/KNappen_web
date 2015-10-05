/// <reference path="../_References.ts" />
var PhoneGap;
(function (PhoneGap) {
    var InteropProviders;
    (function (InteropProviders) {
        var ButtonProvider = (function () {
            function ButtonProvider() {
            }
            ButtonProvider.prototype.load = function () {
                var _this = this;
                document.addEventListener("backbutton", _this.onBackButton, false);
                document.addEventListener("menubutton", _this.onMenuButton, false);
                startup.finishedLoad("ButtonProvider");
            };
            ButtonProvider.prototype.onBackButton = function () {
                log.info("PhoneGapButtonProvider", "Back button pressed.");
                //phoneGapProvider.callbackBackButton();
            };
            ButtonProvider.prototype.onMenuButton = function () {
                log.info("PhoneGapButtonProvider", "Menu button pressed.");
                //phoneGapProvider.callbackMenuButton();
            };
            return ButtonProvider;
        })();
        InteropProviders.ButtonProvider = ButtonProvider;
    })(InteropProviders = PhoneGap.InteropProviders || (PhoneGap.InteropProviders = {}));
})(PhoneGap || (PhoneGap = {}));
var buttonProvider = new PhoneGap.InteropProviders.ButtonProvider();
startup.addLoad(function () { buttonProvider.load(); }, "ButtonProvider");
