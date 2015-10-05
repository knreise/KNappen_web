/// <reference path="HttpDownloadProviderTest.ts" />
/// <reference path="../JS/App/_References.ts" />
/// <reference path="DataSourceNorvegianaTest.ts" />
/// <reference path="IUnitTest.ts" />
var UnitTests;
(function (UnitTests) {
    var UnitTest = (function () {
        function UnitTest() {
        }
        UnitTest.prototype.run = function () {
            //this.test(new UnitTests.DataSourceNorvegianaTest());
            this.test(new UnitTests.HttpDownloadProviderTest());
        };
        UnitTest.prototype.test = function (c) {
            try {
                c.runTest($("#result"));
            }
            catch (exception) {
                $("#result").append("<div style='color:orange'>Exception running test: " + exception + "</div>\r\n");
            }
        };
        return UnitTest;
    })();
    UnitTests.UnitTest = UnitTest;
})(UnitTests || (UnitTests = {}));
