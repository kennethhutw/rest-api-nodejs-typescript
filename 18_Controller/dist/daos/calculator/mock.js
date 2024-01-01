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
exports.MockCalculatorDao = void 0;
const models_1 = require("../../models");
const types_1 = require("../../types");
const mockDb = {
    '1': {
        id: '1',
        res: 1,
        opr: '+',
        op1: 1,
        op2: 0,
        ts: 1688612539479,
    },
    '2': {
        id: '2',
        res: 2,
        opr: '*',
        op1: 2,
        op2: 1,
        ts: 1688612540479,
    },
    '3': {
        id: '3',
        msg: 'Division by zero',
        opr: '/',
        op1: 1,
        op2: 0,
        ts: 1688612540479,
    },
};
class MockCalculatorDao {
    constructor() {
        this.counter = 4;
    }
    create(calculator) {
        return __awaiter(this, void 0, void 0, function* () {
            const calculationPersistence = this.toPersistence(calculator);
            mockDb[calculationPersistence.id] = calculationPersistence;
            return this.toDomain(calculationPersistence);
            // throw new Error('Method not implement');
        });
    }
    ;
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = mockDb[id];
            return result ? this.toDomain(result) : undefined;
            // throw new Error('Method not implement');
        });
    }
    ;
    upsert(id, calculator) {
        return __awaiter(this, void 0, void 0, function* () {
            const calculationPersistence = Object.assign(Object.assign({}, this.toPersistence(calculator)), { ts: MockCalculatorDao.getCurrentTimestamp() });
            mockDb[id] = calculationPersistence;
            return this.toDomain(calculationPersistence);
            // throw new Error('Method not implement');
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            delete mockDb[id];
            // throw new Error('Method not implement');
        });
    }
    ;
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.values(mockDb).map((calculationPersistence) => this.toDomain(calculationPersistence));
            //throw new Error('Method not implement');
        });
    }
    ;
    generateId() {
        this.counter++;
        return this.counter.toString();
    }
    static getCurrentTimestamp() {
        return Date.now();
    }
    toPersistence(calculator) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return {
            id: (_b = (_a = calculator.metadata) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : this.generateId(),
            res: (_c = calculator.result) === null || _c === void 0 ? void 0 : _c.value,
            msg: (_d = calculator.result) === null || _d === void 0 ? void 0 : _d.message,
            opr: (_e = calculator.command) === null || _e === void 0 ? void 0 : _e.operator,
            op1: (_f = calculator.command) === null || _f === void 0 ? void 0 : _f.operand1,
            op2: (_g = calculator.command) === null || _g === void 0 ? void 0 : _g.operand2,
            ts: (_j = (_h = calculator.metadata) === null || _h === void 0 ? void 0 : _h.timestamp) !== null && _j !== void 0 ? _j : MockCalculatorDao.getCurrentTimestamp(),
        };
    }
    toDomain(calculatorPersistence) {
        const { id, res, msg, opr, op1, op2, ts } = calculatorPersistence;
        return new models_1.Calculator({
            operator: MockCalculatorDao.dbOperatorMapping[opr],
            operand1: op1,
            operand2: op2
        }, {
            value: res,
            message: msg
        }, {
            id,
            timestamp: ts
        });
    }
}
exports.MockCalculatorDao = MockCalculatorDao;
MockCalculatorDao.dbOperatorMapping = {
    '+': types_1.CalculatorCommandOperator.ADD,
    '-': types_1.CalculatorCommandOperator.SUBTRACT,
    '*': types_1.CalculatorCommandOperator.MULTIPLY,
    '/': types_1.CalculatorCommandOperator.DIVIDE,
};
