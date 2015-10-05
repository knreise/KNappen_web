/**
    Model modules
    @namespace App.Models
*/
var App;
(function (App) {
    var Models;
    (function (Models) {
        var SearchResult = (function () {
            /**
                SearchResult
                @class App.Models.SearchResult
                @classdesc This class the contains an Observable array of Points of Interest as a result from a search
            */
            function SearchResult() {
                /**
                    Number of rows found
                    @member App.Models.SearchResult#numFound
                    @public
                    @type {KnocoutObservableNumber}
                */
                this.numFound = ko.observable(0);
                /**
                    Number of total pages
                    @member App.Models.SearchResult#numFound
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.numPages = ko.observable(0);
                /**
                    Observable array of Points of Interest
                    @member App.Models.SearchResult#items
                    @public
                    @type {KnocoutObservablePointOfInterestArray}
                */
                this.items = ko.observableArray();
            }
            return SearchResult;
        })();
        Models.SearchResult = SearchResult;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
