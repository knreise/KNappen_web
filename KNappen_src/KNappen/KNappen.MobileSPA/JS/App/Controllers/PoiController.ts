

/**
    Controller modules
    @namespace App.Controllers
*/
module App.Controllers {
    declare var $;

    export class PoiController {

        /**
           PoiController
           @class App.Controllers.PoiController
           @classdesc This class controls the way Points of Interest should be displayed
        */
        constructor() {

        }

        public PreInit() {
            log.debug("PoiController", "PreInit()");

            templateProvider.queueTemplateDownload(config.templatePOIPreview);
            templateProvider.queueTemplateDownload(config.templatePOIDetailsView);

            startup.finishedPreInit("PoiController");
        }

        /**
            Creates the html that will be used for POI Preview and Detail and appends it to 'body'
            @method App.Controllers.PoiController#Init
            @public     
        */
        public Init() {
            log.debug("PoiController", "Init()");
            //append nødvendige elementer til passende steder
            $("body").append('<div id="poiPreview"></div>');

            $(document).mousedown(function () {
                var currentView = viewController.getCurrentView();

                if (currentView && currentView.name != "poiView")
                    poiController.hidePoiPreview();
            });

            viewController.addPostSelectEvent(function (event, oldView, newView) {
                if (oldView && oldView.name == "poiView")
                    poiController.closeDetail();
            });
            viewController.addSelectEvent(function (event: JQueryEventObject, oldView: System.GUI.ViewControllerItem, newView: System.GUI.ViewControllerItem) {
                if (newView.name === "poiView") {
                    windowSizeController.ShowHeader(false);
                } else {
                    if (oldView && oldView.name == "poiView") {
                        windowSizeController.ShowHeader(true);
                        // Moved away from poiView? Hide it. (not required any more since we are not using dialog)
                        poiController.hidePoiPreview();
                    }
                }
            });

            searchController.addSearchResultCallback(this.searchResultHandler);
        }

        private searchResultHandler(event: JQueryEventObject, searchResult: App.Models.SearchResult, inRoute: boolean) {
            // We only act if we have a previous POI selection
            if (!historyController || !historyController.restoredState || !historyController.restoredState['POI'])
                return;

            setTimeout(() => {
                debugger;

                var selectedHash = historyController.restoredState['POI'];
                //if (selectedHash == "null")
                //    return;

                // Figure out which by brutally calculating hash of all result items
                var poi = null;
                $.each(searchResult.items(), function (k, v: App.Models.PointOfInterest) {
                    try {
                        if (v.getHashCode() === selectedHash) {
                            poi = v;
                            return;
                        }
                    } catch (exception) {
                        log.debug("PoiController", "Error on getting hash for poi.");
                    }
                });
                // Nothing found?
                if (!poi)
                    return;

                // Open it
                poiController.OpenDetail(poi);
            }, 1000);
        }

        /**
            Opens the POI Preview inside the footer element
            @method App.Controllers.PoiController#OpenPreview
            @param {App.Models.PointOfInterest} poi Poi to be displayed in the preview
            @public  
        */
        public OpenPreview(poi: App.Models.PointOfInterest, show: Boolean) {


            var content = this.getPreview(poi);

            var poiPrev = $("#poiPreview");
            poiPrev.html(content);

            if (show)
                $("#poiPreview").show();
        }

        private getPreview(poi: App.Models.PointOfInterest): JQuery {
            var keys = templateProvider.getReplacementKeys(poi);

            var content = $(templateProvider.getTemplate(config.templatePOIPreview, keys));

            content.find("#titleAndMediaIcons").append("<img src='" + poi.iconGenreURL() + "' class='mediaImage left' />");

            for (var i in poi.iconMediaTypeURL()) {
                content.find("#titleAndMediaIcons").append("<img src='" + poi.iconMediaTypeURL()[i] + "' class='mediaImage left' />");
            }

            var poiName = this.highlightWord(poi.name(), poi);
            content.find("#poiName").append(poiName);

            var poiIngress = this.highlightWord(poi.GetFormatedIngress(), poi);
            content.siblings("#ingressPanel").append(poiIngress);

            //phoneGapProvider.fixALinksIfPhoneGap(content);

            // Hook up actions
            content.find("#closePreviewBtn").mousedown(() => {
                this.hidePoiPreview();
            });

            content.find("#openDetailBtn").mousedown(() => {
                this.hidePoiPreview();
                this.OpenDetail(poi);
            });

            return content;
        }

