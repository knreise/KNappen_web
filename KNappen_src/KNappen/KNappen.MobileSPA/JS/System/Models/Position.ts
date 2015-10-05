/// <reference path="../_references.ts" />

/**
    Models
    @namespace System.Models
*/
module System.Models {

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

    export class Position {

        public lat: KnockoutObservable<number>;
        public lon: KnockoutObservable<number>;
        public alt: KnockoutObservable<number>;
        public acc: KnockoutObservable<number>;

        public altitudeAccuracy: KnockoutObservable<number>;
        public heading: KnockoutObservable<number>;
        public speed: KnockoutObservable<number>;
        public timestamp: KnockoutObservable<Date>;

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
        constructor(lat: number, lon: number, alt?: number, acc?: number, altitudeAccuracy?: number, heading?: number, speed?: number, timestamp?: number) {
            this.lat = ko.observable(lat);
            this.lon = ko.observable(lon);
            this.alt = ko.observable(alt);
            this.acc = ko.observable(acc);

            this.altitudeAccuracy = <any>ko.observable();
            this.heading = <any>ko.observable();
            this.speed = <any>ko.observable();
            this.timestamp = <any>ko.observable();
        }

        public toString(): string {
            return "lat: " + (this.lat() || "NA")
                + ", lon: " + (this.lon() || "NA")
                + ", alt: " + (this.alt() || "NA")
                + ", acc: " + (this.acc() || "NA");
        }
    }
}