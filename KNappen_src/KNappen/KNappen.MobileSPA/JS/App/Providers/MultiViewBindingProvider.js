/**
    Providers
    @namespace App.Providers
*/
var App;
(function (App) {
    var Providers;
    (function (Providers) {
        var MultiViewBindingProvider = (function () {
            /**
                MultiViewBindingProvider
                @class App.Providers.MultiViewBindingProvider
                @classdesc Combines knockout objects for binding multiple KO objects
            */
            function MultiViewBindingProvider() {
                this.searchCriteria = ko.observable();
                this.searchResult = ko.observable();
                this.settings = ko.observable();
            }
            /**
                PostInit
                @method App.Providers.MultiViewBindingProvider#PostInit
                @public
            */
            MultiViewBindingProvider.prototype.PostInit = function () {
                log.debug("MultiViewBindingProvider", "PostInit()");
                this.RefreshBindings();
                // this.refresh();
                // Sign up to autobind search result
                var _this = this;
                searchController.addSearchResultCallback(function (event, searchResult, inRoute) {
                    _this.searchResult(searchResult);
                });
            };
            MultiViewBindingProvider.prototype.RefreshBindings = function () {
                // Grab some objects that are ready already
                this.searchCriteria(searchController.searchCriteria);
                this.settings(settings);
                // Databind settings object         
                ko.applyBindings(multiViewBindingProvider);
            };
            return MultiViewBindingProvider;
        })();
        Providers.MultiViewBindingProvider = MultiViewBindingProvider;
    })(Providers = App.Providers || (App.Providers = {}));
})(App || (App = {}));
var multiViewBindingProvider = new App.Providers.MultiViewBindingProvider();
startup.addPostInit(function () { multiViewBindingProvider.PostInit(); }, "MultiViewBindingProvider");
