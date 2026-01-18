const  express  = require('express');
const router = express.Router();
const jwt   = require('jsonwebtoken');
const  Order = require('../models/Order');

const  auth = (req, res , next)=>{
    const  token  = req.headers.authorization?.split(' ')[1];
     if(!token){
        return res.status(401).json({
            success: false,
            message: 'No token Provided '
        });
     }
     try {
        const  decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user  = decoded;
        next();
     } catch (error) {
        res.status(401).json({
            success : false,
            message: 'Invalid tokens'
        });
     }
};

router.post('/', auth , async(req, res)=>{
    try {
        const {orderItems , totalPrice}= req.body;
        const order  = await Order.create({
            user: req.user.userId,
            orderItems,
            totalPrice
        });
        res.status(201).json({
            success: true,
            data:order
        });
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
});

router.get('/myorders', auth , async (req, res)=>{
    try{
        const orders = await Order.find({user:req.user.userId})
        .populate('orderItems.product', 'name price image')
        .sort({createdAt:-1});

        res.json({
            success : true,
            count : orders.length,
            data: orders
        });
    }
    catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
    }
});

module.exports = router;