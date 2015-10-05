/**
    Model modules
    @namespace App.Models
*/
var App;
(function (App) {
    var Models;
    (function (Models) {
        var MapType;
        (function (MapType) {
            MapType[MapType["Norges_Grunnkart"] = 1] = "Norges_Grunnkart";
            MapType[MapType["Matrikkel_Bakgrunn"] = 2] = "Matrikkel_Bakgrunn";
        })(MapType || (MapType = {}));
        var ZoomLevel;
        (function (ZoomLevel) {
            ZoomLevel[ZoomLevel["Close"] = 1] = "Close";
            ZoomLevel[ZoomLevel["Medium"] = 2] = "Medium";
            ZoomLevel[ZoomLevel["Far"] = 3] = "Far";
        })(ZoomLevel || (ZoomLevel = {}));
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
