"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send({
        message: 'Get all',
        timestamp: req.timestamp,
        data: [
            { id: 1, result: 1 },
            { id: 2, result: 2 }
        ]
    });
});
exports.router.get('/:id', (req, res) => {
    res.send({
        message: 'Get calculation by ID',
        timestamp: req.timestamp,
        id: req.params.id,
        result: 1
    });
});
