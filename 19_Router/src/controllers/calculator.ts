
import  {CalculatorDao} from '../daos';
import { CalculatorCommandMapper, CalculatorMapper } from '../mappers';
import { CalculatorCommandDto, CalculatorResultDto } from '../types';
import { NotFoundError } from '../error';
import { Calculator } from '../models';

export class CalculatorController {
    constructor(private calculatorDao: CalculatorDao){


    }

    async getAllCalculations(): Promise<CalculatorResultDto[]>
    {
        const allCalculations = await this.calculatorDao.list();
        return allCalculations.map((calculation)=>CalculatorMapper.toDto(calculation))
    }

    async getCalculationById(id: string):Promise<CalculatorResultDto>{
      const result = await  this.getCalculationOrThrowError(id);
        return CalculatorMapper.toDto(result);
    }

    async deleteCalculationById(id: string):Promise<void>{
        await this.getCalculationOrThrowError(id);
        return this.calculatorDao.delete(id);
    }

    async updateCalculation(id:string, command: CalculatorCommandDto):Promise<CalculatorResultDto>{
        const calculation = await this.getCalculationOrThrowError(id);
        calculation.update(CalculatorCommandMapper.toDomain(command)
            );

            const updatedCalculation = await this.calculatorDao.upsert(id, calculation);

            return CalculatorMapper.toDto(updatedCalculation);
    }  
    
    async createCalculation(command: CalculatorCommandDto):Promise<CalculatorResultDto>{

        const calculation = new Calculator(CalculatorCommandMapper.toDomain(command));

        const newCalculation = await this.calculatorDao.create(calculation);

        return  CalculatorMapper.toDto(newCalculation);

    }

    private async getCalculationOrThrowError(id:string):Promise<Calculator>{
        const result = await this.calculatorDao.read(id);
        if(!result){
            throw new NotFoundError( `Calculation not found for ID ${id}`);
        }
        return result;
    }
}