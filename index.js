import express from 'express';
import { authenticationMiddleware } from './middleware/auth.middleware.js';
import userRouter from './routes/user.routes.js'
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({'Status' : "Server up and running"});
})

app.use('/user', userRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})