/// <reference path="../_references.ts" />


/**
    Models
    @namespace System.Models
*/
module System.Models {

    //export interface KnockoutObservablePointOfInterestBaseArray extends KnockoutObservableArray {
    //    (): System.Models.PointOfInterestBase[];
    //    (value: System.Models.PointOfInterestBase[]): void;

    //    subscribe(callback: (newValue: System.Models.PointOfInterestBase[]) => void , target?: any, topic?: string): KnockoutSubscription;
    //    notifySubscribers(valueToWrite: System.Models.PointOfInterestBase[], topic?: string);
    //}

    /**
      * The base object for PointOfInterest, contain basic properties
      * @class
      */
    export class PointOfInterestBase {

        /**
            PointOfInterestBase
            @class System.Models.PointOfInterestBase
            @classdesc The base object for PointOfInterest, contains basic properties like default icon urls and other default values
        */
        constructor() {
        }
        /**
            id
            @member System.Models.PointOfInterestBase#id
            @public
            @type {KnockoutObservable<string>}
        */
        public id: KnockoutObservable<string> = <any>ko.observable();
        /**
            pos
            @member System.Models.PointOfInterestBase#pos
            @public
            @type {KnockoutObservable<System.Models.Position>}
        */
        public pos: KnockoutObservable<System.Models.Position> = <any>ko.observable();

        /**
            iconURL
            @member System.Models.PointOfInterestBase#iconURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconURL: KnockoutObservable<string> = ko.observable("Content/images/AppIcons/defaultPoiIcon.png");

        /**
            iconMediaTypeURL
            @member System.Models.PointOfInterestBase#iconMediaTypeURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconMediaTypeURL: KnockoutObservableArray<string> = ko.observableArray([]);

        /**
            iconCategoryURL
            @member System.Models.PointOfInterestBase#iconCategoryURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconCategoryURL: KnockoutObservable<string> = ko.observable("Content/images/Categories/defaultCategory.png");

        /**
            iconInactiveCategoryURL
            @member System.Models.PointOfInterestBase#iconInactiveCategoryURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconInactiveCategoryURL: KnockoutObservable<string> = ko.observable("Content/images/Categories/defaultCategory.png");

        /**
            iconActiveCategoryURL
            @member System.Models.PointOfInterestBase#iconActiveCategoryURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconActiveCategoryURL: KnockoutObservable<string> = ko.observable("Content/images/Categories/defaultCategory.png.Active.png");

        /**
            iconGenreURL
            @member System.Models.PointOfInterestBase#iconGenreURL
            @public
            @type {KnockoutObservable<string>}
        */
        public iconGenreURL: KnockoutObservable<string> = ko.observable("Content/images/AppIcons/defaultPoiIcon.png");
        /**
            iconWidth
            @member System.Models.PointOfInterestBase#iconWidth
            @public
            @type {KnockoutObservable<number>}
        */
        public iconWidth: KnockoutObservable<number> = ko.observable(40);
        /**
            iconHeight
            @member System.Models.PointOfInterestBase#iconHeight
            @public
            @type {KnockoutObservable<number>}
        */
        public iconHeight: KnockoutObservable<number> = ko.observable(40);
        /**
            source
            @member System.Models.PointOfInterestBase#source
            @public
            @type {KnockoutObservable<string>}
        */
        public source: KnockoutObservable<string> = ko.observable('');
        /**
            sourceType
            @member System.Models.PointOfInterestBase#sourceType
            @public
            @type {KnockoutObservable<string>}
        */
        public sourceType: KnockoutObservable<string> = ko.observable('');
        /**
            distanceInKm
            @member System.Models.PointOfInterestBase#distanceInKm
            @public
            @type {KnockoutObservable<string>}
        */
        public distanceInKm: KnockoutObservable<string> = ko.observable('-');
        /**
            distance
            @member System.Models.PointOfInterestBase#distance
            @public
            @type {KnockoutObservable<number>}
        */
        public distance: KnockoutObservable<number> = ko.observable(0);
    }
}