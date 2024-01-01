"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorMapper = void 0;
const calculatorCommand_1 = require("./calculatorCommand");
exports.CalculatorMapper = {
    toDto(domain) {
        const { command, result, metadata } = domain;
        if (!metadata || !result) {
            throw Error('Invaild calculator domain');
        }
        return Object.assign({ id: metadata.id, result: result.value, message: result.message, timestamp: metadata.timestamp }, calculatorCommand_1.CalculatorCommandMapper.toDto(command));
    }
};
