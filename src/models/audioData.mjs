import mongoose from "mongoose";

const audioDataSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    emotions:{
        type:Array,
    },
},{createdAt:true});

const Audiodata=mongoose.model('Audiodata',audioDataSchema);

export default Audiodata;