const express = require('express');
const cartRouter = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controller/cart.controller');
const { isAuthenticated } = require('../middlewares/isAuthorized');

// Cart routes
cartRouter.get('/', isAuthenticated, getCart);
cartRouter.post('/add', isAuthenticated, addToCart);
cartRouter.put('/update/:productId', isAuthenticated, updateCartItem);
cartRouter.delete('/remove/:productId', isAuthenticated, removeFromCart);
cartRouter.delete('/clear', isAuthenticated, clearCart);

module.exports = cartRouter;
