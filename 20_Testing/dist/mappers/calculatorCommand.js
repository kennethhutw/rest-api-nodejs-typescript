"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorCommandMapper = void 0;
const types_1 = require("../types");
const operatorMapping = Object.values(types_1.CalculatorCommandOperator).reduce((mapping, value) => (Object.assign(Object.assign({}, mapping), { [value]: value })), {});
exports.CalculatorCommandMapper = {
    toDomain(dto) {
        const { operator, operand1, operand2 } = dto;
        return {
            operator: operatorMapping[operator],
            operand1,
            operand2
        };
    },
    toDto(command) {
        const { operator, operand1, operand2 } = command;
        return {
            operator,
            operand1,
            operand2
        };
    }
};
