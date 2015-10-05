

/**
    Controller modules
    @namespace App.Controllers
*/
module App.Controllers {
    export class HistoryController {

        private lastSnapshotObject: any;
        public restoredState: any;
        private ignoreNextUpdate: boolean;
        private enabled: boolean = true; // For easy debugging with history disabled

        /**
            HistoryController
            @class App.Controllers.HistoryController
            @classdesc This class controls browser history
        */
        constructor() {
            startup.addInit(() => { historyController.Init(); }, "HistoryController");
            startup.addStartupDone(() => { historyController.StartupDone(); }, "HistoryController");
        }

        /**
            Adds an event to the ViewController to report page visits with Google Analytics when a new view is selected
            @method App.Controllers.GoogleAnalyticsController#Init
            @public
        */
        public Init() {
            if (this.enabled)
                $(window).bind("hashchange", function (e) { historyController.historyCallback(<any>e); });
        }

        public StartupDone() {
            this.historyCallback(null);
        }

        public addHistorySnapshot() {
            if (!this.enabled)
                return;
            //historyController.ignoreNextUpdate = true;
            // We don't add mainMenu/poiView to history
            var viewObj = viewController.getCurrentView();
            if (!viewObj)
                return;
            var view = viewObj.name;
            if (view === "mainMenu" || view === "poiView")
                return;

            var snapshotObject = {
                view: view,
                mapType: mapController.mapProvider.mapType,
                searchCriteria: serializer.serializeKnockoutObject(searchController.searchCriteria)
            }

            // If its the same as last we ignore it
            var json = JSON.stringify(snapshotObject);
            if (historyController.lastSnapshotObject === json)
                return;
            historyController.lastSnapshotObject = json;

            //debugger;
            // Add to history
            debugger;
            $.bbq.pushState(snapshotObject, 2); // merge_mode=2 means wipe out other params (e.g. level2)
            log.debug("HistoryController", "Set history item: View: " + snapshotObject.view + ", SearchCriteria: " + snapshotObject.searchCriteria);
        }


        public addToCurrentSnapshot(object: any) {
            if (!this.enabled)
                return;

            historyController.ignoreNextUpdate = true;
            log.verboseDebug("HistoryController", "Added arguments: " + JSON.stringify(object));
            $.bbq.pushState(object, 0); // merge_mode=0 means params in the params argument will override any params in the current state
        }

        private historyCallback(e: JQueryBbq.EventObject) {

            historyController.restoredState = $.bbq.getState();

            if (historyController.ignoreNextUpdate) {
                log.debug("HistoryController", "Ignored next update.");
                historyController.ignoreNextUpdate = false;
                return;
            }

            log.debug("HistoryController", "Restoring history item: " + JSON.stringify(historyController.restoredState));

            //var searchCriteria = new Models.SearchCriteria();
            var scJson = $.bbq.getState("searchCriteria");
            if (!scJson)
                return;
            serializer.deserializeKnockoutObject(scJson, searchController.searchCriteria);

            var view = $.bbq.getState("view");
            if (view)
                viewController.selectView(view, false, false);

            var mapType = $.bbq.getState("mapType");
            if (mapType && mapType != mapController.mapProvider.mapType)
                mapController.mapProvider.changeLayer(mapType);

            log.debug("HistoryController", "Restored history item: View: " + view + ", MapType: " + mapType + ", SearchCriteria: " + scJson);


            // Perform new search
            //searchController.searchCriteria = searchCriteria;
            searchController.doHistorySearch();
        }

    }
}
var historyController = new App.Controllers.HistoryController();
