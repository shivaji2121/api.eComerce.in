const Product = require('../models/product.model');

const calculateCartTotals = async (cart) => {
    if (cart.items.length === 0) {
        cart.totalItems = 0;
        cart.totalPrice = 0;
        return cart;
    }

    const productIds = cart.items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds }, isActive: true });

    const productMap = products.reduce((map, product) => {
        map[product._id.toString()] = product.price;
        return map;
    }, {});

    const totals = cart.items.reduce((acc, item) => {
        const price = productMap[item.product._id.toString()];
        if (price !== undefined) {
            acc.totalItems += item.quantity;
            acc.totalPrice += price * item.quantity;
        }
        return acc;
    }, { totalItems: 0, totalPrice: 0 });

    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    return cart;
};

module.exports = calculateCartTotals;
