"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var require_dir_1 = __importDefault(require("require-dir"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
mongoose_1.default.connect("mongodb://localhost:27017/nodeapi", { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("ERROR connecting to: mongodb://localhost:27017/nodeapi. " + err);
    }
    else {
        console.log('Successfully connected to: ' + "mongodb://localhost:27017/nodeapi");
    }
});
require_dir_1.default('./src/models');
app.use(routes_1.default, cors_1.default());
app.listen(3333, function () { return console.log('Server running'); });
