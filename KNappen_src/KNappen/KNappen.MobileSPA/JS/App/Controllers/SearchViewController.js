var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var SearchViewController = (function () {
            function SearchViewController() {
            }
            SearchViewController.prototype.Init = function () {
                var _this = this;
                viewController.addSelectEvent(function (event, oldView, newView) {
                    if (newView.name == "searchView") {
                        _this.updateDropdowns();
                    }
                });
            };
            SearchViewController.prototype.updateDropdowns = function () {
                var _this = this;
                var ddlGenre = $("#ddlSearchGenre");
                var ddlMediaType = $("#ddlSearchMediaType");
                // Genre dropdown 
                var genreVal = ddlGenre.val();
                ddlGenre.html('<option value="*">Alle sjangre</option>');
                $.each(pointOfInterestTypeProvider.getGenres(), function (k, v) {
                    log.debug("SearchViewController", "Genre: text: " + v.text + ", type: " + v.type);
                    var sel = "";
                    if (genreVal == v.type)
                        sel = "SELECTED";
                    if (v.type != "*")
                        ddlGenre.append('<option value=' + v.type + ' ' + sel + '>' + v.text + '</option>');
                });
                // Mediatype dropdown
                var mediaVal = ddlMediaType.val();
                ddlMediaType.html('<option value="*">Alle medietyper</option>');
                $.each(pointOfInterestTypeProvider.getMediaTypes(), function (k, v) {
                    log.debug("SearchViewController", "MediaType: text: " + v.text + ", type: " + v.type);
                    var sel = "";
                    if (mediaVal == v.type)
                        sel = "SELECTED";
                    if (v.type != "*")
                        ddlMediaType.append('<option value=' + v.type + ' ' + sel + '>' + v.text + '</option>');
                });
            };
            return SearchViewController;
        })();
        Controllers.SearchViewController = SearchViewController;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var searchViewController = new App.Controllers.SearchViewController();
startup.addInit(function () { searchViewController.Init(); }, "SearchViewController");
