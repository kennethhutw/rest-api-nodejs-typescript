import { CalcualtorDao } from ".";
import  { Calculator} from "../../models";

interface MockCalculatorDbData{
    id:string;
    res?:number;
    msg?:string;
    opr: '+' | '-' | '*' | '/';
    op1:number;
    op2:number;
    ts:number;
}

const mockDb: {[id:string]:MockCalculatorDbData} ={
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

export class MockCalculatorDao implements CalcualtorDao{

    private counter = 4;
    create(calculator:Calculator):Promise<Calculator>{
        throw new Error('Method not implement');
    };

    read(id:string):Promise<Calculator| undefined>{
        throw new Error('Method not implement');
    };

    upsert(id:string, calculator:Calculator):Promise<Calculator>{
        throw new Error('Method not implement');
    };

    delete(id:string):Promise<void>{
        throw new Error('Method not implement');
    };

    list():Promise<Calculator[]>{
        throw new Error('Method not implement');
    };

    private generateId():string{
        this.counter ++;
        return  this.counter.toString();
    }

    private static getCurrentTimestamp():number{
        return Date.now();
    }

    private toPersistence(calculator:Calculator): MockCalculatorDbData{
        return {
            id: calculator.metadata?.id ?? this.generateId(),
            res: calculator.result?.value,
            msg: calculator.result?.message,
            opr: calculator.command?.operator,
            op1: calculator.command?.operand1,
            op2: calculator.command?.operand2,
            ts: calculator.metadata?.timestamp?? getCurrentTimestamp(),
        }
    }
}