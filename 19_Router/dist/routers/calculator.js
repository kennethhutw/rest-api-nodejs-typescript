"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorRouter = exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
class CalculatorRouter {
    constructor(calculatorController) {
        this.calculatorController = calculatorController;
        this.router = (0, express_1.Router)();
        this.createGetAllCalculations();
        this.createGetCalculationById();
        this.createDeleteCalculation();
        this.createUpdateCalculation();
        this.createCreateCalculation();
    }
    createGetAllCalculations() {
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
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.calculatorController.getAllCalculations());
        }));
    }
    createGetCalculationById() {
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
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.calculatorController.getCalculationById(req.params.id));
        }));
    }
    createDeleteCalculation() {
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
        this.router.delete('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.calculatorController.deleteCalculationById(req.params.id);
            res.status(204).end();
        }));
    }
    createUpdateCalculation() {
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
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.calculatorController.updateCalculation(req.params.id, req.body));
        }));
    }
    createCreateCalculation() {
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
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(201).send(yield this.calculatorController.createCalculation(req.body));
        }));
    }
}
exports.CalculatorRouter = CalculatorRouter;
CalculatorRouter.basePath = '/calculator';
