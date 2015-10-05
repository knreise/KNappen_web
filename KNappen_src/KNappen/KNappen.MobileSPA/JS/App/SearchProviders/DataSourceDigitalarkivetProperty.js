var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
    Providers
    @namespace App.SearchProviders
*/
var App;
(function (App) {
    var SearchProviders;
    (function (SearchProviders) {
        var DataSourceDigitalarkivetProperty = (function (_super) {
            __extends(DataSourceDigitalarkivetProperty, _super);
            /**
                DataSourceDigitalarkivetProperty
                @class App.SearchProviders.DataSourceDigitalarkivetProperty
                @classdesc This class handles the specific search url and field mapping for the datasource "Digitalarkivet"
            */
            function DataSourceDigitalarkivetProperty(searchCriteria, successCallback, errorCallback) {
                _super.call(this, searchCriteria.rows(), successCallback, errorCallback);
                this.searchPosition = searchCriteria.pos();
                this.searchRadius = searchCriteria.radius();
                this.searchString = DataSourceDigitalarkivetProperty.getSearchString(searchCriteria.query());
                this.searchNextPage = 1;
                this.searchLimit = searchCriteria.rows() * config.searchCountMultiplier;
            }
            /**
                search
                @method App.SearchProviders.DataSourceDigitalarkivetProperty#search
                @public
            */
            DataSourceDigitalarkivetProperty.prototype.search = function (searchHandle) {
                if (this.searchNotNeeded((this.searchNextPage - 1) * this.searchLimit)) {
                    return false;
                }
                var self = this;
                log.debug("DataSourceDigitalarkivetProperty", "Searching");
                var searchUrl = DataSourceDigitalarkivetProperty.searchCriteriaToDigitalArkivetUrl(this.searchPosition, this.searchRadius, this.searchNextPage, this.searchLimit, this.searchString);
                log.info("DataSourceDigitalarkivetProperty", "Search URL: " + searchUrl);
                $.getJSON(searchUrl, function (data) {
                    log.info("DataSourceDigitalarkivetProperty", "Processing result from: " + searchUrl);
                    var items = data.results;
                    for (var i in items) {
                        var item = items[i];
                        var poi = new App.Models.PointOfInterest();
                        poi.source("digitalarkivet");
                        poi.sourceType("fagdata");
                        poi.categories.push(config.digitalArkivetPropertyCategory);
                        poi.mediaTypes.push("TEXT");
                        poi.id(item.autoid);
                        poi.name(item.gaardsnavn_gateadr);
                        poi.year(item.startaar || "");
                        poi.institution(item.kildenavn || "");
                        poi.owner("Digitalarkivet");
                        poi.creator("");
                        poi.landingPage(item.kildeside || "");
                        poi.tags(item.kildetype || "");
                        poi.ingress(item.gaardsnavn_gateadr || "");
                        poi.body("");
                        poi.license(item.lisenstype || "");
                        poi.thumbnail("");
                        var position = new System.Models.Position(item.latitude, item.longitude);
                        var distance = distanceTool.GetDistanceFromLatLon(position, self.searchPosition);
                        poi.pos(position);
                        poi.distance(distance);
                        poi.distanceInKm(distance.toFixed(2) + "km");
                        var descriptionString = "";
                        descriptionString += stringUtils.toFieldBold(null, item.gaardsnavn_gateadr);
                        descriptionString += stringUtils.toFieldBold("Bruksnavn", (item.gaardsnavn_gateadr != null && item.bruksnavn != null && item.gaardsnavn_gateadr != item.bruksnavn) ? item.bruksnavn : null);
                        descriptionString += stringUtils.toFieldBold("Fylke", item.fylke);
                        descriptionString += stringUtils.toFieldBold("Kommune", item.kommune_sokn);
                        poi.description(descriptionString);
                        if (item.apartments != null) {
                            poi.description(poi.description() + DataSourceDigitalarkivetProperty.dataToApartments(item.apartments, item.persons));
                        }
                        else {
                            poi.description(poi.description() + DataSourceDigitalarkivetProperty.dataToResidents(item.persons));
                        }
                        poi.updateIcons();
                        self.addPoi(poi);
                    }
                    self.searchNextPage++;
                    self.setResultCount(parseInt(data.total_found));
                    self.raiseSuccess(searchHandle);
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    self.raiseError(errorThrown, searchHandle);
                });
                return true;
            };
            DataSourceDigitalarkivetProperty.searchCriteriaToDigitalArkivetExtendedUrl = function (bfId) {
                return "http://api.digitalarkivet.arkivverket.no/v1/census/1910/property/" + bfId;
            };
            DataSourceDigitalarkivetProperty.searchCriteriaToDigitalArkivetUrl = function (position, radius, nextPage, limit, searchString) {
                return "http://api.digitalarkivet.arkivverket.no/v1/census/1910/search_property_geo?"
                    + "latitude=" + position.lat()
                    + "&longitude=" + position.lon()
                    + "&precision=" + (radius * 1000)
                    + "&limit=" + limit
                    + "&page=" + nextPage
                    + "&include_apartments=1"
                    + "&include_persons=1"
                    + searchString;
            };
            DataSourceDigitalarkivetProperty.getSearchString = function (searchQuery) {
                var result = "";
                if (searchQuery != null && searchQuery != "" && searchQuery != "*" && searchQuery != "%") {
                    searchQuery = $.trim(searchQuery);
                    searchQuery = searchQuery.replace("%", "*");
                    searchQuery = encodeURI(searchQuery);
                    result = "&s=" + searchQuery;
                }
                return result;
            };
            DataSourceDigitalarkivetProperty.compareApartments = function (a, b) {
                if (a.leilighetsnummer > b.leilighetsnummer)
                    return 1;
                if (a.leilighetsnummer < b.leilighetsnummer)
                    return -1;
                return 0;
            };
            DataSourceDigitalarkivetProperty.filterResidentsForApartment = function (resident, index, array) {
                return resident.overid == this;
            };
            DataSourceDigitalarkivetProperty.dataToApartments = function (apartments, persons) {
                var apartmentString = "";
                if (!apartments) {
                    return "";
                }
                apartments.sort(DataSourceDigitalarkivetProperty.compareApartments);
                for (var apartmentIndex in apartments) {
                    var apartment = apartments[apartmentIndex];
                    apartmentString += "</br>";
                    apartmentString += stringUtils.toFieldBold(null, "Nummer", apartment.leilighetsnummer, "i", apartment.etasje, "etasje");
                    apartmentString += stringUtils.toFieldBold("Husleie", apartment.husleie);
                    var residents = persons.filter(DataSourceDigitalarkivetProperty.filterResidentsForApartment, apartment.id);
                    apartmentString += DataSourceDigitalarkivetProperty.dataToResidents(residents);
                    apartmentString += "</br>";
                }
                return apartmentString;
            };
            DataSourceDigitalarkivetProperty.dataToResidents = function (residents) {
                var residentsString = "";
                if (!residents) {
                    return "";
                }
                for (var i in residents) {
                    var resident = residents[i];
                    residentsString += "</br>";
                    residentsString += stringUtils.toFieldBold(null, resident.fornavn, resident.patronymikon, resident.slektsnavn);
                    residentsString += stringUtils.toField("Fødselsdato", resident.fodselsaar);
                    residentsString += stringUtils.toField("Yrke", resident.yrke);
                    residentsString += stringUtils.toFieldFromCode("Familiestilling", resident.familiestilling);
                    residentsString += stringUtils.toFieldFromCode("Sivilstatus", resident.sivilstand);
                    residentsString += stringUtils.toField("Fødested", resident.fodested);
                    residentsString += stringUtils.toFieldFromCode("Bostatus", resident.bostatus);
                    residentsString += stringUtils.toFieldFromCode("Statsborgerskap", resident.statsborgerskap);
                    residentsString += stringUtils.toFieldFromCode("Trossamfunn", resident.trossamfunn);
                }
                ;
                return residentsString;
            };
            return DataSourceDigitalarkivetProperty;
        })(SearchProviders.DataSource);
        SearchProviders.DataSourceDigitalarkivetProperty = DataSourceDigitalarkivetProperty;
    })(SearchProviders = App.SearchProviders || (App.SearchProviders = {}));
})(App || (App = {}));
