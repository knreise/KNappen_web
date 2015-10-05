



/**
    Model modules
    @namespace App.Models
*/
module App.Models
{

    export class SearchResult
    {
        /**
            SearchResult
            @class App.Models.SearchResult
            @classdesc This class the contains an Observable array of Points of Interest as a result from a search
        */
        constructor() {
        }

        /**
            Number of rows found
            @member App.Models.SearchResult#numFound
            @public
            @type {KnocoutObservableNumber}
        */
        public numFound: KnockoutObservable<number> = ko.observable(0);

        /**
            Number of total pages
            @member App.Models.SearchResult#numFound
            @public
            @type {KnockoutObservable<number>}
        */
        public numPages: KnockoutObservable<number> = ko.observable(0);

        /**
            Observable array of Points of Interest
            @member App.Models.SearchResult#items
            @public
            @type {KnocoutObservablePointOfInterestArray}
        */
        public items: KnockoutObservableArray<App.Models.PointOfInterest> = <KnockoutObservableArray<App.Models.PointOfInterest>>ko.observableArray();
    }


}