"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCalculatorRequest = void 0;
function validateCalculatorRequest(req, res, next) {
    const { operator, operand1, operand2 } = req.body;
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
        return res.status(400).send('Operands must be number');
    }
    if (operator !== '+' &&
        operator !== '-' &&
        operator !== '*' &&
        operator !== '/') {
        return res.status(400).send('Operator must be +, -, * or /');
    }
    next();
}
exports.validateCalculatorRequest = validateCalculatorRequest;
