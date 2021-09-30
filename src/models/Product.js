const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    peso:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image1:{
        type: String,
        required: false
    },
})

module.exports = mongoose.model("Product", schema)