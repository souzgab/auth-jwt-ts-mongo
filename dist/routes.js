"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_controller_1 = __importDefault(require("./controller/User.controller"));
var routes = express_1.default.Router();
routes.get("/login", User_controller_1.default.createSession);
exports.default = routes;
