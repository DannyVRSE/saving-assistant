import database from '../Models/index.js';
import bcrypt from 'bcrypt';

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
    //create user
    try{
        const user = await User.create(userInfo);
        return res.status(201).json({message: 'User created successfully', user});
    }catch(err){
        return res.status(400).json({error: err.message});
    }

}

export default { signUp };
