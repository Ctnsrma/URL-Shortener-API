import express from 'express';
import {hashPasswordWithSalt} from '../utils/hash.js'
import {createUser, existingUser, getUserByEmail} from '../services/user.service.js'
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validation/request.validation.js';
import { createUserToken } from '../utils/token.js';


const router = express.Router();


router.post('/signup', async (req,res)=>{
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error) return res.status(400).json({error: validationResult.error.format()})
    const {firstname,lastname,email,password} = validationResult.data;
    const userExists = await existingUser(email);
    
    if(userExists) return res.status(400).json({error : `User with ${email} already exists`});

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

router.post('/login',async (req,res)=>{
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error) return res.status(400).json({error : validationResult.error.format()});
    const { email,password } = validationResult.data;
    const user = await getUserByEmail(email);
    if(!user) return res.status(404).json({error : `User with email ${email} does not exists`})
    
    const {password : hashedPassword} = hashPasswordWithSalt(password,user.salt);
    if(user.password !== hashedPassword){
        return res.status(400).json({error : `Invalid Password`});
    }
    const token = await createUserToken({id:user.id});
    res.json({token});
})

export default router;