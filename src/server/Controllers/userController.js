import database from '../Models/index.js';
import bcrypt from 'bcrypt';
import Joi from 'joi';

const {db} = database;
const User = db.User;
//create account
const signUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;

    const userInfo = {
        fname,
        lname,
        email,
        password: await bcrypt.hash(password, 10)
    };
    //console.log(userInfo);
    //validation
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    try{
        await schema.validateAsync(userInfo);
    }catch(err){
        return res.status(400).json({error: err.message});
    }

    //create user
    try{
        const user = await User.create(userInfo);
        return res.status(201).json({message: 'User created successfully', user});
    }catch(err){
        return res.status(500).json({message: err.message});
    }

};

//get authenticated user
const getAuth= async (req, res) => {
    if(req.isAuthenticated()){
        return res.status(200).json({message: 'User is authenticated', user: req.user});
    }else{
        return res.status(401).json({message: 'User is not authenticated'});
    }
};

export default { signUp, getAuth };
