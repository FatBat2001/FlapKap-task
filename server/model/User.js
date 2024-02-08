const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        Buyer: {
            type: Number,
            default: 2001
        },
        Seller: Number
    },
    deposit:{
        type:Number,
        default:0 
    }, 
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);