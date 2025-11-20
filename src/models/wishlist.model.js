const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'My Wishlist', trim: true, minlength: 2, maxlength: 50 },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        addedAt: { type: Date, default: Date.now }
    }],
    isPublic: { type: Boolean, default: false }
}, { timestamps: true });

// Ensure unique products in wishlist
wishlistSchema.pre('save', function (next) {
    const productIds = this.products.map(item => item.product.toString());
    if (new Set(productIds).size !== productIds.length) {
        return next(new Error('Duplicate products are not allowed in wishlist'));
    }
    next();
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
