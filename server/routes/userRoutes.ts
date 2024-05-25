import express from 'express'
import {login, register , dashboard} from '../controllers/user'
import { isAuthenticated } from '../middleware/user';
const app = express.Router();
app.use(express.json())
app.post('/signup',register);
app.post('/login',login);
app.get('/dashboard',dashboard); 


export default app



