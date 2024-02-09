const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    amountAvailable: {
        type:Number, 
        required:true 
    }, 
    cost: {
        type:Number,
        required:true
    },
    sellerId: {
        type:String, 
        required:true 
    }
});

module.exports = mongoose.model('Product', productSchema);