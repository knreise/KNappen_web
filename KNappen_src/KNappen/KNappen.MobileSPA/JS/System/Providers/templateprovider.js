/// <reference path="../_references.ts" />
/**
    System provider modules
    @namespace System.Providers
*/
var System;
(function (System) {
    var Providers;
    (function (Providers) {
        var TemplateProvider = (function () {
            /**
              * TemplateProvider
              * @class System.Providers.TemplateProvider
              * @classdesc Provides (early) download and variable replacement/processing of templates such as HTML/text
              */
            function TemplateProvider() {
                this.templates = {};
            }
            /**
              * Queue template for download. None of the callbacks are required, can be set to null.
              * @method System.Providers.TemplateProvider#queueTemplateDownload
              * @param {string} name Filename of template to download (relative to ./templates/ folder as set in ConfigBase)
              * @param {function} doneCallback Callback if success: function (data) {}
              * @param {function} failCallback Callback if failure: function (message) {}
              * @param {function} alwaysCallback Callback when done (success or error): function() {}
              */
            TemplateProvider.prototype.queueTemplateDownload = function (name, doneCallback, failCallback, alwaysCallback) {
                if (doneCallback === void 0) { doneCallback = null; }
                if (failCallback === void 0) { failCallback = null; }
                if (alwaysCallback === void 0) { alwaysCallback = null; }
                log.debug("TemplateProvider", "Queued template for download: " + name);
                var _this = this;
                if (!stringUtils.endsWith(config.TemplateProviderFolder, "/") && !stringUtils.startsWith(name, "/"))
                    name = "/" + name;
                var fullName = config.TemplateProviderFolder + name;
                if (compatibilityInfo.isAndroid) {
                    fullName = "file:///" + ("android_asset/world/KNappen/Templates/" + name);
                }
                var item = new System.Providers.HttpDownloadItem(name, fullName, function _doneCallback(data) {
                    log.debug("TemplateProvider", "Success downloading template " + name);
                    _this.setTemplate(name, data);
                    if (doneCallback)
                        doneCallback(data);
                }, function _failCallback(message) {
                    log.error("TemplateProvider", "Error downloading template " + name + " (" + fullName + "): " + message);
                    if (failCallback)
                        failCallback(message);
                }, function _alwaysCallback() {
                    if (alwaysCallback)
                        alwaysCallback();
                }, "html");
                httpDownloadProvider.enqueueItem("Templates", System.Providers.HttpDownloadQueuePriority.High, item);
            };
            /**
              * Set a template
              * @method System.Providers.TemplateProvider#setTemplate
              * @param {string} name Filename of template to set.
              * @param {string} content Content of template.
              */
            TemplateProvider.prototype.setTemplate = function (name, content) {
                log.debug("TemplateProvider", "Setting template: " + name);
                this.templates[name.toUpperCase()] = content;
            };
            /**
              * Get a template. Supports $[key] replacement as well as $T[text] translation based on currently loaded translation.
              * @method System.Providers.TemplateProvider#getTemplate
              * @param {string} name Filename of template to get.
              * @param {array} replacement Key/value dictionary of keys to be replaced by $[key] strings in template
              * @returns {string} Content with replacement done.
              */
            TemplateProvider.prototype.getTemplate = function (name, replacement) {
                if (replacement === void 0) { replacement = null; }
                var ret = this.templates[name.toUpperCase()];
                if (!ret) {
                    log.error("TemplateProvider", "Template " + name + " does not exist.");
                    return "";
                }
                ret = translater.translateSubString(ret);
                if (replacement) {
                    ret = ret.replace(/\$\[([^\]]+)\]/gm, function (fullMatch, match, offset) {
                        var r = replacement[match];
                        // If it is a method, execute it
                        if (typeof r === "function")
                            r = r();
                        return r;
                    });
                    ret = ret.replace(/\$IF(\(\![\s\S]*?)\$ENDIF/gm, function (fullMatch, match, offset) {
                        var v = match.replace(/^\(\!([^\)]+)\)[\s\S]*/gm, "$1");
                        var r = replacement[v];
                        // If it is a method, execute it
                        if (typeof r === "function")
                            r = r();
                        if (!r)
                            return match.replace(/^\([^\)]+\)([\s\S]*)/gm, "$1");
                        return "";
                    });
                    ret = ret.replace(/\$IF(\([\s\S]*?)\$ENDIF/gm, function (fullMatch, match, offset) {
                        var v = match.replace(/^\(([^\)]+)\)[\s\S]*/gm, "$1");
                        var r = replacement[v];
                        // If it is a method, execute it
                        if (typeof r === "function")
                            r = r();
                        if (r)
                            return match.replace(/^\([^\)]+\)([\s\S]*)/gm, "$1");
                        return "";
                    });
                }
                log.debug("TemplateProvider", "Returning template: " + name);
                return ret;
            };
            /**
              * Get replacement keys. Will copy any object as well as config (prefixed with config.) into a dictionary for use with template replacement. Understands and extracts Knockout.
              * @method System.Providers.TemplateProvider#getReplacementKeys
              * @param {any} obj Object to kopy into key/value dictionary. Can contain Knockout-properties.
              * @returns {any}
              */
            TemplateProvider.prototype.getReplacementKeys = function (obj) {
                // Create replacement keys by copying POI into them first
                var keys = {};
                $.each(obj, function (k, v) {
                    keys[k] = v;
                });
                // Then copy in config, just in case. Prefix with "config."
                $.each(config, function (k, v) {
                    keys["config." + k] = v;
                });
                return keys;
            };
            return TemplateProvider;
        })();
        Providers.TemplateProvider = TemplateProvider;
    })(Providers = System.Providers || (System.Providers = {}));
})(System || (System = {}));
var templateProvider = new System.Providers.TemplateProvider();
