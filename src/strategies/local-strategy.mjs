import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/users.mjs";
import { comparePassword } from "../utils/helpers.mjs";


passport.serializeUser((user,done) => {
    console.log("SERIALIZE");
    done(null,user._id);
})

passport.deserializeUser(async (id,done) => {
    console.log("DESERIALIZE");
    try {
        
        const userFound=await User.findById(id);
        if(!userFound)
            throw new Error("User not found");
        
        done(null,userFound);

    } catch (error) {
        done(error,null);
    }
})

export default passport.use(
    new Strategy(async (username,password,done) => {
        
        try {
            console.log("IN STRATEGY");
            const foundUser=await User.findOne({username});
            if(!foundUser)
                throw new Error("User doesn't exist");

            if(!comparePassword(password,foundUser.password))
                throw new Error("Password is incorrect");
            
            console.log(foundUser);
            done(null,foundUser);


        } catch (error) {
            done(error,null);
        }
    }) 
)