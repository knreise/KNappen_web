/// <reference path="../_references.d.ts" />
declare module PhoneGap.Providers {
    class GeoLocationProvider {
        lastKnownPosition: any;
        PostInit(): void;
        private UpdateGeoLocation(position);
    }
}
declare var geoLocationProvider: PhoneGap.Providers.GeoLocationProvider;
