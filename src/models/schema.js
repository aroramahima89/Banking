const mongoose=require("mongoose");

const historySchema =new mongoose.Schema({
    sender:{
        type:String,
        required:true,
        minLength:3
    },
    receiver:{
        type:String,
        required:true,
        minLength:3
    },
    amount:{
        type:Number,
        required:true
    }
})

const History=mongoose.model("History",historySchema);
module.exports=History;