import mongoose from "mongoose";

const videoDataSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    emotions:{
        type:Object,
    },
},{createdAt:true});

const Videodata=mongoose.model('Videodata',videoDataSchema);

export default Videodata;