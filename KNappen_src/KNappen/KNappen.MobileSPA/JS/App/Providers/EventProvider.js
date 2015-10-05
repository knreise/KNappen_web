/**
    Providers
    @namespace App.Providers
*/
var App;
(function (App) {
    var Providers;
    (function (Providers) {
        var EventProvider_Settings = (function () {
            /**
                EventProvider_Settings
                @class App.Providers.EventProvider_Settings
                @classdesc Provides Settings events
            */
            function EventProvider_Settings() {
                this.onPreLoad = new System.Utils.Event("Settings.PreLoad");
                this.onPostLoad = new System.Utils.Event("Settings.PostLoad");
                this.onPreSave = new System.Utils.Event("Settings.PreSave");
                this.onPostSave = new System.Utils.Event("Settings.PostSave");
            }
            return EventProvider_Settings;
        })();
        Providers.EventProvider_Settings = EventProvider_Settings;
        var EventProvider_MapCache = (function () {
            function EventProvider_MapCache() {
                this.onCacheEnd = new System.Utils.Event("MapCacheProvider.CacheEnd");
            }
            return EventProvider_MapCache;
        })();
        Providers.EventProvider_MapCache = EventProvider_MapCache;
        /**
            EventProvider
            @class App.Providers.EventProvider
            @classdesc Provides events for classes that can't host them by themselves for various reasons.
        */
        var EventProvider = (function () {
            function EventProvider() {
                this.settings = new App.Providers.EventProvider_Settings();
                this.mapCache = new App.Providers.EventProvider_MapCache();
            }
            return EventProvider;
        })();
        Providers.EventProvider = EventProvider;
    })(Providers = App.Providers || (App.Providers = {}));
})(App || (App = {}));
var eventProvider = new App.Providers.EventProvider();
