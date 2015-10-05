/**
    Providers
    @namespace App.SearchProviders
*/
var App;
(function (App) {
    var SearchProviders;
    (function (SearchProviders) {
        var DataSource = (function () {
            function DataSource(pageSize, successCallback, errorCallback) {
                this.hasResultCount = false;
                this.resultCount = 0;
                this.results = new Array();
                this.pageSize = pageSize;
                this.successCallback = successCallback;
                this.errorCallback = errorCallback;
            }
            DataSource.prototype.addPoi = function (poi) {
                this.results.push(poi);
            };
            DataSource.prototype.searchNotNeeded = function (searchedPois) {
                return this.results.length >= this.pageSize || (this.hasResultCount && (searchedPois >= this.resultCount));
            };
            DataSource.prototype.setResultCount = function (resultCount) {
                if (!this.hasResultCount) {
                    this.resultCount = resultCount;
                    this.hasResultCount = true;
                }
            };
            DataSource.prototype.getResultCount = function () {
                return this.resultCount;
            };
            DataSource.prototype.getNextPoi = function (poiChooser) {
                var _this = this;
                if (this.results.length == 0) {
                    return;
                }
                var poi = this.results[0];
                var otherPoi = poiChooser.poi;
                if (otherPoi == null || poi.distance() < otherPoi.distance()) {
                    poiChooser.poi = poi;
                    poiChooser.choose = function () { return _this.results.shift(); };
                }
            };
            DataSource.prototype.raiseSuccess = function (searchHandle) {
                this.successCallback(searchHandle);
            };
            DataSource.prototype.raiseError = function (errorMessage, searchHandle) {
                this.errorCallback(errorMessage, searchHandle);
            };
            return DataSource;
        })();
        SearchProviders.DataSource = DataSource;
    })(SearchProviders = App.SearchProviders || (App.SearchProviders = {}));
})(App || (App = {}));
