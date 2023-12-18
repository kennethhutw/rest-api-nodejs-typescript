import { Router, Request } from "express";
import { CalculatorRequestBody} from './../types';
import { validateCalculatorRequest } from "../middlewares";
export const router = Router();

const mockResults =[{
    id:'1',
    result:1,
    operator:'+',
    operand1:1,
    operand2:0,
    timestamp:1702795503224
},
{
    id:'2',
    result:1,
    operator:'-',
    operand1:1,
    operand2:0,
    timestamp:1702795503254
},{
    id:'3',
    result:4,
    operator:'*',
    operand1:2,
    operand2:2,
    timestamp:1702795503221
},{
    id:'4',
    result:'Division by zero',
    operator:'/',
    operand1:1,
    operand2:0,
    timestamp:1702795503214
}]

router.get('/',(req: Request, res)=>{
    res.send({
        message:'Get all',
        timestamp: req.timestamp,
        data:[
            {id:1, result:1},
            {id:2, result:2}
        ]
    });
});

router.get('/:id', (req: Request, res)=>{

    const result = mockResults.find((r)=>r.id === req.params.id);

    if(!result){
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`)
    }
    res.send(result);
    // res.send({
    //     message:'Get calculation by ID',
    //     timestamp: req.timestamp,
    //     id:req.params.id,
    //     result:1
    // });

})

router.post('/',
validateCalculatorRequest,
 (req:Request<{}, any, CalculatorRequestBody>, res)=>{
    const {operator, operand1, operand2} = req.body;
    let result : number | string;
    switch(operator){
        case '+':
            result = operand1 +  operand2;
            break;
            case '-':
            result = operand1 -  operand2;
            break;
            case '*':
            result = operand1 *  operand2;
            break;
            case '/':
            result = operand1 /  operand2;
            break;
            default:
            result = 'Invalid operator';
            break;
    }
    res.send({
        message:'create new calculation',
        timestamp: req.timestamp,
        result
    });

})


router.delete('/:id', (req:Request<{id:string}>, res)=>{


    const deleteIndex = mockResults.findIndex((r)=>r.id === req.params.id)

    if(deleteIndex ===-1){
        return res.status(404).send(`Calculation not found for ID ${req.params.id}`)
    }

    mockResults.splice(deleteIndex,1);
    res.status(204).end();
})

