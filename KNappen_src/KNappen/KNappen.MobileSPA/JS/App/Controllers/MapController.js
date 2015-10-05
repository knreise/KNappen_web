/**
    Controller modules
    @namespace App.Controllers
*/
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var MapController = (function () {
            /**
                MapController
                @class App.Controllers.MapController
                @classdesc This class controls map experience for user. For example centers map on new GPS pos.
            */
            function MapController() {
                this.mapProvider = null;
                this.panel = null;
                this.firstPosition = true;
            }
            /**
                Creates an instance of System.Providers.MapProvider
                @method App.Controllers.MapController#PreInit
                @public
            */
            MapController.prototype.PreInit = function () {
                log.debug("MapController", "PreInit()");
                this.mapProvider = new System.Providers.MapProvider();
                startup.finishedPreInit("MapController");
            };
            /**
                Hooks up the searchresultcallback event to renderView, initiates
                the map and sets center position for the map
                @method App.Controllers.MapController#Init
                @public
            */
            MapController.prototype.postInit = function () {
                var _this = this;
                log.debug("MapController", "postInit()");
                //showing map so that it can calculate center
                $("#mapView").show();
                var targetSurface = "map";
                // Set CSS for map
                //var mapSurface: JQuery = $("#" + targetSurface);
                //mapSurface.css('width', '100%');
                //mapSurface.css('position', 'relative');
                //mapSurface.css('height', '300px');
                var m = this.mapProvider;
                m.Init(false, targetSurface, settings.startMapType());
                // Set map center
                m.setCenter(config.mapStartPos, settings.startMapZoomLevel());
                var rv = this.renderView;
                //$("body").append('<div id="mapSearchDialog" title="' + tr.translate("Search for place") + '" class="bigDialog"></div>');
                //$("body").append('<div id="mapResultToRouteDialog" title="' + tr.translate("Create route from search") + '" class="bigDialog"></div>');
                searchController.addSearchResultCallback(function (event, searchResult, inRoute) {
                    rv(_this, searchResult, inRoute);
                });
                //this.mapProvider.addMapClickEvent(function mapClick(e) {
                //    var lonlat = _this.mapProvider.getPosFromPx(e.xy);
                //    searchController.searchCriteria.pos(new System.Models.Position(lonlat.lat, lonlat.lon));
                //    searchController.doSearch();
                //    log.debug("MapController", "Map clicked on: " + lonlat.lon + ", " + lonlat.lat);
                //});
                var _this1 = this;
                gpsProvider.addPositionChangedHandler(function (event, pos) {
                    mapController.mapProvider.updateCenterMarker(config.mapCenterMarker, pos);
                    if (_this1.firstPosition) {
                        _this1.firstPosition = false;
                        _this1.mapProvider.setCenter(pos);
                    }
                });
                var zb = new OpenLayers.Control.Button({
                    title: tr.translate("My position"),
                    text: "<span class='typcn mapTypIconButton'><svg><path fill='white' d='M12 20c3.86 0 7-3.141 7-7s-3.14-7-7.003-7c-3.858 0-6.997 3.141-6.997 7s3.14 7 7 7zm-1-11.898v1.898c0 .553.448 1 1 1s1-.447 1-1v-1.898c1.956.398 3.5 1.942 3.899 3.898h-1.899c-.552 0-1 .447-1 1s.448 1 1 1h1.899c-.399 1.956-1.943 3.5-3.899 3.898v-1.898c0-.553-.448-1-1-1s-1 .447-1 1v1.898c-1.956-.398-3.5-1.942-3.899-3.898h1.899c.552 0 1-.447 1-1s-.448-1-1-1h-1.899c.399-1.956 1.942-3.5 3.899-3.898z'/></svg></span>",
                    trigger: function () {
                        var pos = gpsProvider.lastPos;
                        if (!pos)
                            pos = config.mapStartPos;
                        _this.mapProvider.setCenter(pos, settings.startMapZoomLevel());
                    }
                });
                this.panel = new OpenLayers.Control.Panel({
                    vertical: true,
                    defaultControl: zb,
                    createControlMarkup: function (control) {
                        var text = $(control.text);
                        return text[0];
                    }
                });
                this.panel.addControls([
                    zb,
                    new OpenLayers.Control.ZoomIn({
                        title: tr.translate("Zoom in"),
                        text: "<span class='typcn mapTypIconButton'><svg><path fill='white' d='M18 10h-4v-4c0-1.104-.896-2-2-2s-2 .896-2 2l.071 4h-4.071c-1.104 0-2 .896-2 2s.896 2 2 2l4.071-.071-.071 4.071c0 1.104.896 2 2 2s2-.896 2-2v-4.071l4 .071c1.104 0 2-.896 2-2s-.896-2-2-2z'/></svg></span>"
                    }),
                    new OpenLayers.Control.ZoomOut({
                        title: tr.translate("Zoom out"),
                        text: "<span class='typcn mapTypIconButton'><svg><path fill='white' d='M18 11h-12c-1.104 0-2 .896-2 2s.896 2 2 2h12c1.104 0 2-.896 2-2s-.896-2-2-2z'/></svg></span>"
                    }),
                    new OpenLayers.Control.Button({
                        title: tr.translate("Search"),
                        text: "<span class='typcn mapTypIconButton'><img style='margin:10%; height:80%; width:80%;' src='img/skilt-icon.png'></img></span>",
                        trigger: function () {
                            clickHelper.suppress(function () { return viewController.selectView("placeSearch"); }, 500);
                        }
                    }),
                    new OpenLayers.Control.Button({
                        title: tr.translate("Change map layer"),
                        text: "<span class='typcn mapTypIconButton'><svg><circle fill='white' cx='8.5' cy='8.501' r='2.5'/><path fill='white' d='M16 10c-2 0-3 3-4.5 3s-1.499-1-3.5-1c-2 0-3.001 4-3.001 4h14.001s-1-6-3-6zM20 3h-16c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm0 14h-16v-12h16v12z'/></svg></span>",
                        trigger: function () {
                            clickHelper.suppress(_this.nextMapLayer.bind(_this), 500);
                        }
                    })
                ]);
                this.mapProvider.map.addControl(this.panel);
                var clickholdCtrl = new OpenLayers.Control.Clickhold({
                    autoActivate: true
                });
                clickholdCtrl.events.register('click', {}, function (evt) {
                    if (_this.isControlPanel(evt.evt))
                        return;
                    // Hide potential poiPreview since it is a new search
                    poiController.hidePoiPreviewOnly();
                    _this.initiateSearch(evt);
                });
                clickholdCtrl.events.register('clickhold', {}, function (evt) {
                    if (_this.isControlPanel(evt.evt))
                        return;
                    _this.initiateSearch(evt);
                });
                this.mapProvider.map.addControl(clickholdCtrl);
            };
            MapController.prototype.isControlPanel = function (event) {
                var target = event.target;
                return (target.className.indexOf("olControlPanel") != -1);
            };
            MapController.prototype.initiateSearch = function (e) {
                var lonlat = this.mapProvider.getPosFromPx(e.xy);
                searchController.searchCriteria.pos(new System.Models.Position(lonlat.lat, lonlat.lon));
                searchController.doNewSearch();
            };
            MapController.prototype.nextMapLayer = function () {
                var curMap = this.mapProvider.mapType;
                var firstMap = null;
                var setNext = false;
                var _this = this;
                //var mapSet: any = null;
                $.each(settings.mapTypes(), function (k, v) {
                    if (!firstMap)
                        firstMap = v.id;
                    if (setNext) {
                        setNext = false;
                        _this.mapProvider.changeLayer(v.id);
                    }
                    if (v.id == curMap)
                        setNext = true;
                });
                if (setNext) {
                    setNext = false;
                    _this.mapProvider.changeLayer(firstMap);
                }
                historyController.addHistorySnapshot();
                //historyController.addToCurrentSnapshot({ mapType: mapSet });
            };
            MapController.prototype.searchClick = function (eventObject) {
                var mapSearchDialogD = $("#mapSearchDialog");
                var mapSearchResult = $("#mapSearchResult");
                var mapSearchInputBox = $("#mapSearchInputBox");
                mapSearchResult.html('');
                var searchStr = mapSearchInputBox.val();
                searchStr = searchStr.trim();
                if (searchStr == "" || searchStr == null) {
                    return;
                }
                loadingScreenController.showLoadingScreen("");
                var ssrSearch = new App.SearchProviders.SSRSearch();
                mapSearchResult.html('');
                ssrSearch.search(searchStr, function (searchResult) {
                    $.each(searchResult.items, function (k, v) {
                        var newDiv = $("<div>").append("<h3>" + v.stedsnavn() + "</h3>[" + v.navnetype() + "] " + v.fylkesnavn() + " / " + v.kommunenavn())
                            .mousedown(function () {
                            searchController.searchCriteria.pos(v.pos);
                            searchController.doNewSearch();
                            //viewController.goBack();
                            viewController.selectView("mapView");
                        });
                        mapSearchResult.append(newDiv);
                    });
                    if (searchResult.items.length < 1) {
                        mapSearchResult.append("Ingen treff");
                    }
                    loadingScreenController.hideLoadingScreen();
                }, function (errorMessage) {
                    log.error("MapController", "Error searching SSR: " + errorMessage);
                    userPopupController.sendError("SSR feil", "Feil ved søk i stedsnavnregisteret.");
                });
            };
            /**
                Renders the mapview, adding and positioning markers from searchresult to the map
                @method App.Controllers.MapController#renderView
                @private
                @param {MapController} _this
                @param {App.Models.SearchResult} searchResult
                @param {boolean} inRoute A route is being shown
            */
            MapController.prototype.renderView = function (_this, searchResult, inRoute) {
                log.debug("MapController", "renderView()");
                _this.mapProvider.clearMarkers();
                // Set senter of map to search location (not when showing a route)
                // Also place marker in search position after drawing pois
                if (!inRoute) {
                    _this.mapProvider.setCenter(searchController.searchCriteria.pos());
                    _this.mapProvider.addLocationMarker(config.mapSearchLocationMarker, searchController.searchCriteria.pos());
                }
                // Place center marker (user location) if position is known
                if (gpsProvider.lastPos) {
                    _this.mapProvider.addCenterMarker(config.mapCenterMarker, gpsProvider.lastPos);
                }
                var first = true;
                $.each(searchResult.items(), function (k, v) {
                    try {
                        if (inRoute && first) {
                            _this.mapProvider.setCenter(v.pos(), config.mapCacheValidZoomLevels[0]);
                            first = false;
                        }
                        return _this.mapProvider.addMarker(v, function () {
                            _this.poiClicked(v, this);
                        }, "activeMarker");
                    }
                    catch (exception) {
                        log.debug("MapController", "Error on addMarker: " + v.name() + ": " + exception);
                    }
                });
            };
            MapController.prototype.resetClickedPois = function () {
                //set tilbake til originalicon
                if (!this.currentMarkerSelected)
                    return;
                else {
                    this.currentMarkerSelected.icon.setUrl(this.currentMarkerOriginalIcon);
                    this.currentMarkerSelected = null;
                    this.currentMarkerOriginalIcon = "";
                }
            };
            MapController.prototype.poiClicked = function (poi, marker) {
                log.debug("Map", "Clicked " + poi.id());
                this.resetClickedPois();
                this.currentMarkerSelected = marker;
                this.currentMarkerOriginalIcon = poi.iconInactiveCategoryURL();
                this.currentMarkerSelected.icon.setUrl(poi.iconActiveCategoryURL());
                poiController.OpenPreview(poi, true);
            };
            return MapController;
        })();
        Controllers.MapController = MapController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var mapController = new App.Controllers.MapController();
startup.addPreInit(function () { mapController.PreInit(); }, "MapController");
startup.addPostInit(function () { mapController.postInit(); }, "MapController");
//startup.addPreInit(errorTool.delayedExecuteTryCatchUserMessage("Feil", "Feil ved klargjøring av kart (PreInit). Se logg for detaljer.", function () { mapController.PreInit(); }, null, "MapController", "PreInit"), "MapController");
//startup.addInit(errorTool.delayedExecuteTryCatchUserMessage("Feil", "Feil ved klargjøring av kart (Init). Se logg for detaljer.", function () { mapController.Init(); }, null, "MapController", "Init"), "MapController");
