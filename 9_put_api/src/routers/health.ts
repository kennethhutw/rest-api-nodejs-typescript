import { Router, Request, application } from "express";
import { healthRouter } from ".";

export const router = Router();



router.get('/',(req: Request, res)=>{
    throw new Error('Applicaiton error');

    res.send({message:'OK', timestamp: req.timestamp});
})