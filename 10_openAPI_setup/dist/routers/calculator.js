"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
exports.router = (0, express_1.Router)();
const mockResults = [{
        id: '1',
        result: 1,
        operator: '+',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503224,
        message: '',
    },
    {
        id: '2',
        result: 1,
        operator: '-',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503254,
        message: '',
    }, {
        id: '3',
        result: 4,
        operator: '*',
        operand1: 2,
        operand2: 2,
        timestamp: 1702795503221,
        message: '',
    }, {
        id: '4',
        result: -1,
        message: 'Division by zero',
        operator: '/',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503214
    }];
exports.router.get('/', (req, res) => {
    res.send({
        message: 'Get all',
        timestamp: req.timestamp,
        data: [
            { id: 1, result: 1 },
            { id: 2, result: 2 }
        ]
    });
});
exports.router.get('/:id', (req, res) => {
    const result = mockResults.find((r) => r.id === req.params.id);
    if (!result) {
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`);
    }
    res.send(result);
    // res.send({
    //     message:'Get calculation by ID',
    //     timestamp: req.timestamp,
    //     id:req.params.id,
    //     result:1
    // });
});
exports.router.post('/', middlewares_1.validateCalculatorRequest, (req, res) => {
    const { operator, operand1, operand2 } = req.body;
    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            result = 'Invalid operator';
            break;
    }
    res.send({
        message: 'create new calculation',
        timestamp: req.timestamp,
        result
    });
});
exports.router.delete('/:id', (req, res) => {
    const deleteIndex = mockResults.findIndex((r) => r.id === req.params.id);
    if (deleteIndex === -1) {
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`);
    }
    mockResults.splice(deleteIndex, 1);
    res.status(204).end();
});
exports.router.put('/:id', (req, res) => {
    const updatedIndex = mockResults.findIndex((r) => r.id === req.params.id);
    if (updatedIndex === -1) {
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`);
    }
    const { operator, operand1, operand2 } = req.body;
    let result;
    let message;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
    }
    const updatedCalculation = {
        id: req.params.id,
        operator,
        operand1,
        operand2,
        timestamp: req.timestamp ? req.timestamp : -1,
        result: result ? result : -1,
        message: message ? message : '',
    };
    mockResults[updatedIndex] = updatedCalculation;
    res.send(updatedCalculation);
});
