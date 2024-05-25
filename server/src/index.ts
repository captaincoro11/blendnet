import express , {Request , Response} from 'express'
import userRoutes from './routes/userRoutes'
import { connectDatabase } from './db';
const app = express();
const dotenv = require('dotenv');
dotenv.config({});
const port = process.env.PORT ;

connectDatabase();


app.use('/user',userRoutes)

app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        message:"Hello User"
    })
});

app.listen(port,()=>{
    console.log(`LET's Go at ${port}`)
})

