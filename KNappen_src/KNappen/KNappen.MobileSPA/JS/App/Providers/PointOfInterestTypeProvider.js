/**
    Model modules
    @namespace App.Providers
*/
var App;
(function (App) {
    var Providers;
    (function (Providers) {
        var CategoryItem = (function () {
            /**
                CategoryItem
                @class App.Providers.CategoryItem
                @classdesc This class contains text, category name and icon url for a category
            */
            function CategoryItem(text, category, icon) {
                this.text = null;
                this.category = null;
                this.icon = null;
                this.text = text;
                this.category = category;
                this.icon = icon;
            }
            return CategoryItem;
        })();
        Providers.CategoryItem = CategoryItem;
        var GenreItem = (function () {
            /**
                GenreItem
                @class App.Providers.GenreItem
                @classdesc This class contains text, category name and icon url for a genre
            */
            function GenreItem(text, type, icon) {
                this.text = null;
                this.type = null;
                this.icon = null;
                this.text = text;
                this.type = type;
                this.icon = icon;
            }
            return GenreItem;
        })();
        Providers.GenreItem = GenreItem;
        var MediaTypeItem = (function () {
            /**
                CategoryItem
                @class App.Providers.MediaTypeItem
                @classdesc This class contains text, category name and icon url for a mediatype
            */
            function MediaTypeItem(text, type, icon) {
                this.text = null;
                this.type = null;
                this.icon = null;
                this.text = text;
                this.type = type;
                this.icon = icon;
            }
            return MediaTypeItem;
        })();
        Providers.MediaTypeItem = MediaTypeItem;
        var PointOfInterestTypes = (function () {
            /**
                PointOfInterestTypes
                @class App.Providers.PointOfInterestTypes
                @classdesc This class holds arrays of categories, genres and medias
            */
            function PointOfInterestTypes() {
                this.categories = {};
                this.genres = {};
                this.medias = {};
            }
            return PointOfInterestTypes;
        })();
        Providers.PointOfInterestTypes = PointOfInterestTypes;
        var PointOfInterestTypeProvider = (function () {
            /**
                PointOfInterestTypeProvider
                @class App.Providers.PointOfInterestTypeProvider
                @classdesc This class downloads typeinfo from the server, and provides methods for mapping categories, genres and mediatypes
            */
            function PointOfInterestTypeProvider() {
                this.poiTypeData = null;
                this.poiTypeData = new App.Providers.PointOfInterestTypes();
                this.poiTypeData.categories["Alle kategorier"] = new App.Providers.CategoryItem("Alle kategorier", "*", "Content/images/Categories/defaultCategory.png");
                this.poiTypeData.categories["Arkeologi"] = new App.Providers.CategoryItem("Arkeologi", "Arkeologi", "Content/images/Categories/arkeologi.png");
                this.poiTypeData.categories["Arkitektur"] = new App.Providers.CategoryItem("Arkitektur", "Arkitektur", "Content/images/Categories/arkitektur.png");
                this.poiTypeData.categories["Dyr"] = new App.Providers.CategoryItem("Dyr", "Dyr", "Content/images/Categories/dyr.png");
                this.poiTypeData.categories["Folketelling"] = new App.Providers.CategoryItem("Folketelling", "Folketelling", "Content/images/Categories/folketelling.png");
                this.poiTypeData.categories["Fugler"] = new App.Providers.CategoryItem("Fugler", "Fugler", "Content/images/Categories/fugler.png");
                this.poiTypeData.categories["Historie og samfunn"] = new App.Providers.CategoryItem("Historie og samfunn", "Historie og samfunn", "Content/images/Categories/historieogsamfunn.png");
                this.poiTypeData.categories["Kulturminner"] = new App.Providers.CategoryItem("Kulturminner", "Kulturminner", "Content/images/Categories/kulturminne.png");
                this.poiTypeData.categories["Kunst"] = new App.Providers.CategoryItem("Kunst", "Kunst", "Content/images/Categories/kunst.png");
                this.poiTypeData.categories["Planter"] = new App.Providers.CategoryItem("Planter", "Planter", "Content/images/Categories/planter.png");
                this.poiTypeData.categories["Stedsnavn"] = new App.Providers.CategoryItem("Stedsnavn", "Stedsnavn", "Content/images/Categories/stedsnavn.png");
                this.poiTypeData.categories["Verneområder"] = new App.Providers.CategoryItem("Verneområder", "Verneområder", "Content/images/Categories/verneomrader.png");
                //this.poiTypeData.categories["Wikipedia"] = new App.Providers.CategoryItem("Wikipedia", "Wikipedia", "Content/images/Categories/wikipedia.png");
                this.poiTypeData.genres["Fagdata"] = new App.Providers.GenreItem("Fagdata", "fagdata", "Content/images/Genres/fagdata.png");
                this.poiTypeData.genres["Leksikonartikler"] = new App.Providers.GenreItem("Leksikonartikler", "wikipedia", "Content/images/Genres/leksikon.png");
                this.poiTypeData.genres["Fortellinger"] = new App.Providers.GenreItem("Fortellinger", "digitaltfortalt", "Content/images/Genres/fortelling.png");
                this.poiTypeData.medias["Tekst"] = new App.Providers.MediaTypeItem("Tekst", "TEXT", "Content/images/MediaTypes/text.png");
                this.poiTypeData.medias["Bilde"] = new App.Providers.MediaTypeItem("Bilde", "IMAGE", "Content/images/MediaTypes/image.png");
                this.poiTypeData.medias["Lyd"] = new App.Providers.MediaTypeItem("Lyd", "SOUND", "Content/images/MediaTypes/sound.png");
                this.poiTypeData.medias["Video"] = new App.Providers.MediaTypeItem("Video", "VIDEO", "Content/images/MediaTypes/video.png");
                this.poiTypeData.medias["Alle medietyper"] = new App.Providers.MediaTypeItem("Alle medietyper", "*", "Content/images/MediaTypes/text.png");
            }
            /**
                Init
                @method App.Providers.PointOfInterestTypeProvider#Init
                @public
            */
            PointOfInterestTypeProvider.prototype.Init = function () {
                log.debug("PointOfInterestTypeProvider", "Init()");
                this.loadPoITypeData();
                this.startDownload();
            };
            PointOfInterestTypeProvider.prototype.startDownload = function () {
                //log.debug("PointOfInterestTypeProvider", "startDownload(): " + config.poiTypeDataUrl);
                //var _this = this;
                this.poiTypeData =
                    {
                        "categories": [
                            { "text": "Alle kategorier", "category": "*", "icon": "Content/images/Categories/defaultCategory.png" },
                            { "text": "Arkeologi", "category": "Arkeologi", "icon": "Content/images/Categories/arkeologi.png" },
                            { "text": "Arkitektur", "category": "Arkitektur", "icon": "Content/images/Categories/arkitektur.png" },
                            { "text": "Dyr", "category": "Dyr", "icon": "Content/images/Categories/dyr.png" },
                            { "text": "Folketelling", "category": "Folketelling", "icon": "Content/images/Categories/folketelling.png" },
                            { "text": "Fugler", "category": "Fugler", "icon": "Content/images/Categories/fugler.png" },
                            { "text": "Historie og samfunn", "category": "Historie og samfunn", "icon": "Content/images/Categories/historieogsamfunn.png" },
                            { "text": "Kulturminner", "category": "Kulturminner", "icon": "Content/images/Categories/kulturminne.png" },
                            { "text": "Kunst", "category": "Kunst", "icon": "Content/images/Categories/kunst.png" },
                            { "text": "Planter", "category": "Planter", "icon": "Content/images/Categories/planter.png" },
                            { "text": "Stedsnavn", "category": "Stedsnavn", "icon": "Content/images/Categories/stedsnavn.png" },
                            { "text": "Verneområder", "category": "Verneområder", "icon": "Content/images/Categories/verneomrader.png" },
                        ],
                        "genres": [
                            { "text": "Fagdata", "type": "fagdata", "icon": "Content/images/Genres/fagdata.png" },
                            { "text": "Leksikonartikler", "type": "wikipedia", "icon": "Content/images/Genres/leksikon.png" },
                            { "text": "Fortellinger", "type": "digitaltfortalt", "icon": "Content/images/Genres/fortelling.png" }
                        ],
                        "medias": [
                            { "text": "Tekst", "type": "TEXT", "icon": "Content/images/MediaTypes/text.png" },
                            { "text": "Bilde", "type": "IMAGE", "icon": "Content/images/MediaTypes/image.png" },
                            { "text": "Lyd", "type": "SOUND", "icon": "Content/images/MediaTypes/sound.png" },
                            { "text": "Video", "type": "VIDEO", "icon": "Content/images/MediaTypes/video.png" },
                            { "text": "Alle medietyper", "type": "*", "icon": "Content/images/MediaTypes/text.png" }
                        ]
                    };
                //var poiDlItem = new System.Providers.HttpDownloadItem("poiTypeData", config.poiTypeDataUrl,
                //    function (data: string) {
                //        log.debug("PointOfInterestTypeProvider", "startDownload() success: Processing: " + config.poiTypeDataUrl);
                //        _this.poiTypeData = new App.Providers.PointOfInterestTypes();
                //        _this.poiTypeData = serializer.deserializeJSObject(data, this.poiTypeData);
                this.savePoITypeData();
                this.updateDependencies();
                //}, function (message: string) {
                //    log.error("PointOfInterestTypeProvider", "Error downloading poiTypeData.");
                //});
                //httpDownloadProvider.enqueueItem("General", System.Providers.HttpDownloadQueuePriority.High, poiDlItem);
            };
            PointOfInterestTypeProvider.prototype.loadPoITypeData = function () {
                try {
                    log.debug("PointOfInterestTypeProvider", "loadPoITypeData()");
                    var data = new App.Providers.PointOfInterestTypes();
                    data = serializer.deserializeJSObjectFromFile("poiTypeData", data);
                    if (data != null && Object.keys(data.categories).length > 0) {
                        this.poiTypeData.categories = data.categories;
                    }
                    if (data != null && Object.keys(data.genres).length > 0) {
                        this.poiTypeData.genres = data.genres;
                    }
                    if (data != null && Object.keys(data.medias).length > 0) {
                        this.poiTypeData.medias = data.medias;
                    }
                    this.updateDependencies();
                }
                catch (exception) {
                    log.error("PointOfInterestTypeProvider", "Exception loading PoITypeData: " + exception);
                }
            };
            PointOfInterestTypeProvider.prototype.savePoITypeData = function () {
                log.debug("PointOfInterestTypeProvider", "savePoITypeData()");
                serializer.serializeJSObjectToFile("poiTypeData", this.poiTypeData);
            };
            PointOfInterestTypeProvider.prototype.updateDependencies = function () {
                var categoryList = [];
                $.each(this.getCategories(), function (k, v) {
                    categoryList.push(v);
                });
                settings.searchCategories(categoryList);
            };
            /**
                Get array of mediatypes fetched from the server
                @method App.Providers.PointOfInterestTypeProvider#getMediaTypes
                @public
            */
            PointOfInterestTypeProvider.prototype.getMediaTypes = function () {
                return this.poiTypeData.medias;
            };
            /**
                Get array of genres fetched from the server
                @method App.Providers.PointOfInterestTypeProvider#getGenres
                @public
            */
            PointOfInterestTypeProvider.prototype.getGenres = function () {
                return this.poiTypeData.genres;
            };
            /**
                Get array of categories fetched from the server
                @method App.Providers.PointOfInterestTypeProvider#getCategories
                @public
            */
            PointOfInterestTypeProvider.prototype.getCategories = function () {
                return this.poiTypeData.categories;
            };
            /**
                Map mediatype of poi to correct mediatype from server
                @method App.Providers.PointOfInterestTypeProvider#getMediaType
                @param {App.Models.PointOfInterest} poi
                @public
            */
            PointOfInterestTypeProvider.prototype.getMediaType = function (poi) {
                var ret = new Array();
                var poiTypes = poi.mediaTypes();
                if (poiTypes.length > 1) {
                    poiTypes = poiTypes;
                }
                for (var pi in poiTypes) {
                    var poiType = poiTypes[pi];
                    for (var mi in this.poiTypeData.medias) {
                        var mediaType = this.poiTypeData.medias[mi];
                        if (mediaType.type.toUpperCase() == poiType.toUpperCase()) {
                            ret.push(mediaType);
                            break;
                        }
                    }
                }
                if (ret.length == 0) {
                    log.info("SearchProvider", "No mediatype found for type: " + poi.mediaTypes().toString());
                }
                return ret;
            };
            /**
                Map genre of poi to correct genre from server
                @method App.Providers.PointOfInterestTypeProvider#getGenre
                @param {App.Models.PointOfInterest} poi
                @public
            */
            PointOfInterestTypeProvider.prototype.getGenre = function (poi) {
                var ret = null;
                var genreType = "*";
                // If not or multiple media types, use general icon
                if (poi && poi.sourceType && poi.sourceType())
                    genreType = poi.sourceType();
                // If not, return icon
                $.each(this.poiTypeData.genres, function (k, v) {
                    if (v.type.toUpperCase() == genreType.toUpperCase())
                        ret = v;
                });
                if (!ret)
                    log.info("SearchProvider", "No genre found for type: " + poi.sourceType());
                return ret;
            };
            /**
                Map category of poi to correct category from server
                @method App.Providers.PointOfInterestTypeProvider#getCategory
                @param {App.Models.PointOfInterest} poi
                @public
            */
            PointOfInterestTypeProvider.prototype.getCategory = function (poi) {
                var ret = null;
                var category = "*";
                var _this = this;
                //If not or multiple categories, use general icon
                //if (poi.category().length == 0 || poi.category().length > 1)
                //    return this.poiTypeData.categories["*"];
                $.each(poi.categories(), function (key1, v1) {
                    if (ret == null) {
                        $.each(_this.poiTypeData.categories, function (key2, v2) {
                            if (ret == null && v2.category.toUpperCase() == v1.toUpperCase())
                                ret = v2;
                        });
                    }
                });
                //If not, return icon
                if (!ret)
                    log.info("SearchProvider", "No category found for type: " + poi.categories().toString());
                return ret;
            };
            return PointOfInterestTypeProvider;
        })();
        Providers.PointOfInterestTypeProvider = PointOfInterestTypeProvider;
    })(Providers = App.Providers || (App.Providers = {}));
})(App || (App = {}));
var pointOfInterestTypeProvider = new App.Providers.PointOfInterestTypeProvider();
startup.addInit(function () { pointOfInterestTypeProvider.Init(); }, "PointOfInterestTypeProvider");
