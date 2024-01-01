"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const types_1 = require("../types");
class Calculator {
    constructor(command, result, metadata) {
        this.command = command;
        this.result = result;
        this.metadata = metadata;
        this.execute();
        this.validate();
    }
    update(command) {
        this.command = command;
        this.result = undefined;
        this.execute();
        this.validate();
    }
    validate() {
        var _a, _b;
        if (((_a = this.result) === null || _a === void 0 ? void 0 : _a.value) === undefined && ((_b = this.result) === null || _b === void 0 ? void 0 : _b.message) === undefined) {
            throw new Error('Invalid calculator result');
        }
    }
    execute() {
        if (this.result !== undefined) {
            return;
        }
        const { operator, operand1, operand2 } = this.command;
        let result;
        let message;
        switch (operator) {
            case types_1.CalculatorCommandOperator.ADD:
                result = operand1 + operand2;
                break;
            case types_1.CalculatorCommandOperator.SUBTRACT:
                result = operand1 - operand2;
                break;
            case types_1.CalculatorCommandOperator.MULTIPLY:
                result = operand1 * operand2;
                break;
            case types_1.CalculatorCommandOperator.DIVIDE:
                if (operand2 === 0) {
                    message = 'Division by zero';
                }
                else {
                    result = operand1 / operand2;
                }
                break;
        }
        this.result = { value: result, message };
    }
}
exports.Calculator = Calculator;
