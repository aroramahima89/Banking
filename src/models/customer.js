const mongoose=require("mongoose");
const validator=require("validator");

const customerSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!!!")
            }
        }
    },
    currentbalance:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{collection:'Customers'})

//we need a collection
const Customer=mongoose.model("Customer",customerSchema);
module.exports=Customer;