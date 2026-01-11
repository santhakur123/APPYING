const mongoose=require("mongoose");
const User=require("/Usermodel.js");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        
        maxlength:15

    },
    image:{
        type:String,
        default:''
    },
    stock:{
        type:Number,
        default:0,
        min:0,

    },category:{
        type:String,
        default:'General'

    },
    brand:{
        type:String
    }

    

},{
    timestamps:true
});
module.exports=mongoose.model("ProductModel",productSchema);