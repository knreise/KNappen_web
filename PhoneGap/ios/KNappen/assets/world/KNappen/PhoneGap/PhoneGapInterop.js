/// <reference path="../Scripts/typings/phonegap/phonegap.d.ts" />
var PhoneGap;
(function (PhoneGap) {
    // Class
    var PhoneGapInterop = (function () {
        function PhoneGapInterop() {
            this.dbVersion = "1";
        }
        PhoneGapInterop.prototype.Init = function () {
            // To be able to respond on events inside the ARchitect World, we set a onURLInvoke callback
            WikitudePlugin.setOnUrlInvokeCallback(phoneGapInterop.onClickInARchitectWorld);

            document.addEventListener("backbutton", phoneGapInterop.onBackButton, false);
            document.addEventListener("menubutton", phoneGapInterop.onMenuButton, false);

            console.log("SQL: Opening database KNAppenDB");
            phoneGapInterop.db = window.openDatabase("KNAppenDB", "", "KNAppenDB", 20 * 1000 * 1024);

            phoneGapInterop.updateDb();
        };

        PhoneGapInterop.prototype.updateDb = function () {
            console.log("Current DB version: " + phoneGapInterop.db.version);
            if (phoneGapInterop.db.version != phoneGapInterop.dbVersion) {
                var sql = "";
                if (!phoneGapInterop.db.version || phoneGapInterop.db.version == "") {
                    // Table doesn't exist - create full table
                    console.log("SQLite Table doesn't exist, creating.");
                    phoneGapInterop.db.transaction(function (tx) {
                        sql = 'CREATE TABLE IF NOT EXISTS settings (key TEXT NOT NULL PRIMARY KEY, value TEXT, meta TEXT)';
                        console.log("SQL: " + sql);
                        tx.executeSql(sql);
                    }, function (error) {
                        console.log("SQL CREATE: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                    }, function () {
                        console.log("SQL CREATE Success: " + sql);
                    });
                    phoneGapInterop.db.changeVersion(phoneGapInterop.db.version, phoneGapInterop.dbVersion);
                }

                if (phoneGapInterop.db.version == "1.0") {
                    // Upgrade from 1.0 databases (beta-testers)
                    console.log("SQLite Table upgrade from 1.0 (beta-testers)");
                    phoneGapInterop.db.transaction(function (tx) {
                        sql = 'ALTER TABLE settings ADD COLUMN meta TEXT';
                        console.log("SQL: " + sql);
                        tx.executeSql(sql);
                    }, function (error) {
                        console.log("SQL ALTER: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                    }, function () {
                        console.log("SQL ALTER Success: " + sql);
                    });
                    phoneGapInterop.db.changeVersion(phoneGapInterop.db.version, "1");
                }

                if (phoneGapInterop.db.version != phoneGapInterop.dbVersion) {
                    console.log("ERROR: Unsuccessful upgrade of SQLite tables. Current: " + phoneGapInterop.db.version + ", expected: " + phoneGapInterop.dbVersion);
                } else {
                    console.log("SUCCESS: Successful upgrade of SQLite tables. Current: " + phoneGapInterop.db.version + ", expected: " + phoneGapInterop.dbVersion);
                }
            }
        };

        PhoneGapInterop.prototype.onClickInARchitectWorld = function (url) {
            //console.log("URL: " + url);
            var action = getUrlParameterForKey(url, 'action');
            var table = getUrlParameterForKey(url, 'table');
            var key = getUrlParameterForKey(url, 'key');
            var value = getUrlParameterForKey(url, 'value');
            var meta = getUrlParameterForKey(url, 'meta');

            console.log("PhoneGap received Wikitude command: action: " + action + ", table: " + table + ", key: " + key + ", value: " + value);

            var sql = "";
            if (action == "exit") {
                phoneGapInterop.onExitApp();
            }

            if (action == "set") {
                phoneGapInterop.db.transaction(function (tx) {
                    sql = 'DELETE FROM ' + table + ' WHERE key=?';

                    //sql = 'UPDATE ' + table + ' SET value=? WHERE key=?';
                    console.log("SQL: " + sql);
                    tx.executeSql(sql, [key]);
                }, function (error) {
                    console.log("SQL INSERT-DELETE: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                }, function () {
                    console.log("SQL INSERT-DELETE Success: " + sql);
                });

                phoneGapInterop.db.transaction(function (tx) {
                    sql = 'INSERT OR IGNORE INTO ' + table + ' (key, value, meta) VALUES (?, ?, ?)';
                    console.log("SQL: " + sql);
                    tx.executeSql(sql, [key, value, meta]);
                }, function (error) {
                    console.log("SQL INSERT: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                }, function () {
                    console.log("SQL INSERT Success: " + sql);
                });
            }
            if (action == "remove") {
                phoneGapInterop.db.transaction(function (tx) {
                    sql = 'DELETE FROM ' + table + ' WHERE key=?';
                    console.log("SQL: " + sql);
                    tx.executeSql(sql, [key]);
                }, function (error) {
                    console.log("DELETE DELETE: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                }, function () {
                    console.log("SQL CREATE Success: " + sql);
                });
                phoneGapInterop.db.transaction(function (tx) {
                    sql = 'DELETE FROM ' + table + ' WHERE key=?';
                    console.log("SQL: " + sql);
                    tx.executeSql(sql, [key + ".meta"]);
                }, function (error) {
                    console.log("SQL DELETE (meta): \"" + sql + "\": Error: " + error.code + ": " + error.message);
                }, function () {
                    console.log("SQL DELETE (meta) Success: " + sql);
                });
            }
            if (action == "read") {
                sql = 'SELECT * FROM ' + table;
                console.log("SQL: " + sql);
                phoneGapInterop.db.transaction(function (tx) {
                    tx.executeSql(sql, [], function querySuccess(tx, results) {
                        if (!results || !results.rows) {
                            console.log("SQL: Empty result: " + sql);
                            return;
                        }
                        var len = results.rows.length;
                        console.log("SQL: " + table + " table: " + len + " rows found.");
                        for (var i = 0; i < len; i++) {
                            var rKey = results.rows.item(i).key;
                            var rValue = results.rows.item(i).value;
                            var rMeta = results.rows.item(i).meta;
                            console.log("SQL Row: " + i + " key: " + rKey + ", value:  " + rValue + ", meta: " + rMeta);
                            phoneGapInterop.callJavaScript("phoneGapProvider.SqlCallbackSet('" + rKey + "', '" + rValue + "', '" + rMeta + "')");
                        }
                    });
                }, function (error) {
                    if (error)
                        console.log("SQL SELECT: \"" + sql + "\": Error: " + error.code + ": " + error.message);
                }, function () {
                    console.log("SQL SELECT Success: " + sql);
                });
            }

            if (action == "openUrl") {
                var url = getUrlParameterForKey(url, 'url');
                console.log("openUrl: " + url);
                var ref = window.open(url, '_system');
            }
        };

        PhoneGapInterop.prototype.callJavaScript = function (script) {
            console.log("Executing Wikitude script command: " + script);
            WikitudePlugin.callJavaScript(script);
        };

        PhoneGapInterop.prototype.onBackButton = function () {
            console.log("Back-button pressed");
            WikitudePlugin.callJavaScript("phoneGapProvider.backButton();");
        };
        PhoneGapInterop.prototype.onMenuButton = function () {
            console.log("Menu-button pressed");
            WikitudePlugin.callJavaScript("phoneGapProvider.menuButton();");
        };

        PhoneGapInterop.prototype.onExitApp = function () {
            console.log("Application exiting...");
            navigator.app.exitApp();
        };
        return PhoneGapInterop;
    })();
    PhoneGap.PhoneGapInterop = PhoneGapInterop;
})(PhoneGap || (PhoneGap = {}));

/**
*  This function extracts an url parameter
*/
function getUrlParameterForKey(url, requestedParam) {
    requestedParam = requestedParam.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + requestedParam + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);

    if (results == null)
        return ""; else {
        var result = decodeURIComponent(results[1]);
        return result;
    }
}

// Local variables
var phoneGapInterop = new PhoneGap.PhoneGapInterop();
//@ sourceMappingURL=PhoneGapInterop.js.map