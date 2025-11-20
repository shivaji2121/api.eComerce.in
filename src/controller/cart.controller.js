const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { validationResult } = require('express-validator');
const calculateCartTotals = require('../utils/cartHelper');



const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price images');
        if (!cart) {
            return res.json({ items: [], totalItems: 0, totalPrice: 0 });
        }
        const updatedCart = await calculateCartTotals(cart);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product || !product.isActive) {
            return res.status(404).json({ message: 'Product not found or inactive' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                addedAt: new Date()
            });
        }

        const updatedCart = await calculateCartTotals(cart);
        await updatedCart.save();
        await updatedCart.populate('items.product', 'name price images');

        res.json({
            message: 'Item added to cart successfully',
            cart: updatedCart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (quantity < 1 || quantity > 50) {
            return res.status(400).json({ message: 'Quantity must be between 1 and 50' });
        }

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        const product = await Product.findById(productId);
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        cart.items[itemIndex].quantity = quantity;

        const updatedCart = await calculateCartTotals(cart);
        await updatedCart.save();
        await updatedCart.populate('items.product', 'name price images');

        res.json({
            message: 'Cart item updated successfully',
            cart: updatedCart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        const updatedCart = await calculateCartTotals(cart);
        await updatedCart.save();
        await updatedCart.populate('items.product', 'name price images');

        res.json({
            message: 'Item removed from cart successfully',
            cart: updatedCart
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
