import express from 'express';
import {hashPasswordWithSalt} from '../utils/hash.js'
import {createUser, existingUser, getUserByEmail} from '../services/user.service.js'
import { signupPostRequestBodySchema } from '../validation/request.validation.js';
const router = express.Router();


router.post('/signup', async (req,res)=>{
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error) return res.status(400).json({error: validationResult.error.format()})
    const {firstname,lastname,email,password} = validationResult.data;
    const existingUser = await getUserByEmail(email);
    
    if(existingUser) return res.status(400).json({error : `User with ${email} already exists`});

    const {salt,password:hashedPassword} = hashPasswordWithSalt(password);

    const user = await createUser({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword,
    });

    return res.status(200).json({data : {userId : user.id}});
})

export default router;