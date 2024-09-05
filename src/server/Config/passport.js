import database from "../Models/index.js";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
const { db} = database;
const User = db.User;

const passportAuth = (passport) => {
    //passport local strategy
    passport.use(new Strategy(async (username, password, cb) => {
        try {
            const user = await User.findOne({ where: { email: username } });
            //user not found
            if (!user) {
                return cb(null, false, { message: "Incorrect username" });
            }
            //compare password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return cb(err);
                }
                if (result) {
                    return cb(null, user);
                } else {
                    return cb(null, false, { message: "Incorrect password" });
                }
            });
        } catch (err) {
            return cb(err);
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user);
    }
    );

    passport.deserializeUser((user, cb) => {
        cb(null, user);
    });
}

export default passportAuth;