"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = exports.crmHeaders = void 0;
const dotenv_1 = require("dotenv");
const mysql_1 = __importDefault(require("mysql"));
(0, dotenv_1.config)();
exports.crmHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Token token=${process.env.FRESHWORKS_API_KEY}`
};
exports.dbPool = mysql_1.default.crConn({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();
