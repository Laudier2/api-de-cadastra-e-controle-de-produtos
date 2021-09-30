const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.get = async() => {
    const res = await Product
    .find({
    }, 'name price image1 quantity peso')
    return res;
}

exports.getBayId = async(id) => {
    const res = await Product.findById(id);
    return res;
}

exports.create = async(data) => {
    const product = new Product(data)
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                quantity: data.quantity,
                price: data.price,
                peso: data.peso,
                image1: data.image1
            }
        })
}

exports.delete = async(id) => {
    await Product
    .findByIdAndDelete(id);
}
