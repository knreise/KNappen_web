/**
    SearchProviders
    @namespace App.SearchProviders
*/
var App;
(function (App) {
    var SearchProviders;
    (function (SearchProviders) {
        var SSRSearchResult = (function () {
            /**
                SSRSearchResult
                @class App.SearchProviders.SSRSearchResult
                @classdesc This class contains the items and number of results returned from the SSR search
            */
            function SSRSearchResult() {
                this.items = [];
                this.numFound = ko.observable(0);
            }
            return SSRSearchResult;
        })();
        SearchProviders.SSRSearchResult = SSRSearchResult;
        var SSRSearchItem = (function () {
            /**
                SSRSearchItem
                @class App.SearchProviders.SSRSearchITem
                @classdesc This class contains the name and position of a result item from the SSR search
            */
            function SSRSearchItem() {
                this.ssrId = ko.observable('');
                this.navnetype = ko.observable('');
                this.kommunenavn = ko.observable('');
                this.fylkesnavn = ko.observable('');
                this.stedsnavn = ko.observable('');
                this.pos = null;
            }
            return SSRSearchItem;
        })();
        SearchProviders.SSRSearchItem = SSRSearchItem;
        var SSRSearch = (function () {
            /**
                SSRSearch
                @class App.SearchProviders.SSRSearch
                @classdesc This class handles the specific search url and field mapping for the datasource "SSR"
            */
            function SSRSearch() {
                proj4.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
                proj4.defs("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs");
            }
            /**
                search
                @method App.SearchProviders.SSRSearch#search
                @public
            */
            SSRSearch.prototype.search = function (place, successCallback, errorCallback) {
                if (!place) {
                    log.debug("SSRSearch", "Have no place. Search not possible.");
                    return;
                }
                log.debug("SSRSearch", "Searching for: " + place);
                //var searchUrl = searchCriteria.norvegiana.mkUrl();
                var searchUrl = this.placeToSSRURL(place);
                log.info("SSRSearch", "Search URL: " + searchUrl);
                var jqxhr = $.ajax({ url: searchUrl, dataType: "xml" })
                    .done(function (data, textStatus, jqXHR) {
                    log.info("SSRSearch", "Processing result from: " + searchUrl);
                    var dest = new proj4.Proj('EPSG:4326');
                    var retItems = [];
                    var items = $(data).find('stedsnavn').each(function () {
                        //$.each(items, function (objid, o) {
                        var ssrSearchItem = new App.SearchProviders.SSRSearchItem();
                        // Koordinatsystem: EUREF89 UTM
                        //ssrSearchItem.ssrId(o.ssrId);
                        //ssrSearchItem.navnetype(o.navnetype);
                        //ssrSearchItem.kommunenavn(o.kommunenavn);
                        //ssrSearchItem.fylkesnavn(o.fylkesnavn);
                        //ssrSearchItem.stedsnavn(o.stedsnavn);
                        //ssrSearchItem.pos = new System.Models.Position(o.aust, o.nord);
                        ssrSearchItem.ssrId($(this).find('ssrId').text());
                        ssrSearchItem.navnetype($(this).find('navnetype').text());
                        ssrSearchItem.kommunenavn($(this).find('kommunenavn').text());
                        ssrSearchItem.fylkesnavn($(this).find('fylkesnavn').text());
                        ssrSearchItem.stedsnavn($(this).find('stedsnavn').text());
                        var fromProjection = "EPSG:" + ($(this).find('epsgKode').text() || "25833");
                        var source = new proj4.Proj(fromProjection);
                        // EUREF 89 (EPSG:25832) 
                        var point = new proj4.Point(+$(this).find('aust').text(), +$(this).find('nord').text());
                        proj4.transform(source, dest, point);
                        ssrSearchItem.pos = new System.Models.Position(point.y, point.x);
                        // Add to return
                        if (ssrSearchItem.ssrId())
                            retItems.push(ssrSearchItem);
                    });
                    var result = new App.SearchProviders.SSRSearchResult();
                    result.numFound(data.totaltAntallTreff);
                    result.items = retItems;
                    // Success callback
                    successCallback(result);
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    errorCallback(errorThrown);
                })
                    .always(function (a, textStatus, b) {
                });
            };
            SSRSearch.prototype.placeToSSRURL = function (place) {
                var navn = "?navn=" + encodeURIComponent(place) + "*";
                var maxAnt = "&maxAnt=50";
                return config.ssrURL + navn + maxAnt + "&tilSosiKoordSyst=4258&eksakteForst=true";
            };
            return SSRSearch;
        })();
        SearchProviders.SSRSearch = SSRSearch;
    })(SearchProviders = App.SearchProviders || (App.SearchProviders = {}));
})(App || (App = {}));
