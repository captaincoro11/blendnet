import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({});
const url = process.env.DATABASE_URL!



export const connectDatabase = ()=>{
    mongoose.connect(url)
    .then((con)=>console.log(`Database Connected : ${con.connection.host}`))
    .catch((error)=>console.log(error));

} 