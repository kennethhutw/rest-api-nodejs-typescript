import { CalculatorResultDto } from "../types";
import { Calculator} from '../models';
import  { CalculatorCommandMapper} from './calculatorCommand';



export const CalculatorMapper = {
    toDto(domain: Calculator): CalculatorResultDto{
        const {command, result, metadata} = domain;
        if(!metadata || !result){
            throw Error ('Invaild calculator domain');
        }

        return {
            id: metadata.id,
            result: result.value,
            message: result.message,
            timestamp: metadata.timestamp,
            ...CalculatorCommandMapper.toDto(command)
        }
    }
}