/// <reference path="../_references.ts" />
/**
    GUI modules
    @namespace
*/
var System;
(function (System) {
    var GUI;
    (function (GUI) {
        var ViewControllerItem = (function () {
            /**
                ViewControllerItem
                @class System.GUI.ViewControllerItem
                @classdesc Creates an instance of a ViewController item (a page).
            */
            function ViewControllerItem() {
            }
            return ViewControllerItem;
        })();
        GUI.ViewControllerItem = ViewControllerItem;
        var ViewController = (function () {
            /**
                ViewController
                @class System.GUI.ViewController
                @classdesc Creates an instance of a ViewController
            */
            function ViewController() {
                /** @ignore */ this.knownViews = {};
                this.viewHistory = [];
                this._this = $(this);
                var _this = this;
                //window.onhashchange = function () { _this.processUrl(); };
            }
            ///**
            //    processUrl        
            //    @method System.GUI.ViewController#processUrl
            //    @type bool
            //    @public
            //*/
            //public processUrl(): System.GUI.ViewControllerItem {
            //    var hash: string = location.hash;
            //    if (hash.indexOf("#") < 0)
            //        return null;
            //    var id = hash.replace('#', '');
            //    log.debug("ViewController", "Hash navigation: " + id);
            //    return this.openView(id);
            //}
            /**
                Add a view to the ViewController.
                @method System.GUI.ViewController#AddView
                @param {string} name The ID of the DOMElement, for example the ID of the DIV tag.
                @public
              */
            ViewController.prototype.AddView = function (name) {
                log.debug("ViewController", "Adding view: " + name);
                var v = new System.GUI.ViewControllerItem();
                v.name = name;
                v.item = $("#" + name);
                if (!v.item) {
                    // Sanity check
                    log.error("ViewController", "View '" + name + "' not found.");
                    return;
                }
                this.knownViews[name] = v;
            };
            /**
                Return all known views.
                @method System.GUI.ViewController#getViews
                @returns {Array} A hash of all known ViewControllerItem.
                @public
              */
            ViewController.prototype.getViews = function () {
                return this.knownViews;
            };
            ViewController.prototype.goBack = function () {
                log.debug("ViewController", "goBack: History length: " + this.viewHistory.length);
                if (this.viewHistory.length < 1)
                    return false;
                var view = this.viewHistory.pop();
                if (view && view.name) {
                    this.openView(view.name);
                    log.debug("ViewController", "goBack: Last page: " + view.name);
                    return true;
                }
                log.debug("ViewController", "goBack: No more history items.");
                return false;
            };
            /**
                Return current view.
                @method System.GUI.ViewController#getCurrentView()
                @returns ViewControllerItem Name of current view.
                @public
              */
            ViewController.prototype.getCurrentView = function () {
                return this.currentView;
            };
            /**
                Return previous view.
                @method System.GUI.ViewController#getOldView
                @returns ViewControllerItem Name of old view.
                @public
              */
            ViewController.prototype.getOldView = function () {
                return this.oldView;
            };
            /**
                Select a new view.
                @method System.GUI.ViewController#selectView
                @param {string} name The ID of the DOMElement, for example the ID of the DIV tag.
                @param {boolean} force Force view to be executed (if same as current view)
                @public
              */
            ViewController.prototype.selectView = function (name, force, recordInUrlHistory) {
                if (force === void 0) { force = false; }
                if (recordInUrlHistory === void 0) { recordInUrlHistory = true; }
                if (this.mainMenuOpen(name))
                    return null; // If main menu is open and then selected again, close the menu.
                var oldView = this.oldView;
                var view = this.openView(name, force);
                this.addOldViewToHistory();
                if (recordInUrlHistory && (!this.oldView || this.oldView.name != view.name))
                    historyController.addHistorySnapshot();
                //historyController.addToCurrentSnapshot({View: name});
                return view;
            };
            //public selectViewWithoutHistory(name: string, force: boolean = false): void {
            //    if (this.mainMenuOpen(name))
            //        return null; // If main menu is open and then selected again, close the menu.
            //    this.openView(name, force);
            //}
            ViewController.prototype.mainMenuOpen = function (selectedViewName) {
                if (this.currentView && this.currentView.name === "mainMenu" && selectedViewName === "mainMenu") {
                    this.goBack();
                    return true;
                }
                return false;
            };
            ViewController.prototype.addOldViewToHistory = function () {
                if (this.oldView && this.oldView.name === "mainMenu")
                    return; // Do not add main menu to the history when we navigate to another view.
                if (this.oldView)
                    this.viewHistory.push(this.oldView);
                while (this.viewHistory.length > config.maxViewControllerBackHistory) {
                    this.viewHistory.shift();
                }
            };
            ViewController.prototype.openView = function (name, force) {
                if (force === void 0) { force = false; }
                var view = this.knownViews[name];
                if (!view) {
                    // Sanity check
                    log.error("ViewController", "selectView: View '" + name + "' does not exist.");
                    return null;
                }
                log.debug("ViewController", "selectView: View '" + name + "' selected.");
                // Do not execute if same page
                if (this.currentView && this.currentView.name == name && !force)
                    return this.currentView;
                this.oldView = this.currentView;
                // Do selection
                this.doPreSelectEvent(this.oldView, view);
                this.currentView = view;
                this.hideAllViews();
                view.item.show();
                this.doSelectEvent(this.oldView, view);
                this.doPostSelectEvent(this.oldView, view);
                window.scrollTo(0, 0);
                return this.currentView;
            };
            /** @ignore */
            ViewController.prototype.hideAllViews = function () {
                $.each(this.knownViews, function (k, v) {
                    //log.verboseDebug("ViewController", "Hiding: " + k);
                    v.item.hide();
                });
            };
            //
            // Type safe event system
            //
            /**
                Hook up to PreSelectView event.
                @method System.GUI.ViewController#addPreSelectEvent
                @param {eventCallback} Callback function with signature "function (event: JQueryEventObject, oldView: System.GUI.ViewControllerItem, newView: System.GUI.ViewControllerItem) {}" (or just "function (event, oldView, newView) {}" in JS).
                @public
            */
            ViewController.prototype.addPreSelectEvent = function (eventCallback) {
                this._this.on('PreSelectView', eventCallback);
            };
            /**
                Hook up to SelectView event.
                @method System.GUI.ViewController#addSelectEvent
                @param {eventCallback} Callback function with signature "function (event: JQueryEventObject, oldView: System.GUI.ViewControllerItem, newView: System.GUI.ViewControllerItem) {}" (or just "function (event, oldView, newView) {}" in JS).
                @public
            */
            ViewController.prototype.addSelectEvent = function (eventCallback) {
                this._this.on('SelectView', eventCallback);
            };
            /**
                Hook up to PostSelectView event.
                @method System.GUI.ViewController#addPostSelectEvent
                @param {eventCallback} Callback function with signature "function (event: JQueryEventObject, oldView: System.GUI.ViewControllerItem, newView: System.GUI.ViewControllerItem) {}" (or just "function (event, oldView, newView) {}" in JS).
                @public
            */
            ViewController.prototype.addPostSelectEvent = function (eventCallback) {
                this._this.on('PostSelectView', eventCallback);
            };
            /** @ignore */
            ViewController.prototype.doPreSelectEvent = function (oldView, newView) {
                this._this.trigger('PreSelectView', [oldView, newView]);
            };
            /** @ignore */
            ViewController.prototype.doSelectEvent = function (oldView, newView) {
                this._this.trigger('SelectView', [oldView, newView]);
            };
            /** @ignore */
            ViewController.prototype.doPostSelectEvent = function (oldView, newView) {
                this._this.trigger('PostSelectView', [oldView, newView]);
            };
            return ViewController;
        })();
        GUI.ViewController = ViewController;
    })(GUI = System.GUI || (System.GUI = {}));
})(System || (System = {}));
var viewController = new System.GUI.ViewController();
