var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
    Model modules
    @namespace App.Models
*/
var App;
(function (App) {
    var Models;
    (function (Models) {
        //export interface KnockoutObservablePointOfInterestArray extends KnockoutObservableArray {
        //    (): App.Models.PointOfInterest[];
        //    (value: App.Models.PointOfInterest[]): void;
        //    subscribe(callback: (newValue: App.Models.PointOfInterest[]) => void , target?: any, topic?: string): KnockoutSubscription;
        //    notifySubscribers(valueToWrite: App.Models.PointOfInterest[], topic?: string);
        //}
        var PointOfInterest = (function (_super) {
            __extends(PointOfInterest, _super);
            function PointOfInterest() {
                _super.call(this);
                this.name = ko.observable("");
                this.description = ko.observable("");
                this.link = ko.observable("");
                this.thumbnail = ko.observable("");
                this.year = ko.observable("");
                this.landingPage = ko.observable("");
                this.license = ko.observable("");
                this.licenseLink = ko.observable("");
                this.categories = ko.observableArray([]);
                this.topics = ko.observable("");
                this.ingress = ko.observable("");
                this.body = ko.observable("");
                this.creator = ko.observable("");
                this.institution = ko.observable("");
                this.owner = ko.observable("");
                this.tags = ko.observable("");
                this.references = ko.observable("");
                this.mediaTypes = ko.observableArray([]);
                this.soundUri = ko.observableArray([]);
                this.videoUri = ko.observableArray([]);
                this.originalVersion = ko.observable("");
                this.loaded = false;
                this.tryLicenseAsLink();
            }
            PointOfInterest.prototype.updateIcons = function () {
                // Set icon to the genre if any, if not use default poi icon
                var iconGenreStr = this.iconGenreURL();
                var genre = pointOfInterestTypeProvider.getGenre(this);
                if (genre)
                    iconGenreStr = genre.icon || this.iconGenreURL();
                this.iconGenreURL(iconGenreStr);
                // Set icon to the category if any
                var iconCategoryStr = this.iconCategoryURL();
                var category = pointOfInterestTypeProvider.getCategory(this);
                if (category)
                    iconCategoryStr = category.icon || this.iconCategoryURL();
                // Set POI icons
                this.iconCategoryURL(iconCategoryStr);
                this.iconInactiveCategoryURL(iconCategoryStr);
                this.iconActiveCategoryURL(iconCategoryStr + ".active.png");
                // Set icon(s?) to the mediatypes if any
                var iconMediaTypeStr = this.iconMediaTypeURL();
                var mediaTypes = pointOfInterestTypeProvider.getMediaType(this);
                for (var i in mediaTypes) {
                    this.iconMediaTypeURL().push(mediaTypes[i].icon);
                }
            };
            PointOfInterest.prototype.getHashCode = function () {
                // Create a string with enough info to uniquely identify this POI
                var str = this.source()
                    + "|" + this.name()
                    + "|" + this.description()
                    + "|" + this.link()
                    + "|" + this.ingress()
                    + "|" + this.body();
                // Return the hash
                return stringUtils.hash(str).toString();
            };
            PointOfInterest.prototype.toRouteFriendly = function () {
                var r = new App.Models.PointOfInterest();
                $.extend(r, this);
                r.distanceInKm = ko.observable("");
                r.iconCategoryURL = ko.observable(this.iconInactiveCategoryURL());
                return r;
            };
            PointOfInterest.prototype.ensureLoaded = function (lazyLoadHandle) {
                if (!this.loaded && this.lazyLoad) {
                    this.lazyLoad(this, this.lazyLoadData, lazyLoadHandle);
                    this.loaded = true;
                }
            };
            PointOfInterest.prototype.GetFormatedIngress = function () {
                var ingressText = this.ingress() != "" ? this.ingress() :
                    this.description() ? (this.description().toString().length > 40 ? this.description().toString().substring(0, 39) + "..." : this.description()) : "Se detaljer";
                return ingressText;
            };
            PointOfInterest.prototype.tryLicenseAsLink = function () {
                var _this = this;
                this.license.subscribe(function (license) {
                    if (license instanceof Array)
                        license = license[0];
                    if (license && license.indexOf("http://") !== -1) {
                        _this.licenseLink(license);
                        _this.license(""); // Empty value to avoid rendering the field.
                    }
                });
            };
            return PointOfInterest;
        })(System.Models.PointOfInterestBase);
        Models.PointOfInterest = PointOfInterest;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
