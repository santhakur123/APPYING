require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Mongo
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo Connected"))
.catch(err=> console.log("Mongo error:", err ));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/products", require("./routes/products"));
app.use('/api/orders', require('./routes/orders'))

//Test route
app.get('/',(req, res)=>{
    res.json({message:'Ecom API is runnung!'}); 
})

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})