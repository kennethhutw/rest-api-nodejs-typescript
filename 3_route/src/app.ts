import  express from 'express';

const app = express();
const port = 3000;
import { healthRouter, calculatorRouter } from './routers';

app.use('/health',healthRouter)
app.use('/calculator',calculatorRouter)

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);


})