        /**
            Opens the POI Detail inside the poi view
            @method App.Controllers.PoiController#OpenDetail
            @param {App.Models.PointOfInterest} poi Poi to be displayed in the poiView
            @public  
        */
        public OpenDetail(poi: App.Models.PointOfInterest) {
            log.debug("PoiController", "OpenDetail");

            historyController.addToCurrentSnapshot({ POI: poi.getHashCode() });

            $("#poiPreview #openDetailBtn").hide();

            // HEADER 
            var poiViewHeader = $("<div id='poiViewHeader' class='clearfix'></div>");
            var previewContent = this.getPreview(poi);
            previewContent.find("#openDetailBtn").hide();
            previewContent.siblings("#ingressPanel").hide();

            poiViewHeader.append(previewContent);

            //
            // BODY
            var poiViewBody = $(templateProvider.getTemplate(config.templatePOIDetailsView, templateProvider.getReplacementKeys(poi)));

            // adding POI values
            var poiIngress = this.highlightWord(poi.ingress(), poi);
            var poiDescription = this.highlightWord(poi.description(), poi);
            var poiTags = this.highlightWord(poi.tags(), poi);
            var poiTopics = this.highlightWord(poi.topics(), poi);
            var poiYear = this.highlightWord(poi.year(), poi);
            var poiOwner = this.highlightWord(poi.owner(), poi);
            var poiInstitusjon = this.highlightWord(poi.institution(), poi);
            var poiCreator = this.highlightWord(poi.creator(), poi);

            poiViewBody.find("#poiIngressText").append(poiIngress);
            poiViewBody.find("#poiDescriptionText").append(poiDescription);
            poiViewBody.find("#poiTagsText").append(poiTags);
            poiViewBody.find("#poiTopicsText").append(poiTopics);
            poiViewBody.find("#poiYearText").append(poiYear);
            poiViewBody.find("#poiOwnerText").append(poiOwner);
            poiViewBody.find("#poiInstitusjonText").append(poiInstitusjon);
            poiViewBody.find("#poiCreatorText").append(poiCreator);

            poiViewBody.find("#poiDescriptionText").find("a").addClass("external");

            //
            // VIEW
            var poiView = $("#poiView");
            poiView.html('');
            poiView.append(poiViewHeader);
            poiView.append(poiViewBody);
            //phoneGapProvider.fixALinksIfPhoneGap(poiView);

            // Show view
            viewController.selectView("poiView");

            //check mediatypes of POI to show the appropriate viewers
            $.each(poi.mediaTypes(), (k, v: string) => {
                v = v.toUpperCase();

                if (v == "VIDEO" && poi.videoUri())
                    this.showVideo(poi.videoUri());
                if (v == "SOUND" || poi.soundUri())
                    this.showAudio(poi.soundUri());
                if (v == "IMAGE" || poi.thumbnail() != "")
                    this.showImage(poi.thumbnail());
            });

            //var detailAccordion = poiView.find("#detailAccordion");
            //detailAccordion.accordion({ active: false, collapsible: false });
            ////Todo: fix this later
            //detailAccordion.accordion("option", "icons", { 'header': 'showMoreAccordion', 'activeHeader': 'showLessAccordion' });
            //poiView.find('#detailAccordion .ui-accordion-content').show();
            var addPoiToRouteForm = poiView.find("#addPoiToRouteForm");
            var listExistingRoutes = poiView.find("#listExistingRoutes");
            

            //return to previous view when closing the dialog, should this be handled some other way,
            //such as placing the poiview on top of current view instead? how?
            poiView.find("#closePreviewBtn").mousedown(() => {
                viewController.goBack();
            });
            //poiView.dialog();

        }


