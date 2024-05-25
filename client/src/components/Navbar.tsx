import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Typography from "@mui/material/Typography";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import { IoReorderThreeOutline } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const Navbar = () => {
    const [isClicked , setIsClicked] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const isMobile = useMediaQuery("(max-width:780px)");

    const handleClick =()=>{
        setIsClicked(!isClicked);
        handleOpen();
    }
  return (
    isMobile?(
        
        <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{backgroundColor:"grey" ,  borderRadius:"6px" , width:"80%" ,display:"flex",justifyContent:"space-between" }}>
            <a style={{cursor:"pointer",textDecoration:"none"}} href="/">
            <Typography sx={{color:"black",
             margin:"none",
             padding:"1rem",
             fontFamily:"monospace",
             fontWeight:900,
             fontSize:"1rem"
             
             }}> 
                BlendNet.ai
            </Typography>
            </a>

            <Typography sx={{color:"black",
             margin:"none",
             padding:'0.5rem',
             fontFamily:"monospace",
             fontWeight:900,
            
             
             }} >
                <Button onClick={handleClick}><IoReorderThreeOutline color='black' size='2rem' /></Button>

                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:"2rem"
}
}>
          <Typography sx={{
                fontFamily:"monospace",
                marginX:"3rem",
                
                
    
            }}>
            <a style={{ textDecoration:"none",color:"white",cursor:"pointer",}} href='/createwatchlist'>Create Your Watchlist</a>
            </Typography>
    
            <Typography sx={{
                fontFamily:"monospace",
                marginX:"3rem",
                color:"white",
                marginTop:"2rem"
    
            }}>
                <a style={{ textDecoration:"none",color:"white",cursor:"pointer"}} href="/dashboard">WatchList Dashboard</a>
            </Typography>
            <Button sx={{
                fontFamily:"",
                marginTop:"2rem",
                marginX:"3rem",
                backgroundColor:"white",
                borderRadius:"4px",

                
    
            }}>
                <a style={{ textDecoration:"none",color:"brown",cursor:"pointer",}} href="/signup">Sign Up</a>
            </Button>
            
        </Box>
      </Modal>
               
            </Typography>
    
          
           
    
    
    
          
        </div>
       
    
        </div>
    ):(
        <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{backgroundColor:"grey" ,  borderRadius:"6px" , width:"80%" ,display:"flex",justifyContent:"space-between" }}>
            <a style={{cursor:"pointer",textDecoration:"none"}} href="/">
            <Typography sx={{color:"black",
             margin:"none",
             padding:"1rem",
             fontFamily:"monospace",
             fontWeight:900,
             fontSize:"1.5rem"
             
             }}> 
                BlendNet.ai
            </Typography>
            </a>
    
            <Typography sx={{color:"black",
             margin:"none",
             padding:"1.5rem",
             display:"flex",
             fontFamily:"monospace",
             fontWeight:900,
             
             
             
    
             
             }} >
            <Typography sx={{
                fontFamily:"monospace",
                marginX:"3rem",
                
    
            }}>
            <a style={{ textDecoration:"none",color:"black",cursor:"pointer",}} href='/createwatchlist'>Create Your Watchlist</a>
            </Typography>
    
            <Typography sx={{
                fontFamily:"monospace",
                marginX:"3rem"
    
            }}>
                <a style={{ textDecoration:"none",color:"black",cursor:"pointer",}} href="/dashboard">WatchList Dashboard</a>
            </Typography>

            <Button sx={{
                fontFamily:"",
                marginX:"3rem",
                backgroundColor:"black",
                borderRadius:"4px",
                
    
            }}>
                <a style={{ textDecoration:"none",color:"white",cursor:"pointer",}} href="/signup">Sign Up</a>
            </Button>
            
    
            </Typography>
    
           
    
    
    
          
        </div>
    
        </div>
    )
   
  )
}

export default Navbar

