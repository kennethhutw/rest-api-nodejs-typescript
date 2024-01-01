"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockCalculatorDao = void 0;
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
        throw new Error('Method not implement');
    }
    ;
    read(id) {
        throw new Error('Method not implement');
    }
    ;
    upsert(id, calculator) {
        throw new Error('Method not implement');
    }
    ;
    delete(id) {
        throw new Error('Method not implement');
    }
    ;
    list() {
        throw new Error('Method not implement');
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
            ts: (_j = (_h = calculator.metadata) === null || _h === void 0 ? void 0 : _h.timestamp) !== null && _j !== void 0 ? _j : getCurrentTimestamp(),
        };
    }
}
exports.MockCalculatorDao = MockCalculatorDao;
