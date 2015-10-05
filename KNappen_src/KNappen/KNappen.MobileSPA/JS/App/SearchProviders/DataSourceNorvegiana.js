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
        var DataSourceNorvegiana = (function (_super) {
            __extends(DataSourceNorvegiana, _super);
            /**
                DataSourceNorvegiana
                @class App.SearchProviders.DataSourceNorvegiana
                @classdesc This class handles the specific search url and field mapping for the datasource "Norvegiana"
            */
            function DataSourceNorvegiana(searchCriteria, queryFields, successCallback, errorCallback) {
                _super.call(this, searchCriteria.rows(), successCallback, errorCallback);
                this.searchQueryFields = null;
                this.searchPosition = searchCriteria.pos();
                this.searchRadius = searchCriteria.radius();
                this.searchText = searchCriteria.query();
                this.searchCategory = searchCriteria.category();
                this.searchMediaType = searchCriteria.mediaType();
                this.searchQueryFields = queryFields;
                this.searchStart = 1;
                this.searchCount = searchCriteria.rows() * config.searchCountMultiplier;
            }
            DataSourceNorvegiana.prototype.search = function (searchHandle) {
                var _this = this;
                if (this.searchNotNeeded(this.searchStart)) {
                    return false;
                }
                log.debug("DataSourceNorvegiana", "Searching");
                var searchUrl = this.searchCriteriaNorgevianaToUrl();
                log.info("DataSourceNorvegiana", "Search URL: " + searchUrl);
                $.getJSON(searchUrl, function (data) {
                    log.info("DataSourceNorvegiana", "Processing result from: " + searchUrl);
                    var items = data.result.items;
                    for (var i in items) {
                        var object = items[i];
                        var p = object.item.fields;
                        var poi = new App.Models.PointOfInterest();
                        poi.source("norvegiana");
                        if (p.abm_contentProvider && (p.abm_contentProvider == "Digitalt fortalt" || p.abm_contentProvider == "Industrimuseum")) {
                            poi.sourceType("digitaltfortalt");
                        }
                        else {
                            poi.sourceType("fagdata");
                        }
                        var pos = _this.createPosition(p);
                        poi.pos(pos);
                        var poiDescription = _this.createPoiDescription(p.dc_description);
                        poi.description(poiDescription);
                        poi.id(p.delving_hubId[0]);
                        poi.name(p.dc_title);
                        poi.link(p.dc_identifier || "");
                        poi.thumbnail(p.abm_imageUri || "");
                        poi.year(p.dc_date || "");
                        poi.ingress(p.abm_introduction || "");
                        poi.license(p.europeana_rights || "");
                        var tags = p.dc_subject;
                        if (tags)
                            tags = tags.join(", ");
                        poi.topics(tags || "");
                        poi.categories(p.abm_category || "");
                        poi.institution(p.europeana_dataProvider || "");
                        poi.owner(p.abm_contentProvider || "");
                        poi.creator(p.dc_creator || "");
                        // References
                        if (p.dcterms_references) {
                            for (var index in p.dcterms_references) {
                                var referenceText = p.dcterms_references[index];
                                if (stringUtils.startsWith(referenceText.toLowerCase(), "http://")) {
                                    referenceText = "<a class='external' href='" + referenceText + "'>" + referenceText + "</a>";
                                }
                                poi.references(poi.references() + referenceText + "<br />");
                            }
                        }
                        else {
                            poi.references("");
                        }
                        poi.originalVersion(p.europeana_isShownAt || "");
                        for (var i in p.europeana_type) {
                            poi.mediaTypes.push(p.europeana_type[i]);
                        }
                        poi.soundUri(p.abm_soundUri || []);
                        poi.videoUri(p.abm_videoUri || []);
                        var distance = distanceTool.GetDistanceFromLatLon(poi.pos(), _this.searchPosition);
                        poi.distance(distance);
                        poi.distanceInKm(distance.toFixed(2) + "km");
                        poi.updateIcons();
                        _this.addPoi(poi);
                    }
                    _this.searchStart += _this.searchCount;
                    _this.setResultCount(parseInt(data.result.query.numfound));
                    _this.raiseSuccess(searchHandle);
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    _this.raiseError(errorThrown, searchHandle);
                });
                return true;
            };
            DataSourceNorvegiana.prototype.createPosition = function (fields) {
                var pos = null;
                var latlon = fields.abm_geo;
                if (latlon == null)
                    latlon = fields.abm_latLong;
                if (latlon != null) {
                    latlon = latlon[0].toString().split(',');
                    var poilat = latlon[0];
                    var poilon = latlon[1];
                    pos = new System.Models.Position(poilat, poilon);
                }
                return pos;
            };
            DataSourceNorvegiana.prototype.createPoiDescription = function (norvegianaDescription) {
                if (!norvegianaDescription)
                    return "";
                var poiDescription = "";
                norvegianaDescription.reverse().forEach(function (description) {
                    poiDescription += description;
                    poiDescription += "<br/><br/>";
                });
                return poiDescription;
            };
            DataSourceNorvegiana.prototype.searchCriteriaNorgevianaToUrl = function () {
                var searchQuery;
                // Query String: Text
                var query = this.searchText;
                if (query)
                    query = query.trim();
                if (query == null || query == "" || query == "*" || query == "%") {
                    searchQuery = "*:*";
                }
                else if (query.indexOf('"') != -1) {
                    searchQuery = "(*:* " + query + ")";
                }
                else {
                    query = query.replace("%", "*");
                    searchQuery = "((*:* " + query + ") OR (*:* " + DataSourceNorvegiana.toPartialQuery(query) + "))";
                }
                // Query String: Category
                if (this.searchQueryFields != null)
                    searchQuery += " AND (" + this.searchQueryFields + ")";
                if (this.searchCategory != null && this.searchCategory != "*")
                    searchQuery += " AND (abm_category_text:" + this.searchCategory + ")";
                // Facets
                var facets = "&qf=abm_collectionType_text%3AKNreise";
                if (this.searchMediaType != null && this.searchMediaType != "*")
                    facets += "&qf=europeana_type_facet%3A" + encodeURIComponent(this.searchMediaType);
                // Position
                var posStr = "&pt=" + this.searchPosition.lat() + '%2C' + this.searchPosition.lon();
                return config.norvegianaURL
                    + "?format=json"
                    + posStr
                    + "&sortBy=geodist"
                    + "&sortOrder=asc"
                    + '&start=' + this.searchStart
                    + '&rows=' + this.searchCount
                    + facets
                    + "&query=" + searchQuery
                    + "&d=" + this.searchRadius;
            };
            DataSourceNorvegiana.toPartialQuery = function (query) {
                var partialQuery = "";
                var words = query.split(' ');
                for (var i in words) {
                    var word = words[i];
                    if (i > 0) {
                        partialQuery += " ";
                    }
                    partialQuery += word;
                    if (!stringUtils.endsWith(word, "*")) {
                        partialQuery += "*";
                    }
                }
                return partialQuery;
            };
            return DataSourceNorvegiana;
        })(SearchProviders.DataSource);
        SearchProviders.DataSourceNorvegiana = DataSourceNorvegiana;
    })(SearchProviders = App.SearchProviders || (App.SearchProviders = {}));
})(App || (App = {}));
