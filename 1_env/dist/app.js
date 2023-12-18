"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// request
// response
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/health', (req, res) => {
    res.send('OK');
});
app.get('/calculator/:id', (req, res) => {
    console.log(`Query parameter: ${JSON.stringify(req.query)}`);
    console.log(`Headers : ${JSON.stringify(req.headers)}`);
    console.log(`Method : ${req.method}`);
    res.status(202).header('X-Custom-Header', 'APIS').send(`Hello ${req.params.id}`);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
