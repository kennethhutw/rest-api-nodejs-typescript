"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
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
exports.router.get('/', (req, res) => {
    // throw new Error('Applicaiton error');
    res.send({ status: 'OK', timestamp: req.timestamp });
});