        private highlightWord(text: string, poi: App.Models.PointOfInterest): string {
            var color = "yellow";
            var onlyFromBeginning = false;

            if (poi.source() === "norvegiana")
                onlyFromBeginning = true;

            return stringUtils.highlightWord(text, searchController.searchCriteria.query(), color, onlyFromBeginning);
        }

        /**
            Close the poi view, return to the previous view. Reset values in poiview and hide other related parts.
            @method App.Controllers.PoiController#closeDetail
            @public     
        */
        public closeDetail() {
            historyController.addToCurrentSnapshot({ POI: null });
            $("#poiPreview").removeClass("poiPreviewActiveDetail");
            $("#poiPreview #openDetailBtn").show();
            this.clearDetail();
            this.resetDetail();
            this.clearView();
        }

        private clearDetail() {
            var poiDetail = $("#poiDetail");
            poiDetail.find("#poiThumbnail").attr("src", "-");
            poiDetail.find("#poiDetailLicense").html("");
            poiDetail.find("#poiDetailTags").html("");
            poiDetail.find("#poiIngress").html("");
            poiDetail.find("#poiDescription").html("");
            poiDetail.find("#poiAboutData").html("");
            poiDetail.find("#poiRelatedLinks").html("");
        }

        private clearView() {
            var poiView = $("#poiView");
            poiView.html("");
        }

        private showVideo(paths: string[]) {
            log.debug("PoiController", "Setting video URL: " + paths);

            var videoDiv = $("#poiVideo");
            videoDiv.html('');

            var playerCount = 1;

            for (var key in paths) {
                var path = paths[key];

                var pathUrl = $.url(path);
                var hostName: string = pathUrl.attr('host').toLowerCase();


                // Android Video Player
                if (compatibilityInfo.isAndroid) {
                    log.debug("PoiController", "Showing video player for Android devices");

                    if (stringUtils.endsWith(hostName, "vimeo.com") && hostName != "player.vimeo.com") {
                        var videoID = $.url(path).attr("directory");
                        path = "http://player.vimeo.com/video" + videoID;
                    }

                    var player = $('<img id="playVideo" src="' + config.poiVideoPlayerIconAndroid + '" class="middle"/>');
                    //player.mousedown(path, function (event: JQueryMouseEventObject) {
                    //    phoneGapProvider.playVideo(event.data);
                    //});

                    videoDiv.append(player);
                }

                // Embedded Youtube
                else if (stringUtils.endsWith(hostName, "youtube.com")) {
                    // http://www.youtube.com/watch?v=r_GS0e3DDpY
                    // http://www.youtube.com/embed/r_GS0e3DDpY
                    // //www.youtube.com/embed/r_GS0e3DDpY

                    if (!stringUtils.startsWith(pathUrl.attr('directory').toLowerCase(), "/embed")) {
                        var videoID = $.url(path).param("v");
                        path = "http://www.youtube.com/embed/" + videoID;
                    }

                    var player = $("<div class='embedded-player'><iframe width='300' height='169' src='" + path + "' frameborder='0' allowfullscreen></iframe></div>");
                    videoDiv.append(player);
                }

                // Embedded Vimeo
                else if (stringUtils.endsWith(hostName, "vimeo.com")) {
                    // http://vimeo.com/21842053
                    // http://player.vimeo.com/video/VIDEO_ID
                    // //player.vimeo.com/video/VIDEO_ID

                    if (hostName != "player.vimeo.com") {
                        var videoID = $.url(path).attr("directory");
                        path = "http://player.vimeo.com/video" + videoID;
                    }

                    var player = $("<div class='embedded-player'><iframe src='" + path + "' width='300' height='169' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>");
                    videoDiv.append(player);
                }

                // Default Video Player
                else {
                    // Clone and set container ID
                    var container = $("#jp_container_").clone();
                    container.attr("id", "jp_container_" + playerCount);

                    // Set player ID and media url
                    var player = $("#jquery_jplayer_", container);
                    player.attr("id", "jquery_jplayer_" + playerCount);
                    player.attr("media-url", path);

                    videoDiv.append(container);
                    player.jPlayer({
                        ready: function () {
                            $(this).jPlayer("setMedia", {
                                m4v: $(this).attr("media-url")
                            });
                        },
                        play: function () {
                            $(this).jPlayer("pauseOthers");
                        },
                        supplied: "m4v",
                        solution: 'html',
                        cssSelectorAncestor: "#jp_container_" + playerCount,
                        fullScreen: true,
                        volume: 1,
                        size: {
                            width: "290px",
                            height: "225px",
                            cssClass: "jp-video-custom"
                        }
                    });
                    //});

                    videoDiv.append("<br />");
                }

                playerCount++;
            }

            videoDiv.show();
        }

