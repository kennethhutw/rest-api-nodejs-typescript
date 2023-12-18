import  express from 'express';

const app = express();
const port = 3000;
import { healthRouter, calculatorRouter } from './routers';
import { logger, addTimestamp, errorHandler } from './middlewares';

app.use(express.json());
app.use(addTimestamp);
app.use(logger);


app.use('/health',healthRouter)
app.use('/calculator',calculatorRouter)


app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);


})