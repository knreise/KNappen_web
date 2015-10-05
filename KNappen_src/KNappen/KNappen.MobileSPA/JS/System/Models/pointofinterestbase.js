/// <reference path="../_references.ts" />
/**
    Models
    @namespace System.Models
*/
var System;
(function (System) {
    var Models;
    (function (Models) {
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
        var PointOfInterestBase = (function () {
            /**
                PointOfInterestBase
                @class System.Models.PointOfInterestBase
                @classdesc The base object for PointOfInterest, contains basic properties like default icon urls and other default values
            */
            function PointOfInterestBase() {
                /**
                    id
                    @member System.Models.PointOfInterestBase#id
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.id = ko.observable();
                /**
                    pos
                    @member System.Models.PointOfInterestBase#pos
                    @public
                    @type {KnockoutObservable<System.Models.Position>}
                */
                this.pos = ko.observable();
                /**
                    iconURL
                    @member System.Models.PointOfInterestBase#iconURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconURL = ko.observable("Content/images/AppIcons/defaultPoiIcon.png");
                /**
                    iconMediaTypeURL
                    @member System.Models.PointOfInterestBase#iconMediaTypeURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconMediaTypeURL = ko.observableArray([]);
                /**
                    iconCategoryURL
                    @member System.Models.PointOfInterestBase#iconCategoryURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconCategoryURL = ko.observable("Content/images/Categories/defaultCategory.png");
                /**
                    iconInactiveCategoryURL
                    @member System.Models.PointOfInterestBase#iconInactiveCategoryURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconInactiveCategoryURL = ko.observable("Content/images/Categories/defaultCategory.png");
                /**
                    iconActiveCategoryURL
                    @member System.Models.PointOfInterestBase#iconActiveCategoryURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconActiveCategoryURL = ko.observable("Content/images/Categories/defaultCategory.png.Active.png");
                /**
                    iconGenreURL
                    @member System.Models.PointOfInterestBase#iconGenreURL
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.iconGenreURL = ko.observable("Content/images/AppIcons/defaultPoiIcon.png");
                /**
                    iconWidth
                    @member System.Models.PointOfInterestBase#iconWidth
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.iconWidth = ko.observable(40);
                /**
                    iconHeight
                    @member System.Models.PointOfInterestBase#iconHeight
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.iconHeight = ko.observable(40);
                /**
                    source
                    @member System.Models.PointOfInterestBase#source
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.source = ko.observable('');
                /**
                    sourceType
                    @member System.Models.PointOfInterestBase#sourceType
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.sourceType = ko.observable('');
                /**
                    distanceInKm
                    @member System.Models.PointOfInterestBase#distanceInKm
                    @public
                    @type {KnockoutObservable<string>}
                */
                this.distanceInKm = ko.observable('-');
                /**
                    distance
                    @member System.Models.PointOfInterestBase#distance
                    @public
                    @type {KnockoutObservable<number>}
                */
                this.distance = ko.observable(0);
            }
            return PointOfInterestBase;
        })();
        Models.PointOfInterestBase = PointOfInterestBase;
    })(Models = System.Models || (System.Models = {}));
})(System || (System = {}));