        private showAudio(paths: string[]) {
            log.debug("PoiController", "Setting audio URL: " + paths);

            var audioDiv = $("#poiAudio");
            audioDiv.html('');

            var playerCount = 1;

            for (var key in paths) {
                var path = paths[key];

                // Clone and set container ID
                var container = $("#jp_audio_container_").clone();
                container.attr("id", "jp_audio_container_" + playerCount);

                // Set player ID and media url
                var player = $("#jquery_audio_jplayer_", container);
                player.attr("id", "jquery_audio_jplayer_" + playerCount);
                player.attr("media-url", path);

                audioDiv.append(container);
                player.jPlayer({
                    ready: function () {
                        $(this).jPlayer("setMedia", {
                            mp3: $(this).attr("media-url")
                        });
                    },
                    play: function () {
                        $(this).jPlayer("pauseOthers");
                    },
                    supplied: "mp3",
                    solution: 'html',
                    cssSelectorAncestor: "#jp_audio_container_" + playerCount,
                    cssSelector: { gui: '.jp_gui' },
                    volume: 1,
                    size: {
                        cssClass: "jp-audio-custom"
                    }
                });

                playerCount++;
            }

            audioDiv.show();
        }

        private showImage(images: any) {
            if (!images || images.toString().length == 0)
                return;

            $("#poiThumbnail").attr("src", images[0].toString()).show();
            $("#poiImage").show();
            if (images.length > 1) {
                $("#poiImage").append('<p class="centered">Trykk på bilde for å se flere</p>');
            }
            //var imagesArray = images.split[','];


            $("#poiImage").mousedown(function (e) {
                e.preventDefault();

                var array = [];


                $.each(images, function (k, v: string) {
                    array.push({ href: v, title: "" });
                });

                $.swipebox(array);
            });
        }

        private resetDetail() {
            $(".jp-jplayer").jPlayer("stop");

            $("#jPlayerAudioDiv").hide();
            $("#poiVideo").hide();
            $("#poiAudio").hide();
            $("#poiImage").hide();
            $("#addPoiToRouteForm").hide();
            var _this = this;
            _this.hidePoiPreview();
            $("#closePreviewBtn").mousedown(function () { _this.hidePoiPreview(); });
        }

        /**
            Close poi preview
            @method App.Controllers.PoiController#hidePoiPreview
            @public     
        */
        public hidePoiPreview() {
            $("#poiPreview").hide();
            mapController.resetClickedPois();
        }
        public hidePoiPreviewOnly() {
            $("#poiPreview").hide();
        }

        /**
            Close poi dialog
            @method App.Controllers.PoiController#hidePoiDialogues
            @public     
        */
        public hidePoiDialogues() {
            this.hidePoiPreview();
        }
    }


}
var poiController = new App.Controllers.PoiController();
startup.addPreInit(function () { poiController.PreInit(); }, "PoiController");
startup.addInit(function () { poiController.Init(); }, "PoiController");