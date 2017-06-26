"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var electron_1 = require("electron");
var ui;
(function (ui) {
    var mainWindow = null;
    function init() {
        electron_1.app.on("ready", function () {
            mainWindow = new electron_1.BrowserWindow();
            mainWindow.show();
            var indexPageUrl = path.join(__dirname, "../../html", "home.html");
            mainWindow.loadURL("file://" + indexPageUrl);
        });
    }
    ui.init = init;
})(ui || (ui = {}));
exports.default = ui;
