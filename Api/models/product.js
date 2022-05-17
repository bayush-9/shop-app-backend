const mongoose =require('mongoose');

const productSchema= mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    title:{type: String, required: true},
    description:{type: String, required: true},
    imageUrl:{type: String, required: true},
    isFavourite:{type: Boolean, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Product', productSchema);
