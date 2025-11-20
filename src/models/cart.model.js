const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, max: 50 },
        addedAt: { type: Date, default: Date.now }
    }],
    totalItems: { type: Number, default: 0, min: 0 },
    totalPrice: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

// Ensure unique products in cart
cartSchema.pre('save', function (next) {
    const productIds = this.items.map(item => item.product.toString());
    if (new Set(productIds).size !== productIds.length) {
        return next(new Error('Duplicate products are not allowed in cart'));
    }
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
