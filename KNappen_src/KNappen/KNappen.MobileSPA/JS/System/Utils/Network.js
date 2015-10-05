/// <reference path="../_references.ts" />
/**
    Provider modules
    @namespace System.Utils
*/
var System;
(function (System) {
    var Utils;
    (function (Utils) {
        var Network = (function () {
            /**
              * Network
              * @class System.Utils.Network
              * @classdesc Information about network conectivity.
              */
            function Network() {
                this.networkErrorToken = undefined;
            }
            /**
              * Checks if there is a network connection.
              * @method System.Utils.Network#isConnected
              * @returns {boolean} True if there is a connection, otherwise false. This will always return true on non-mobile devices.
              */
            Network.prototype.isConnected = function () {
                var nav = navigator;
                if (nav.network)
                    return (nav.network.connection.type !== Connection.NONE);
                return true; // Assume network conectivity on non-mobile devices.
            };
            /**
              * Displays an no-connection error.
              * @method System.Utils.Network#displayNetworkError
              */
            Network.prototype.displayNetworkError = function () {
                if (this.networkErrorToken)
                    clearTimeout(this.networkErrorToken);
                // Bundle errors to only show one.
                this.networkErrorToken = setTimeout(function () {
                    userPopupController.sendError(tr.translate("Network"), tr.translate("No connection"));
                }, 250);
            };
            return Network;
        })();
        Utils.Network = Network;
    })(Utils = System.Utils || (System.Utils = {}));
})(System || (System = {}));
var networkHelper = new System.Utils.Network();
