const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    first-name: {
        type:String,
        required:true
    },
    last-name: {
        type: String
    }, 
    email: {
        type:String,
        required:true
    },
      phone: {
        type:Number,
        required:true
    },
      message: {
        type:String,
        required:true
    },  
    options: {
        type:String,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message', messageSchema)