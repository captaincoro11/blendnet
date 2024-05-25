import {Request , Response ,ErrorRequestHandler} from 'express'
import {User} from '../middleware/model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { RiSafariFill } from 'react-icons/ri'


dotenv.config({});


interface IUser {
    name:String,
    email:String,
    password:string
}

export const register = async(req:Request,res:Response)=>{
    try {
        const {name,email,password} = req.body;
        if(!email ){
            return res.status(401).json({
                message:"Please Enter Email"
            })
        }
        if(!password){
            return res.status(401).json({
                message:"Please Enter Password"
            })
        }

        if(!name){
            return res.status(401).json({
                message:"Please Enter Name"
            })
        }
    

        if(password.length<6){
            return res.status(403).json({
                message:"Password length should be minimum 6 characters"
            })
        }

        const user = await User.findOne({
               email:email
        })

    
        if(user){
            return res.status(402).json({
                message:"User already exists"
            })
        };
    
        const hashedPassword = await bcrypt.hash(password,10);

        const token =await jwt.sign(email, process.env.JWT_SECRET_KEY!);


       const newUser:IUser =  await User.create({
        name:name,
        email:email,
        password:hashedPassword
       })




    
      
    
        const options = {
            expires:new Date(Date.now() + 90*24*60*60*1000)
        
            
        }
    
    
    
        res.cookie("token",token,options).status(200).json({
            message:"User Registered Successfully",
            newUser,
            token
        })
        
    
    } catch (error:any) {
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
        
    }
 



}



export const login = async(req:Request,res:Response)=>{

    const {email, password} = req.body;

    if(!email ){
        return res.status(401).json({
            message:"Please Enter Username"
        })
    }
    if(!password){
        return res.status(401).json({
            message:"Please Enter Password"
        })
    };



    const user = await User.findOne({
        email:email
    })
    
    if(!user){
        return res.status(401).json({
            message:"User not found please register first"
        });

    };

    


    const isMatch =await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(402).json({
            message:"Wrong password please try again"
        })
    }
    console.log(isMatch)

 
    const token = await jwt.sign({email:email},process.env.JWT_SECRET_KEY!);

    const options ={
        expires:new Date(Date.now() + 90*24*60*60*1000)
    }

    res.cookie("token",token,options).json({
        message:"User logged in successfully",
        user,
        token,

    });






    
}

export const dashboard = async(req:Request,res:Response)=>{
    try{

        const data = 
             [
              {
                "merchantCode": "SD00020871",
                "approvedCreditLimit": 100000,
                "availableCreditLimit": 50000,
                "effectiveStartDate": "17-02-2022",
                "effectiveEndDate": "18-05-2022",
                "transactions": [
                  {
                    "transactionRef": "63424",
                    "transactionDate": "17-02-2022",
                    "transactionAmount": 50000,
                    "interestAmount": 653.85,
                    "repaymentDetails": [
                      {
                        "amount": 50654,
                        "date": "17-03-2022",
                        "paidOn": null
                      }
                    ],
                    "outstandingAmount": 50654,
                    "paidAmount": 0,
                    "status": "Unpaid",
                    "paymentLink": {
                      "link": "https://fndf.in",
                      "expiryDate": "18-02-2022"
                    },
                    "orderId": "118"
                  },
                  {
                    "transactionRef": "63416",
                    "transactionDate": "17-02-2022",
                    "transactionAmount": 10000,
                    "interestAmount": 130.78,
                    "repaymentDetails": [
                      {
                        "amount": 10131,
                        "date": "17-03-2022",
                        "paidOn": "17-02-2022"
                      }
                    ],
                    "outstandingAmount": 0,
                    "paidAmount": 10131,
                    "status": "Paid",
                    "paymentLink": {
                      "link": "https://fndf.in",
                      "expiryDate": "18-02-2022"
                    },
                    "orderId": "115"
                  }
                ]
              }
            ]
           
          

          const messsage = JSON.stringify(data);
         res.status(200).json({
                messsage,
                message:"successfully"
            
             
                
              }
         )
    }
    catch(error:any){
        res.status(500).json({
            message:"Internal Server Error",
            error:error.message
        })
    }
}