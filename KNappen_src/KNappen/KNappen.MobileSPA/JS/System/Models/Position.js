/// <reference path="../_references.ts" />
/**
    Models
    @namespace System.Models
*/
var System;
(function (System) {
    var Models;
    (function (Models) {
        //export interface KnockoutObservablePosition extends KnockoutObservableBase {
        //    lat: KnockoutObservable<number>;
        //    lon: KnockoutObservable<number>;
        //    alt: KnockoutObservable<number>;
        //    acc: KnockoutObservable<number>;
        //    toString(): string;
        //    (): System.Models.Position;
        //    (value: System.Models.Position): void;
        //    subscribe(callback: (newValue: System.Models.Position) => void , target?: any, topic?: string): KnockoutSubscription;
        //    notifySubscribers(valueToWrite: System.Models.Position, topic?: string);
        //}
        var Position = (function () {
            /**
                Position
                @class System.Models.Position
                @classdesc Creates an instance of a position object
                @property {number} lat Latitude
                @property {number} lon Longditude
                @property {number} alt Altitude
                @property {number} acc Accuracy
                @property {number} altitudeAccuracy Altitude accuracy
                @property {number} heading Heading
                @property {number} speed Speed
                @property {number} timestamp Timestamp
              */
            function Position(lat, lon, alt, acc, altitudeAccuracy, heading, speed, timestamp) {
                this.lat = ko.observable(lat);
                this.lon = ko.observable(lon);
                this.alt = ko.observable(alt);
                this.acc = ko.observable(acc);
                this.altitudeAccuracy = ko.observable();
                this.heading = ko.observable();
                this.speed = ko.observable();
                this.timestamp = ko.observable();
            }
            Position.prototype.toString = function () {
                return "lat: " + (this.lat() || "NA")
                    + ", lon: " + (this.lon() || "NA")
                    + ", alt: " + (this.alt() || "NA")
                    + ", acc: " + (this.acc() || "NA");
            };
            return Position;
        })();
        Models.Position = Position;
    })(Models = System.Models || (System.Models = {}));
})(System || (System = {}));
