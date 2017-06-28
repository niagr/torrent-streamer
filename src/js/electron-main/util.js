"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// wrap node fs.open in Promise
function openFileAsync(path, flags) {
    return new Promise(function (resolve, reject) { return fs.open(path, flags, function (err, fd) { return err ? reject(err) : resolve(fd); }); });
}
exports.openFileAsync = openFileAsync;
// wrap node fs.stat in Promise
function statAsync(path) {
    return new Promise(function (resolve, reject) { return fs.stat(path, function (err, stats) { return err ? reject(err) : resolve(stats); }); });
}
exports.statAsync = statAsync;
