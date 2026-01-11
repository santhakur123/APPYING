const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String ,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    isAdmin:{
        type:Boolean,
        default:false

    }

},{
    timestamps:true
});

userSchema.pre('save',async function(){
  if(!this.isModified("password")) return ;
  this.password=await bcrypt.hash(this.password,12);
  
});
module.exports=mongoose.model("userSchema",userSchema);