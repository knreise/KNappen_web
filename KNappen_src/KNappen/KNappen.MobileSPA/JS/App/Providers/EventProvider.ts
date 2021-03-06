
/**
    Providers
    @namespace App.Providers
*/
module App.Providers {

    export class EventProvider_Settings {

        /**
            EventProvider_Settings
            @class App.Providers.EventProvider_Settings
            @classdesc Provides Settings events
        */
        constructor() {
        }

        public onPreLoad = new System.Utils.Event("Settings.PreLoad");
        public onPostLoad = new System.Utils.Event("Settings.PostLoad");
        public onPreSave = new System.Utils.Event("Settings.PreSave");
        public onPostSave = new System.Utils.Event("Settings.PostSave");
    }

    export class EventProvider_MapCache {
        public onCacheEnd = new System.Utils.Event("MapCacheProvider.CacheEnd");
    }

    /**
        EventProvider
        @class App.Providers.EventProvider
        @classdesc Provides events for classes that can't host them by themselves for various reasons.
    */
    export class EventProvider {
        public settings = new App.Providers.EventProvider_Settings();
        public mapCache = new App.Providers.EventProvider_MapCache();
    }
}
var eventProvider = new App.Providers.EventProvider();