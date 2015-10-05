/// <reference path="../_References.ts" />

module PhoneGap.Providers {
    export class GeoLocationProvider {
        public lastKnownPosition: any = null;

        public PostInit() {
            log.debug("GeoLocationProvider", "PostInit: watchPosition: " + compatibilityInfo.isMobile);

            if (compatibilityInfo.isMobile) {
                navigator.geolocation.watchPosition(
                    position => {
                        log.verboseDebug("GeoLocationProvider", "Received geolocation: "
                            + 'Latitude: ' + position.coords.latitude + ', '
                            + 'Longitude: ' + position.coords.longitude + ', '
                            + 'Altitude: ' + position.coords.altitude + ', '
                            + 'Accuracy: ' + position.coords.accuracy + ', '
                            + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + ', '
                            + 'Heading: ' + position.coords.heading + ', '
                            + 'Speed: ' + position.coords.speed + ', '
                            + 'Timestamp: ' + new Date(<any>position.timestamp) + '');

                        this.lastKnownPosition = position;
                        try {
                            if (this.lastKnownPosition)
                                this.UpdateGeoLocation(position);

                        } catch (exception) {
                            log.error("GeoLocationProvider", "Exception sending position: " + exception);
                        }
                    },
                    function (error: GeolocationError) {
                        log.error("GeoLocationProvider", "Error getting geolocation: code: " + error.code + ", message: " + error.message);
                    },
                    {
                        frequency: phoneGapInterop.config.locationUpdateRateMs,
                        maximumAge: 60000,
                        timeout: 5000,
                        enableHighAccuracy: true
                    });
            }
        }

        private UpdateGeoLocation(position: Position): void {
            //    phoneGapProvider.callbackGeoLocationUpdate(
            //        position.coords.latitude,
            //        position.coords.longitude,
            //        position.coords.altitude,
            //        position.coords.accuracy,
            //        position.coords.altitudeAccuracy,
            //        position.coords.heading,
            //        position.coords.speed,
            //        <any>position.timestamp);
        }

    }
}

var geoLocationProvider = new PhoneGap.Providers.GeoLocationProvider();
startup.addPostInit(function () { geoLocationProvider.PostInit(); }, "GeoLocationProvider");