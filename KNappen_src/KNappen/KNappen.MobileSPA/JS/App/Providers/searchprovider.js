/**
    Providers
    @namespace App.Providers
*/
var App;
(function (App) {
    var Providers;
    (function (Providers) {
        var LazyLoadHandle = (function () {
            function LazyLoadHandle(successCallback) {
                this.lazyLoadCount = 0;
                this.successCallback = successCallback;
            }
            LazyLoadHandle.prototype.isLoading = function () {
                return this.lazyLoadCount > 0;
            };
            LazyLoadHandle.prototype.lazyLoadStarted = function () {
                this.lazyLoadCount++;
            };
            LazyLoadHandle.prototype.lazyLoadComplete = function () {
                this.lazyLoadCount--;
                if (this.lazyLoadCount == 0) {
                    this.successCallback();
                }
            };
            return LazyLoadHandle;
        })();
        Providers.LazyLoadHandle = LazyLoadHandle;
        var SearchHandle = (function () {
            function SearchHandle() {
                this.haltet = false;
                this.searchCount = 0;
                this.searchStatus = {};
            }
            return SearchHandle;
        })();
        Providers.SearchHandle = SearchHandle;
        var PoiChooser = (function () {
            function PoiChooser() {
                this.poi = null;
            }
            return PoiChooser;
        })();
        Providers.PoiChooser = PoiChooser;
        var SearchProvider = (function () {
            /**
                SearchProvider
                @class App.Providers.SearchProvider
                @classdesc
            */
            function SearchProvider(searchCriteria, successCallback) {
                var _this = this;
                this.searchNorvegiana = true;
                this.searchDigitalArkivet = true;
                this.successCallback = null;
                this.currentSearch = null;
                this.resultCount = -1;
                this.results = new Array();
                this.pageNumber = 1;
                this.pageSize = searchCriteria.rows();
                this.successCallback = successCallback;
                var norvegianaQueryFields = null;
                if (searchCriteria.category() && searchCriteria.category().length > 0 && searchCriteria.category() != "*") {
                    var category = searchCriteria.category();
                    if (category == config.digitalArkivetPropertyCategory) {
                        this.searchNorvegiana = false;
                    }
                    else {
                        this.searchDigitalArkivet = false;
                    }
                }
                if (searchCriteria.mediaType() && searchCriteria.mediaType().length > 0 && searchCriteria.mediaType() != "*") {
                    var mediaType = searchCriteria.mediaType();
                    if (mediaType != "TEXT") {
                        this.searchDigitalArkivet = false;
                    }
                }
                if (searchCriteria.genre() && searchCriteria.genre().length > 0 && searchCriteria.genre() != "*") {
                    var genre = searchCriteria.genre();
                    if (genre == "digitaltfortalt") {
                        this.searchDigitalArkivet = false;
                        norvegianaQueryFields = 'abm_contentProvider_text:"Digitalt fortalt"'
                            + ' OR abm_contentProvider_text:Industrimuseum';
                    }
                    else if (genre == "fagdata") {
                        norvegianaQueryFields = 'abm_contentProvider_text:Artsdatabanken'
                            + ' OR abm_contentProvider_text:DigitaltMuseum'
                            + ' OR abm_contentProvider_text:Kulturminnesøk'
                            + ' OR abm_contentProvider_text:MUSIT'
                            + ' OR abm_contentProvider_text:Naturbase'
                            + ' OR abm_contentProvider_text:"Sentralt stedsnavnregister"';
                    }
                }
                if (this.searchNorvegiana) {
                    this.searchProviderNorvegiana = new App.SearchProviders.DataSourceNorvegiana(searchCriteria, norvegianaQueryFields, function (searchHandle) { return _this.searchWithSuccess(SearchProvider.SourceNorvegiana, searchHandle); }, function (errorMessage, searchHandle) { return _this.searchWithError(SearchProvider.SourceNorvegiana, errorMessage, searchHandle); });
                }
                if (this.searchDigitalArkivet) {
                    this.searchProviderDigitalarkivet = new App.SearchProviders.DataSourceDigitalarkivetProperty(searchCriteria, function (searchHandle) { return _this.searchWithSuccess(SearchProvider.SourceDigitalArkivet, searchHandle); }, function (errorMessage, searchHandle) { return _this.searchWithError(SearchProvider.SourceDigitalArkivet, errorMessage, searchHandle); });
                }
            }
            SearchProvider.prototype.haltSearch = function () {
                if (this.currentSearch != null) {
                    this.currentSearch.haltet = true;
                }
            };
            SearchProvider.prototype.search = function (pageNumber) {
                var _this = this;
                var searchHandle = new SearchHandle();
                this.pageNumber = pageNumber;
                this.currentSearch = searchHandle;
                log.debug("SearchProvider", "Searching...");
                if (this.searchNorvegiana) {
                    searchHandle.searchStatus[SearchProvider.SourceNorvegiana] = true;
                    if (this.searchProviderNorvegiana.search(searchHandle)) {
                        searchHandle.searchCount++;
                    }
                }
                if (this.searchDigitalArkivet) {
                    searchHandle.searchStatus[SearchProvider.SourceDigitalArkivet] = true;
                    if (this.searchProviderDigitalarkivet.search(searchHandle)) {
                        searchHandle.searchCount++;
                    }
                }
                if (searchHandle.searchCount > 0) {
                    setTimeout(function () { return _this.checkTimeout(searchHandle); }, config.searchTimeoutSeconds * 1000);
                }
                else {
                    this.prepareSearchResult();
                }
            };
            SearchProvider.prototype.prepareSearchResult = function () {
                this.haltSearch();
                if (this.resultCount == -1) {
                    this.resultCount = 0;
                    if (this.searchNorvegiana)
                        this.resultCount += this.searchProviderNorvegiana.getResultCount();
                    if (this.searchDigitalArkivet)
                        this.resultCount += this.searchProviderDigitalarkivet.getResultCount();
                }
                var start = this.pageSize * (this.pageNumber - 1);
                var end = Math.min(start + this.pageSize, this.resultCount);
                while (this.results.length < end) {
                    var poiChooser = new PoiChooser();
                    if (this.searchNorvegiana)
                        this.searchProviderNorvegiana.getNextPoi(poiChooser);
                    if (this.searchDigitalArkivet)
                        this.searchProviderDigitalarkivet.getNextPoi(poiChooser);
                    poiChooser.choose();
                    this.results.push(poiChooser.poi);
                }
                var pageItems = this.results.slice(start, end);
                var searchResult = new App.Models.SearchResult();
                searchResult.items(pageItems);
                searchResult.numFound(this.resultCount);
                searchResult.numPages(Math.ceil(this.resultCount / this.pageSize));
                this.ensureLoadedResultSetAndSignalSuccess(searchResult);
            };
            SearchProvider.prototype.ensureLoadedResultSetAndSignalSuccess = function (searchResult) {
                var _this = this;
                var items = searchResult.items();
                var lazyLoadHandle = new LazyLoadHandle(function () { return _this.successCallback(searchResult); });
                for (var index in items) {
                    items[index].ensureLoaded(lazyLoadHandle);
                }
                if (!lazyLoadHandle.isLoading()) {
                    this.successCallback(searchResult);
                }
            };
            SearchProvider.prototype.searchWithSuccess = function (searchProviderName, searchHandle) {
                log.debug("SearchProvider", "successCallback - " + searchProviderName);
                if (searchHandle == null || searchHandle.haltet) {
                    return;
                }
                searchHandle.searchStatus[searchProviderName] = false;
                searchHandle.searchCount--;
                if (searchHandle.searchCount == 0) {
                    this.prepareSearchResult();
                }
            };
            SearchProvider.prototype.searchWithError = function (searchProviderName, errorMessage, searchHandle) {
                log.error("SearchProvider", "errorCallback - " + searchProviderName + " - " + errorMessage);
                if (searchHandle == null || searchHandle.haltet) {
                    return;
                }
                searchHandle.searchCount--;
                if (!networkHelper.isConnected()) {
                    networkHelper.displayNetworkError();
                    return;
                }
                if (errorMessage != "Not Found") {
                    userPopupController.sendError(tr.translate("Error searching"), tr.translate("Error searching") + " (" + searchProviderName + ")");
                }
                if (searchHandle.searchCount == 0) {
                    this.prepareSearchResult();
                }
            };
            SearchProvider.prototype.checkTimeout = function (searchHandle) {
                if (searchHandle == null || searchHandle.haltet) {
                    return;
                }
                var errorSourceString = "";
                for (var source in searchHandle.searchStatus) {
                    if (searchHandle.searchStatus[source]) {
                        errorSourceString += (errorSourceString == "" ? "" : ", ");
                        errorSourceString += source;
                    }
                }
                log.error("Timeout", "Timeout while searching all datasources: Halting search.");
                userPopupController.sendError(tr.translate("Search"), tr.translate("Some sources did not return content in time", [errorSourceString]));
                this.prepareSearchResult();
            };
            SearchProvider.SourceDigitalArkivet = "Digitalarkivet";
            SearchProvider.SourceNorvegiana = "Norvegiana";
            return SearchProvider;
        })();
        Providers.SearchProvider = SearchProvider;
    })(Providers = App.Providers || (App.Providers = {}));
})(App || (App = {}));
