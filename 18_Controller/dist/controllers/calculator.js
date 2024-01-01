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
exports.CalculatorController = void 0;
const mappers_1 = require("../mappers");
const error_1 = require("../error");
const models_1 = require("../models");
class CalculatorController {
    constructor(calculatorDao) {
        this.calculatorDao = calculatorDao;
    }
    getAllCalculations() {
        return __awaiter(this, void 0, void 0, function* () {
            const allCalculations = yield this.calculatorDao.list();
            return allCalculations.map((calculation) => mappers_1.CalculatorMapper.toDto(calculation));
        });
    }
    getCalculationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getCalculationOrThrowError(id);
            return mappers_1.CalculatorMapper.toDto(result);
        });
    }
    deleteCalculationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getCalculationOrThrowError(id);
            return this.calculatorDao.delete(id);
        });
    }
    updateCalculation(id, command) {
        return __awaiter(this, void 0, void 0, function* () {
            const calculation = yield this.getCalculationOrThrowError(id);
            calculation.update(mappers_1.CalculatorCommandMapper.toDomain(command));
            const updatedCalculation = yield this.calculatorDao.upsert(id, calculation);
            return mappers_1.CalculatorMapper.toDto(updatedCalculation);
        });
    }
    createCalculation(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const calculation = new models_1.Calculator(mappers_1.CalculatorCommandMapper.toDomain(command));
            const newCalculation = yield this.calculatorDao.create(calculation);
            return mappers_1.CalculatorMapper.toDto(newCalculation);
        });
    }
    getCalculationOrThrowError(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.calculatorDao.read(id);
            if (!result) {
                throw new error_1.NotFoundError(`Calculation not found for ID ${id}`);
            }
            return result;
        });
    }
}
exports.CalculatorController = CalculatorController;
