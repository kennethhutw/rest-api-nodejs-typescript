"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const app = (0, express_1.default)();
const port = 3000;
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
const daos_1 = require("./daos");
const controllers_1 = require("./controllers");
const calculator_1 = require("./routers/calculator");
app.use(express_1.default.json());
app.use(middlewares_1.addTimestamp);
app.use(middlewares_1.logger);
app.use(middlewares_1.openApiValidator);
const calculatorDao = new daos_1.MockCalculatorDao();
const calculatorController = new controllers_1.CalculatorController(calculatorDao);
const calculatorRouter = new calculator_1.CalculatorRouter(calculatorController);
app.use('/api-docs', routers_1.apiDocsRouter);
app.use('/health', routers_1.healthRouter);
// app.use('/calculator',calculatorRouter)
app.use(calculator_1.CalculatorRouter.basePath, calculatorRouter.router);
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
