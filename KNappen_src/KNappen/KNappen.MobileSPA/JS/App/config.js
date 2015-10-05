var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
    App
    @namespace App
*/
var App;
(function (App) {
    var Config = (function (_super) {
        __extends(Config, _super);
        function Config() {
            _super.apply(this, arguments);
            //if user does not have gps pos, start here by default (oslo sentrum)
            this.mapStartPos = new System.Models.Position(59.9122, 10.7517);
            this.mapCenterMarker = "Content/images/AppIcons/mapMarker.png";
            this.mapSearchLocationMarker = "Content/images/AppIcons/mapMarker_active.png";
            this.poiVideoPlayerIconAndroid = "Content/images/AppIcons/video_Play.png";
            this.norvegianaAutoRetryDelaySeconds = 10;
            this.norvegianaAutoRetryCount = 3;
            this.norvegianaSearchTimeoutSeconds = 30;
            this.searchTimeoutSeconds = 30;
            this.searchCountMultiplier = 1;
            this.norvegianaURL = 'http://kulturnett2.delving.org/api/search';
            this.ssrURL = 'https://ws.geonorge.no/SKWS3Index/ssr/sok';
            this.templatePOIDetailsView = "Views/POIDetails.html";
            this.templateAboutView = "Views/About.html";
            this.templatePOIPreview = "POIPreview.html";
            this.templatePOIAR = "POIAR.html";
            // For "prod"
            //public routeAdminIndexUrl: string = "http://knappen.kodeogdemo.no:8081/knappenservice/api/RouteIndex";
            //public routeAdminDownloadUrl: string = "http://knappen.kodeogdemo.no:8081/knappenservice/api/Route";
            //public poiTypeDataUrl: string = "http://knappen.kodeogdemo.no:8081/knappenservice/FileService.aspx?file=TypeInfo.json";
            //public feedbackUrl: string = "http://knappen.kodeogdemo.no:8081/knappenservice/api/Feedback";
            //public adminRouteUrl: string = "http://knappen.kodeogdemo.no:8081/knappenservice/api/Route";
            //public webProxy: string = "http://knappen.kodeogdemo.no:8081/knappenservice/WebProxy.aspx?url=";
            this.numSearchProviders = 3;
            this.digitalArkivetPropertyCategory = "Folketelling";
        }
        return Config;
    })(System.ConfigBase);
    App.Config = Config;
})(App || (App = {}));
var config = new App.Config();
