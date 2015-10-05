



/**
    Model modules
    @namespace App.Models
*/
module App.Models
{

    export class SearchCriteria
    {
        /**
            SearchCriteria
            @class App.Models.SearchCriteria
            @classdesc This class contains items used to assemble the search query for Norvegiana. For example free text search and what fields to sort by.
        */
        constructor() {
        }

        /**
            Query
            @member App.Models.SearchCriteria#query
            @public
            @type {KnockoutObservable<string>}
        */
        public query: KnockoutObservable<string> = ko.observable(null);
        /**
            The user's position
            @member App.Models.SearchCriteria#pos
            @public
            @type {KnockoutObservable<System.Models.Position>}
        */
        public pos: KnockoutObservable<System.Models.Position> = <any>ko.observable();
        /** 
            Radius for the search around the user's position, 1 kilometer by default
            @member App.Models.SearchCriteria#radius
            @public
            @type {KnockoutObservable<number>}
        */
        public radius: KnockoutObservable<number> = ko.observable(10);
        /**
            Amount of rows fetched during search
            @member App.Models.SearchCriteria#rows
            @public
            @type {KnockoutObservable<number>}
        */
        public rows: KnockoutObservable<number> = ko.observable(20);
        /**
            Page number for this search
            @member App.Models.SearchCriteria#pageNumber
            @public
            @type {KnockoutObservable<number>}
        */
        public pageNumber: KnockoutObservable<number> = ko.observable(1);
        /**
            Category
            @member App.Models.SearchCriteria#category
            @public
            @type {KnockoutObservable<string>}
        */
        public category: KnockoutObservable<string> = ko.observable("*");

        /**
            Genre
            @member App.Models.SearchCriteria#category
            @public
            @type {KnockoutObservable<string>}
        */
        public genre: KnockoutObservable<string> = ko.observable("*");

        /**
            MediaType
            @member App.Models.SearchCriteria#MediaType
            @public
            @type {KnockoutObservable<string>}
        */
        public mediaType: KnockoutObservable<string> = ko.observable("*");

        /**
            TODO
            @member App.Models.SearchCriteria#sort
            @public
            @type {App.Models.SearchCriteriaSortingEnum}
        */
        public sort: App.Models.SearchCriteriaSortingEnum = App.Models.SearchCriteriaSortingEnum.Distance;
    }

}