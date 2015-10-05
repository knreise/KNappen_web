


/**
    Model modules
    @namespace App.Models
*/
module App.Models {

    //export interface KnockoutObservablePointOfInterestArray extends KnockoutObservableArray {
    //    (): App.Models.PointOfInterest[];
    //    (value: App.Models.PointOfInterest[]): void;

    //    subscribe(callback: (newValue: App.Models.PointOfInterest[]) => void , target?: any, topic?: string): KnockoutSubscription;
    //    notifySubscribers(valueToWrite: App.Models.PointOfInterest[], topic?: string);
    //}

    export class PointOfInterest extends System.Models.PointOfInterestBase {

        constructor() {
            super();
            this.tryLicenseAsLink();
        }

        public name: KnockoutObservable<string> = ko.observable("");
        public description: KnockoutObservable<string> = ko.observable("");
        public link: KnockoutObservable<string> = ko.observable("");
        public thumbnail: KnockoutObservable<string> = ko.observable("");
        public year: KnockoutObservable<string> = ko.observable("");
        public landingPage: KnockoutObservable<string> = ko.observable("");
        public license: KnockoutObservable<string> = ko.observable("");
        public licenseLink: KnockoutObservable<string> = ko.observable("");
        public categories: KnockoutObservableArray<string> = ko.observableArray([]);
        public topics: KnockoutObservable<string> = ko.observable("");
        public ingress: KnockoutObservable<string> = ko.observable("");
        public body: KnockoutObservable<string> = ko.observable("");
        public creator: KnockoutObservable<string> = ko.observable("");
        public institution: KnockoutObservable<string> = ko.observable("");
        public owner: KnockoutObservable<string> = ko.observable("");
        public tags: KnockoutObservable<string> = ko.observable("");
        public references: KnockoutObservable<string> = ko.observable("");
        public mediaTypes: KnockoutObservableArray<string> = ko.observableArray([]);
        public soundUri: KnockoutObservableArray<string> = ko.observableArray([]);
        public videoUri: KnockoutObservableArray<string> = ko.observableArray([]);
        public originalVersion: KnockoutObservable<string> = ko.observable("");
        public lazyLoad: (poi: App.Models.PointOfInterest, data: string, lazyLoadHandle: App.Providers.LazyLoadHandle) => void;
        public lazyLoadData: string;
        private loaded: boolean = false;

        public updateIcons(): void {

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
        }

        public getHashCode(): string {

            // Create a string with enough info to uniquely identify this POI
            var str: string =
                this.source()
                    + "|" + this.name()
                    + "|" + this.description()
                    + "|" + this.link()
                    + "|" + this.ingress()
                    + "|" + this.body();
                
            // Return the hash
            return stringUtils.hash(str).toString();
        }

        public toRouteFriendly(): PointOfInterest {
            var r = new App.Models.PointOfInterest();
            $.extend(r, this);
            r.distanceInKm = ko.observable("");
            r.iconCategoryURL = ko.observable(this.iconInactiveCategoryURL());

            return r;
        }

        public ensureLoaded(lazyLoadHandle: App.Providers.LazyLoadHandle) {
            if (!this.loaded && this.lazyLoad) {
                this.lazyLoad(this, this.lazyLoadData, lazyLoadHandle);
                this.loaded = true;
            }
        }

        public GetFormatedIngress(): string {

            var ingressText = this.ingress() != "" ? this.ingress() :
                this.description() ? (this.description().toString().length > 40 ? this.description().toString().substring(0, 39) + "..." : this.description()) : "Se detaljer";
            return ingressText;
        }

        private tryLicenseAsLink(): void {
            this.license.subscribe((license: any) => {
                if (license instanceof Array) // license might be an array or a string.
                    license = license[0];

                if (license && license.indexOf("http://") !== -1) {
                    this.licenseLink(license);
                    this.license(""); // Empty value to avoid rendering the field.
                }
            });
        }
    }
} 