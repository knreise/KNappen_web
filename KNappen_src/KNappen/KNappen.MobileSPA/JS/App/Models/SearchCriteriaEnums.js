/**
    Model modules
    @namespace App.Models
*/
var App;
(function (App) {
    var Models;
    (function (Models) {
        (function (SearchCriteriaSortingEnum) {
            SearchCriteriaSortingEnum[SearchCriteriaSortingEnum["Distance"] = 0] = "Distance";
            SearchCriteriaSortingEnum[SearchCriteriaSortingEnum["Subject"] = 1] = "Subject";
            SearchCriteriaSortingEnum[SearchCriteriaSortingEnum["PublishingDate"] = 2] = "PublishingDate";
        })(Models.SearchCriteriaSortingEnum || (Models.SearchCriteriaSortingEnum = {}));
        var SearchCriteriaSortingEnum = Models.SearchCriteriaSortingEnum;
    })(Models = App.Models || (App.Models = {}));
})(App || (App = {}));
