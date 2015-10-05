/// <reference path="../_references.ts" />
/**
    System provider modules
    @namespace System.Providers
*/
var System;
(function (System) {
    var Providers;
    (function (Providers) {
        var StorageMetaData = (function () {
            function StorageMetaData() {
                this.changed = "";
            }
            StorageMetaData.prototype.getChanged = function () {
                return moment(this.changed);
            };
            return StorageMetaData;
        })();
        Providers.StorageMetaData = StorageMetaData;
        var StorageProvider = (function () {
            /**
              * StorageProvider
              * @class System.Providers.StorageProvider
              * @classdesc Provides permanent device storage service.
              */
            function StorageProvider() {
                this.hasDatabase = compatibilityInfo.isMobile;
                if (this.hasDatabase) {
                    log.debug("StorageProvider", "Running in PhoneGap (use PhoneGap SQL storage)");
                    this.store = new cache();
                    this.store.setStore(arrayStore);
                }
                else {
                    log.debug("StorageProvider", "Not running in PhoneGap (use localStorage)");
                    this.store = new cache();
                    this.store.setStore(localStorageStore);
                }
            }
            /**
              * Pre-Init Storage Provider
              * @method System.Providers.StorageProvider#preInit
              */
            StorageProvider.prototype.preInit = function () {
                startup.finishedPreInit("StorageProvider");
            };
            /**
              * Store a key-value pair.
              * @method System.Providers.StorageProvider#set
              * @param {string} key Key to use for storage.
              * @param {string} value Value to store.
              */
            StorageProvider.prototype.set = function (key, value) {
                var now = moment().format("X");
                var storageMetaData = new StorageMetaData();
                storageMetaData.changed = now;
                var meta = serializer.serializeJSObject(storageMetaData);
                var old = this.store.get(key);
                this.store.set(key, value);
                this.store.set(key + ".meta", meta);
            };
            /**
              * Store a key-value pair without triggering PhoneGap storage. Used (externally) by PhoneGap to store data in this module.
              * @method System.Providers.StorageProvider#setRaw
              * @param {string} key Key to use for storage.
              * @param {string} value Value to store.
              */
            StorageProvider.prototype.setRaw = function (key, value) {
                log.debug("StorageProvider", "SQL: setRaw: key: " + key);
                this.store.set(key, value);
            };
            /**
              * Get a key-value pair.
              * @method System.Providers.StorageProvider#get
              * @param {string} key Key to retrieve.
              * @returns {string} Data stored in key.
              */
            StorageProvider.prototype.get = function (key) {
                return this.store.get(key);
            };
            /**
              * Remove a key-value pair.
              * @method System.Providers.StorageProvider#remove
              * @param {string} key Key to remove.
              */
            StorageProvider.prototype.remove = function (key) {
                delete this.store.get(key);
                delete this.store.get(key + ".meta");
            };
            /**
              * Check if a key exists.
              * @method System.Providers.StorageProvider#has
              * @param {string} key Key to check for.
              * @returns {bool} True if exists, False if not.
              */
            StorageProvider.prototype.has = function (key) {
                return this.store.has(key);
            };
            return StorageProvider;
        })();
        Providers.StorageProvider = StorageProvider;
    })(Providers = System.Providers || (System.Providers = {}));
})(System || (System = {}));
var storageProvider = new System.Providers.StorageProvider();
startup.addPreInit(function () { storageProvider.preInit(); }, "StorageProvider");
