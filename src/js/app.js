"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var os = require("os");
var torrentStream = require("torrent-stream");
var ui_1 = require("./ui/ui");
function openFileAsync(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return fs.open(path, "w", function (err, fd) { return err ? reject(err) : resolve(fd); }); })];
        });
    });
}
function statAsync(path) {
    return new Promise(function (resolve, reject) { return fs.stat(path, function (err, stats) { return err ? reject(err) : resolve(stats); }); });
}
function main() {
    var _this = this;
    ui_1.default.init();
    var magnetLink = "magnet:?xt=urn:btih:A0DF264C995A009B422E61D3EBFAB9FFFBF12AD1&dn=Batman%20v%20Superman%3A%20Dawn%20of%20Justice%20%282016%29%20%5B720p%20%5D&tr=%2audp%3a%2f%2fopen.demonii.com%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2fglotorrents.pw%3a6969%2fannounce&tr=udp%3a%2f%2fp4p.arenabg.com%3a1337&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftorrent.gresille.org%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2fexodus.desync.com%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2ftracker.internetwarriors.net%3a1337&tr=udp%3a%2f%2ftracker.leechers-paradise.org%3a6969&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80&tr=udp%3a%2f%2f9.rarbg.me%3a2710%2fannounce";
    var engine = torrentStream(magnetLink);
    engine.on("ready", function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var videoFile, fileStream, outFilePath, outFileWriteStream, downloaded;
        return __generator(this, function (_a) {
            engine.files.forEach(function (file) { return console.log("FILE: " + file.name); });
            videoFile = engine.files[1];
            fileStream = videoFile.createReadStream();
            outFilePath = path.join(os.homedir(), "bbb.mp4") // path.join(os.homedir(), videoFile.name)
            ;
            outFileWriteStream = fs.createWriteStream(outFilePath);
            console.log("VIDEO FILE LENGTH: " + videoFile.length);
            downloaded = 0;
            outFileWriteStream.on("open", function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    fileStream.pipe(outFileWriteStream);
                    fileStream.on("data", function logOnce(c) {
                        console.log("GOT DATA");
                        fileStream.removeListener("data", logOnce);
                    });
                    fileStream.on("data", function (chunk) {
                        // console.log("CHUNK:", chunk)
                        console.log("SIZE:", chunk.length);
                        downloaded += chunk.length;
                        console.log("DOWNLOADED:", downloaded);
                    });
                    engine.on("download", function (pieceIndex) { return __awaiter(_this, void 0, void 0, function () {
                        var outFileStats;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Downloaded piece " + pieceIndex);
                                    return [4 /*yield*/, statAsync(outFilePath)
                                        // console.log(`SIZE: ${outFileStats.size}`)
                                    ];
                                case 1:
                                    outFileStats = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); });
}
exports.main = main;
