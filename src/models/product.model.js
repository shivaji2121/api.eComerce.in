const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 2, maxength: 100 },
    description: { type: String, trim: true, maxlength: 1000 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    subcategory: { type: String, trim: true, minlength: 2, maxlength: 50 },
    brand: { type: String, trim: true, minlength: 2, maxlength: 50 },
    images: [{
        type: String,
        match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i, 'Please enter a valid image URL']
    }],
    stock: { type: Number, default: 0, min: 0 },
    weight: { type: Number, min: 0 },
    dimensions: {
        length: { type: Number, min: 0 },
        width: { type: Number, min: 0 },
        height: { type: Number, min: 0 }
    },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },
    sku: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: [/^[A-Z0-9-]+$/, 'SKU must be uppercase alphanumeric with hyphens']
    },
    seoTitle: { type: String, trim: true, maxlength: 60 },
    seoDescription: { type: String, trim: true, maxlength: 160 },
    deletedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
