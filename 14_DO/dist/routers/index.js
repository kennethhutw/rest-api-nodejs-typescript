"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocsRouter = exports.calculatorRouter = exports.healthRouter = void 0;
var health_1 = require("./health");
Object.defineProperty(exports, "healthRouter", { enumerable: true, get: function () { return health_1.router; } });
var calculator_1 = require("./calculator");
Object.defineProperty(exports, "calculatorRouter", { enumerable: true, get: function () { return calculator_1.router; } });
var apidocs_1 = require("./apidocs");
Object.defineProperty(exports, "apiDocsRouter", { enumerable: true, get: function () { return apidocs_1.router; } });
