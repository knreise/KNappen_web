/**
    Controller modules
    @namespace App.Controllers
*/
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var SearchController = (function () {
            /**
                SearchController
                @class App.Controllers.SearchController
                @classdesc This class assembles and perform searches
            */
            function SearchController() {
                this.searchCriteria = new App.Models.SearchCriteria();
                this.latestSearchResult = null;
                this.searchProvider = null;
                this.firstSearch = true;
                this._event = $(this);
            }
            /**
                Used to hook up events for when a search is done, for example rendering a view with the new result
                @method App.Controllers.SearchController#addSearchResultCallback
                @public
            */
            SearchController.prototype.addSearchResultCallback = function (searchResultCallback) {
                this._event.on('SearchResult', searchResultCallback);
            };
            /**
                Adds a handler to the gpsProvider when the user's position changes, triggering a new search
                @method App.Controllers.SearchController#Init
                @public
            */
            SearchController.prototype.postInit = function () {
                var _this = this;
                log.debug("SearchController", "postInit()");
                var searchCriteria = this.searchCriteria;
                gpsProvider.addPositionChangedHandler(function (event, pos) {
                    if (_this.firstSearch) {
                        log.debug("SearchController", "Doing first search by users positions");
                        searchController.firstSearch = false;
                        searchCriteria.pos(pos);
                        searchController.doNewSearch();
                    }
                });
                this.searchCriteria.radius(settings.startSearchDistance());
                this.searchCriteria.rows(settings.startResultAmount());
                this.searchCriteria.category(settings.startSearchCategory());
            };
            /**
                Performs a new search, by resetting the page count, and adds the searchresult to searchResultCallback
                @method App.Controllers.SearchController#doNewSearch
                @public
            */
            SearchController.prototype.doNewSearch = function () {
                var _this = this;
                this.firstSearch = false;
                if (!this.searchCriteria.pos()) {
                    this.searchCriteria.pos(config.mapStartPos);
                }
                this.searchCriteria.pageNumber(1);
                // Create a new searchProvider, disable old if any
                if (this.searchProvider) {
                    this.searchProvider.haltSearch();
                }
                this.searchProvider = new App.Providers.SearchProvider(this.searchCriteria, function (searchResult) {
                    _this.searchResultCallback(_this, searchResult);
                });
                // Perform search
                if (networkHelper.isConnected()) {
                    loadingScreenController.showLoadingScreen("");
                    this.searchProvider.search(this.searchCriteria.pageNumber());
                }
                else {
                    networkHelper.displayNetworkError();
                }
                //debugger;
                historyController.addHistorySnapshot();
                //historyController.addToCurrentSnapshot({ SearchCriteria: this.searchCriteria });
            };
            SearchController.prototype.doHistorySearch = function () {
                var _this = this;
                this.firstSearch = false;
                if (!this.searchCriteria.pos()) {
                    this.searchCriteria.pos(config.mapStartPos);
                }
                // Create a new searchProvider, disable old if any
                if (this.searchProvider) {
                    this.searchProvider.haltSearch();
                }
                this.searchProvider = new App.Providers.SearchProvider(this.searchCriteria, function (searchResult) {
                    _this.searchResultCallback(_this, searchResult);
                });
                // Perform search
                if (networkHelper.isConnected()) {
                    loadingScreenController.showLoadingScreen("");
                    this.searchProvider.search(this.searchCriteria.pageNumber());
                }
                else {
                    networkHelper.displayNetworkError();
                }
            };
            /**
                Performs a new search and adds the searchresult to searchResultCallback
                @method App.Controllers.SearchController#doSearch
                @public
            */
            SearchController.prototype.doSearch = function () {
                var _this = this;
                this.firstSearch = false;
                loadingScreenController.showLoadingScreen("");
                historyController.addHistorySnapshot();
                //historyController.addToCurrentSnapshot({ SearchCriteria: this.searchCriteria });
                //if (!this.searchProvider)
                //    this.searchProvider = new App.Providers.SearchProvider(this.searchCriteria, (searchResult: App.Models.SearchResult) => {
                //        this.searchResultCallback(this, searchResult);
                //    });
                setTimeout(function () { return _this.searchProvider.search(_this.searchCriteria.pageNumber()); }, 25);
            };
            /**
                Trigger event for renderer listeners
                @method App.Controllers.SearchController#searchResultCallback
            */
            SearchController.prototype.searchResultCallback = function (that, searchResult, inRoute) {
                if (inRoute === void 0) { inRoute = false; }
                log.debug("SearchController", "Triggering callback events");
                that.latestSearchResult = searchResult;
                that._event.trigger('SearchResult', [searchResult, inRoute]);
                loadingScreenController.hideLoadingScreen();
            };
            return SearchController;
        })();
        Controllers.SearchController = SearchController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var searchController = new App.Controllers.SearchController();
startup.addPostInit(function () { searchController.postInit(); }, "SearchController");
