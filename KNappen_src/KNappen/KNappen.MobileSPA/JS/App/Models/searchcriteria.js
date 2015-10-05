/**
    Model modules
    @namespace App.Models
*/
var App;
(function (App) {
    var Models;
    (function (Models) {
        var SearchCriteria = (function () {
            /**
                SearchCriteria
                @class App.Models.SearchCriteria
                @classdesc This class contains items used to assemble the search query for Norvegiana. For example free text search and what fields to sort by.
            */
            function SearchCriteria() {
                /**
                    Query
                    @member App.Models.SearchCriteria#query
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.query = ko.observable(null);
                /**
                    The user's position
                    @member App.Models.SearchCriteria#pos
                    @public
                    @type {KnockoutObservable<System.Models.Position>}
                */
                this.pos = ko.observable();
                /**
                    Radius for the search around the user's position, 1 kilometer by default
                    @member App.Models.SearchCriteria#radius
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.radius = ko.observable(10);
                /**
                    Amount of rows fetched during search
                    @member App.Models.SearchCriteria#rows
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.rows = ko.observable(20);
                /**
                    Page number for this search
                    @member App.Models.SearchCriteria#pageNumber
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.pageNumber = ko.observable(1);
                /**
                    Category
                    @member App.Models.SearchCriteria#category
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.category = ko.observable("*");
                /**
                    Genre
                    @member App.Models.SearchCriteria#category
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.genre = ko.observable("*");
                /**
                    MediaType
                    @member App.Models.SearchCriteria#MediaType
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.mediaType = ko.observable("*");
                /**
                    TODO
                    @member App.Models.SearchCriteria#sort
                    @public
                    @type {App.Models.SearchCriteriaSortingEnum}
                */
                this.sort = App.Models.SearchCriteriaSortingEnum.Distance;
            }
            return SearchCriteria;
        })();
        Models.SearchCriteria = SearchCriteria;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
