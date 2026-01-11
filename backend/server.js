require("dotenv").config();

const express =require("express");
const app= express();
const cors=require("cors");
const authRoute=require("./routes/Authroutes");

const mongoose=require("mongoose");

app.use(cors());
app.use(express.json());

const PORT=process.env.PORT||5000;
 const dbURL=process.env.MONGO_URL;
mongoose.connect(dbURL)
  .then(() => console.log('Connected!'))
  .catch(err=> console.log("mongo error",err));

app.get("/",(req,res)=>{
    res.send("Server is Listening");
})
app.use("/api/auth",authRoute);
app.listen(PORT,()=>{
    console.log("Listening to the port", {PORT});
})