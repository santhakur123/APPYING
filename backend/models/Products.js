const mongoose   = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name required"],
  },
  price: {
    type: Number,
    required: [true, "Price required"],
    min: [0, "Price cannot be Negative"],
  },
  decription: {
    type: String,
    maxLength: [500, "Description"],
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x300?text=No+Image",
  },
  category:{
    type:String ,
    default:"General"
  },
  stock:{
    type: Number,
    default:0,
    min:[0,'Stock cannot be negative']
  },
  brand:{
    type:String
  }
},{
    timestamps: true
});

module.exports = mongoose.model('Product' ,productSchema );