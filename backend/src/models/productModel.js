const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, enum: ['Masculino', 'Femenino', 'Unisex'], required: true },
    olfactoryFamily: { type: String, required: true },
    concentration: { type: String },
    sizeMl: { type: Number, required: true },
    price: { type: Number, required: true },
    previousPrice: { type: Number },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },
    image: { type: String, required: true },
    gallery: [String],
    featured: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
