"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const error_1 = require("../error");
exports.router = (0, express_1.Router)();
const mockResults = [{
        id: '1',
        result: 1,
        operator: '+',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503224,
    },
    {
        id: '2',
        result: 1,
        operator: '-',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503254
    }, {
        id: '3',
        result: 4,
        operator: '*',
        operand1: 2,
        operand2: 2,
        timestamp: 1702795503221
    }, {
        id: '4',
        message: 'Division by zero',
        operator: '/',
        operand1: 1,
        operand2: 0,
        timestamp: 1702795503214
    }];
/**
 * @openapi
 * /calculator:
 *   get:
 *     description: Get all calculations
 *     operationId: getAllCalculations
 *     tags:
 *       - calculator
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CalculatorResult'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
exports.router.get('/', (req, res) => {
    res.send(mockResults);
});
/**
 * @openapi
 * /calculator/{id}:
 *   get:
 *     description: Get calculation by ID
 *     operationId: getCalculationById
 *     tags:
 *       - calculator
 *     parameters:
 *       - $ref: '#/components/parameters/CalculatorId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculatorResult'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
exports.router.get('/:id', (req, res) => {
    const result = mockResults.find((r) => r.id === req.params.id);
    if (!result) {
        // return res.status(404).send(`Calculation not found for ID ${req.params.id}`)
        throw new error_1.NotFoundError(`Calculation not found for ID ${req.params.id}`);
    }
    res.send(result);
    // res.send({
    //     message:'Get calculation by ID',
    //     timestamp: req.timestamp,
    //     id:req.params.id,
    //     result:1
    // });
});
/**
 * @openapi
 * /calculator:
 *   post:
 *     description: Create a calculation
 *     operationId: createCalculation
 *     tags:
 *       - calculator
 *     requestBody:
 *       $ref: '#/components/requestBodies/CalculatorCommand'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculatorResult'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
exports.router.post('/', (req, res) => {
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
            if (operand2 === 0) {
                message = 'Division by zero';
            }
            else {
                result = operand1 / operand2;
            }
            break;
    }
    const newCal = {
        id: '5',
        operator,
        operand1,
        operand2,
        timestamp: req.timestamp,
        message,
        result
    };
    mockResults.push(newCal);
    res.send(newCal);
    // res.send({
    //     message:'create new calculation',
    //     timestamp: req.timestamp,
    //     result
    // });
});
/**
 * @openapi
 * /calculator/{id}:
 *   delete:
 *     description: Delete calculation by ID
 *     operationId: deleteCalculationById
 *     tags:
 *       - calculator
 *     parameters:
 *       - $ref: '#/components/parameters/CalculatorId'
 *     responses:
 *       '204':
 *         description: Deleted
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
exports.router.delete('/:id', (req, res) => {
    const deleteIndex = mockResults.findIndex((r) => r.id === req.params.id);
    if (deleteIndex === -1) {
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`);
    }
    mockResults.splice(deleteIndex, 1);
    res.status(204).end();
});
/**
 * @openapi
 * /calculator/{id}:
 *   put:
 *     description: Update a calculation
 *     operationId: updateCalculation
 *     tags:
 *       - calculator
 *     parameters:
 *       - $ref: '#/components/parameters/CalculatorId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/CalculatorCommand'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CalculatorResult'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
exports.router.put('/:id', (req, res) => {
    const updatedIndex = mockResults.findIndex((r) => r.id === req.params.id);
    if (updatedIndex === -1) {
        // return res.status(404).send(`Calculation not found for ID ${req.params.id}`)
        throw new error_1.NotFoundError(`Calculation not found for ID ${req.params.id}`);
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
