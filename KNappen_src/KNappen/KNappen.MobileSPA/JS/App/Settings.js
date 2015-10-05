var App;
(function (App) {
    /**
      * Application settings. User settings that will be saved/loaded to local storage.
      * @class
      */
    var Settings = (function () {
        function Settings() {
            //public startSearchCategory: KnockoutObservable<string> = ko.observable('*');
            this.startSearchCategory = ko.observable('*');
            this.startSearchDistance = ko.observable(1);
            this.startMapType = ko.observable('WMS:std0:norges_grunnkart');
            this.startMapZoomLevel = ko.observable(14);
            this.startResultAmount = ko.observable(100);
            this.startView = ko.observable('mapView');
            this.adminPassword = ko.observable('');
            this.disableCaching = ko.observable(true);
        }
        Settings.prototype.init = function () {
            log.debug("Settings", "init()");
            // Load settings if we have any
            this.load();
        };
        Settings.prototype.save = function () {
            eventProvider.settings.onPreSave.trigger();
            serializer.serializeKnockoutObjectToFile("Settings", this);
            eventProvider.settings.onPostSave.trigger();
        };
        Settings.prototype.load = function () {
            eventProvider.settings.onPreLoad.trigger();
            var ret = serializer.deserializeKnockoutObjectFromFile("Settings", this);
            this.setOverrides();
            eventProvider.settings.onPostLoad.trigger();
            return ret;
        };
        Settings.prototype.setOverrides = function () {
            if (!this.searchCategories) {
                this.searchCategories = ko.observableArray([
                    { "text": "Alle kategorier", "category": "*" },
                    { "text": "Arkeologi", "category": "Arkeologi" },
                    { "text": "Arkitektur", "category": "Arkitektur" },
                    { "text": "Dyr", "category": "Dyr" },
                    { "text": "Folketelling", "category": "Folketelling" },
                    { "text": "Fugler", "category": "Fugler" },
                    { "text": "Historie og samfunn", "category": "Historie og samfunn" },
                    { "text": "Kulturminner", "category": "Kulturminner" },
                    { "text": "Kunst", "category": "Kunst" },
                    { "text": "Planter", "category": "Planter" },
                    { "text": "Stedsnavn", "category": "Stedsnavn" },
                    { "text": "Verneområder", "category": "Verneområder" }
                ]);
            }
            this.mapTypes = ko.observableArray([
                { id: "WMS:std0:norges_grunnkart", name: "Forenklet" },
                { id: "WMS:std0:topo2", name: "Detaljer" }
            ]);
            this.mapZoomLevels = ko.observableArray([
                { id: 7, name: "7 (land)" },
                { id: 8, name: "8" },
                { id: 9, name: "9" },
                { id: 10, name: "10 (fylke)" },
                { id: 11, name: "11" },
                { id: 12, name: "12" },
                { id: 13, name: "13 (by)" },
                { id: 14, name: "14" },
                { id: 15, name: "15 (bydel)" },
                { id: 16, name: "16" },
                { id: 17, name: "17" },
                { id: 18, name: "18 (gate)" }
            ]);
            this.searchDistances = ko.observableArray([
                { id: 0.05, name: "50 meter" },
                { id: 0.1, name: "100 meter" },
                { id: 0.2, name: "200 meter" },
                { id: 0.3, name: "300 meter" },
                { id: 0.5, name: "500 meter" },
                { id: 0.75, name: "750 meter" },
                { id: 1, name: "1 km" },
                { id: 1.5, name: "1,5 km" },
                { id: 2, name: "2 km" },
                { id: 3, name: "3 km" },
                { id: 5, name: "5 km" },
                { id: 10, name: "1 mil" },
                { id: 20, name: "2 mil" },
                { id: 50, name: "5 mil" },
                { id: 100, name: "10 mil" }
            ]);
            this.resultAmounts = ko.observableArray([
                { id: 10, name: "10" },
                { id: 25, name: "25" },
                { id: 50, name: "50" },
                { id: 75, name: "75" },
                { id: 100, name: "100" },
            ]);
            this.views = ko.observableArray([
                { id: "mapView", name: "Kart" },
                { id: "listView", name: "Liste" },
            ]);
        };
        return Settings;
    })();
    App.Settings = Settings;
})(App || (App = {}));
var settings = new App.Settings();
startup.addInit(function () { settings.init(); });
