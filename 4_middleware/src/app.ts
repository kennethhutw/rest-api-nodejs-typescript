import  express from 'express';

const app = express();
const port = 3000;
import { healthRouter, calculatorRouter } from './routers';
import { logger, addTimestamp } from './middlewares';

app.use(addTimestamp);
app.use(logger);


app.use('/health',healthRouter)
app.use('/calculator',calculatorRouter)

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);


})