import {  Input, Typography, useMediaQuery } from '@mui/material'
import {Button} from '@mui/material';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import useStore from '../store'

const SignUp = () => {

    const {isAuthenticated , setIsAuthenticated} = useStore();


    const isMobile = useMediaQuery('(max-width:780px)');


    const [name , setName] = useState<String>('');
    const [email , setEmail] = useState<String>('');

    const [password , setPassword] =useState<String>('');

    const handleClick = async()=>{
        
           await axios.post('http://localhost:4000/user/signup', {
                name: name,
                email: email,
                password:password
              })
              .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                setIsAuthenticated(true)

              }, (error:any) => {
                console.log(error);
                toast.error(error.response.data.message)
              });




    }

  return (
    isMobile?(
        <>
        <div><Toaster/></div>
        <div style={{display:"flex",justifyContent:"center" ,marginTop:"5%"}}>
        <div style={{  display:"flex",justifyContent:"center",borderRadius:"1rem" ,boxShadow:"inherit" }}>

        <Box width={200} boxShadow={10} component="section" sx={{ p: 4,borderRadius:'4px'  }}>
            <Typography>
            <Typography  sx={{fontFamily:"monospace",fontSize:"2rem" , fontWeight:700,}}>Sign Up</Typography>
            <div style={{marginTop:"2rem"}}>
            <Typography sx={{fontFamily:"monospace"}}>Name</Typography>
            <Input value={name} onChange={(e)=>setName(e.target.value)}/> 

            </div>
            <div style={{marginTop:"2rem"}}>
            <Typography sx={{fontFamily:"monospace"}}>Email</Typography>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} sx={{}}/> 

            </div>
            <div style={{marginTop:"2rem"}}>
            <Typography sx={{fontFamily:"monospace"}}>Password</Typography>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)}/> 

            </div>

            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
            <Button onClick={handleClick} variant='contained' sx={{background:"pink",color:"white"}}>SignUp</Button>

            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
           <Typography sx={{fontSize:"0.8rem"}}>Already Registered?</Typography> <a style={{fontSize:"0.8rem"}}  href='/'>Click Here</a>

            </div>

            </Typography>
            

    </Box>


        </div>


      
    </div>
    </>
    ):(<>
    <div><Toaster/></div>
        <div style={{display:"flex",justifyContent:"center" ,marginTop:"5%"}}>
        <div style={{  display:"flex",justifyContent:"center",borderRadius:"1rem" ,boxShadow:"inherit" }}>

        <Box width={400} boxShadow={10} component="section" sx={{ p: 4,borderRadius:'4px'  }}>
            <Typography>
            <Typography  sx={{fontFamily:"monospace",fontSize:"2rem" , fontWeight:700,}}>Sign Up</Typography>
            <div style={{marginTop:"2rem",display:"flex"}}>
            <Typography sx={{fontFamily:"monospace"}}>Name</Typography>
            <Input value={name} onChange={(e)=>setName(e.target.value)} sx={{marginLeft:"4.9rem"}}/> 

            </div>
            <div style={{marginTop:"2rem",display:"flex"}}>
            <Typography sx={{fontFamily:"monospace"}}>Email</Typography>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} sx={{marginLeft:"4.5rem"}}/> 

            </div>
            <div style={{marginTop:"2rem",display:"flex"}}>
            <Typography sx={{fontFamily:"monospace"}}>Password</Typography>
            <Input value={password} onChange={(e)=>setPassword(e.target.value)} sx={{marginLeft:"3rem"}}/> 

            </div>

            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
            <Button onClick={handleClick} variant='contained' sx={{background:"pink",color:"white"}}>SignUp</Button>

            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:"2rem"}}>
           <Typography sx={{fontSize:"0.8rem"}}>Already Registered?</Typography> <a style={{fontSize:"0.8rem"}}  href='/'>Click Here</a>

            </div>

            </Typography>
            

    </Box>


        </div>


      
    </div>
    </>
    )
    
  )
}

export default SignUp
