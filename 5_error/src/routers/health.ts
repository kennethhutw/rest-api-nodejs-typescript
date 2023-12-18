import { Router, Request } from "express";

export const router = Router();

router.get('/',(req: Request, res)=>{
    throw new Error('Applicaiton error');

    res.send({message:'OK', timestamp: req.timestamp});
})