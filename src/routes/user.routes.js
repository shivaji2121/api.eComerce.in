const express = require('express');
const userRouter = express.Router();
const { register, login, getProfile, updateProfile, changePassword } = require('../controller/user.controller');
const { registerValidation, loginValidation, updateProfileValidation, changePasswordValidation } = require('../validations/user.validation');
const { isAuthenticated } = require('../middlewares/isAuthorized');

// User routes
userRouter.post('/register', registerValidation, register);
userRouter.post('/login', loginValidation, login);
userRouter.get('/profile', isAuthenticated, getProfile);
userRouter.put('/profile', isAuthenticated, updateProfileValidation, updateProfile);
userRouter.put('/change-password', isAuthenticated, changePasswordValidation, changePassword);

module.exports = userRouter;
