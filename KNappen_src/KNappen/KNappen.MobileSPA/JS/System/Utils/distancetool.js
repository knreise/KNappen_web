/// <reference path="../_references.ts" />
/**
    Distance calculating
    @namespace System.Utils
*/
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        var DistanceTool = (function () {
            function DistanceTool() {
            }
            DistanceTool.prototype.GetDistanceFromLatLon = function (poiLatlon, currentLatLon) {
                var _this = this;
                var R = 6371;
                var dLat = _this.deg2rad(poiLatlon.lat() - currentLatLon.lat());
                var dLon = _this.deg2rad(poiLatlon.lon() - currentLatLon.lon());
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(_this.deg2rad(poiLatlon.lat())) * Math.cos(_this.deg2rad(currentLatLon.lat())) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var distance = R * c; //distance in km
                return distance;
            };
            DistanceTool.prototype.deg2rad = function (deg) {
                return deg * (Math.PI / 180);
            };
            return DistanceTool;
        })();
        Utils.DistanceTool = DistanceTool;
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
var distanceTool = new System.Utils.DistanceTool();
