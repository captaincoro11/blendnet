import mongoose from 'mongoose'

interface IUser  {
    name :String,
    email:String,
    password:string

}
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
});

export const User = mongoose.model<IUser>("User",userSchema)