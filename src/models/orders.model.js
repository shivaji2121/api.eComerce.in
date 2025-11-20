const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, max: 100 },
        price: { type: Number, required: true, min: 0 }
    }],
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: {
        street: { type: String, required: true, trim: true, minlength: 5, maxlength: 100 },
        city: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        state: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
        zip: { type: String, required: true, trim: true, match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'] },
        country: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 }
    },
    paymentMethod: { type: String, enum: ['card', 'paypal', 'cod'], default: 'card' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    trackingNumber: { type: String, trim: true, maxlength: 50 },
    deliveredAt: Date,
    notes: { type: String, trim: true, maxlength: 500 },
    orderNumber: { type: String, unique: true, match: [/^ORD-\d{8}-\d{4}$/, 'Invalid order number format'] }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
