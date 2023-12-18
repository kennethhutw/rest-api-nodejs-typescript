import { Router, Request, application } from "express";
import { healthRouter } from ".";

export const router = Router();

/* 
*  @openapi
* /health:
*     get:
*         decription: Health check endpoint for Calculator application
*         operationId: healthCheck
*         tags:
*          - health
*         response:
*           '200':
*           description: OK  
*           content:
*           application/json: 
*           schema: 
*            $ref: '#/components/schemas/HealthStatus'
*           '500': 
*           $ref: '#/components/responses/InternalServerError'
*/

router.get('/',(req: Request, res)=>{
    throw new Error('Applicaiton error');

    res.send({message:'OK', timestamp: req.timestamp});
})