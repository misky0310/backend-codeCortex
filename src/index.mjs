import express from 'express';
import userRouter from './routes/users.mjs';
import connectDB from './utils/connectDB.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import "./strategies/local-strategy.mjs";
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const app=express();
const PORT=5052;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

await connectDB();
app.use(express.json());

app.use(cookieParser('iCYyuGwZlmM0b4K42yMhyeG5bnLNSMAzlNtn51NmByM='))

app.use(session({
    secret:'iCYyuGwZlmM0b4K42yMhyeG5bnLNSMAzlNtn51NmByM',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000*60,
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient()
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter)



app.post('/api/auth/login', passport.authenticate('local'), (req,res) => {
    return res.sendStatus(200);
})

app.post('/api/auth/logout', (req,res) => {
    req.logout((err) => {
        if(err)
            return res.sendStatus(401);
    });
    return res.status(200).send({msg:"Logged out successfully"});
})

app.get('/api/auth', (req,res) => {
    return req.user? res.send(req.user): res.sendStatus(401);
})

