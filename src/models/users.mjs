import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:[true,'Username must be provided'],
        unique:true,
    },
    email:{
        type:mongoose.Schema.Types.String,
        required:[true,'Email must be provided'],
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:[true,'Password must be provided']
    }
})

const User= mongoose.model('User',userSchema);  

export default User;