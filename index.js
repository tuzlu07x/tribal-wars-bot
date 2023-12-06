"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connection_1 = require("./src/Puppeteer/Connection");
var connection = new Connection_1.default("https://www.klanlar.org/", "username", "lordFatih", "password", "1234567890");
connection.connector();
