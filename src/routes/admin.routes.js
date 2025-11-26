const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getDashboardStats,
    registerAdmin
} = require('../controller/admin.controller');
const {
    createProductValidation,
    updateProductValidation,
    registerAdminValidation,
    updateUserRoleValidation,
    updateOrderStatusValidation
} = require('../validations/admin.validation');
const { handleValidationErrors } = require('../middlewares/validationHandler');
const { isAuthenticated, isAdmin } = require('../middlewares/isAuthorized');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Admin registration (public)
router.post('/register', registerAdminValidation, handleValidationErrors, registerAdmin);

// User management routes (admin only)
router.get('/users', isAuthenticated, isAdmin, getAllUsers);
router.get('/users/:id', isAuthenticated, isAdmin, getUserById);
router.put('/users/:id/role', isAuthenticated, isAdmin, updateUserRoleValidation, handleValidationErrors, updateUserRole);
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);

// Product management routes (admin only)
router.get('/products', isAuthenticated, getAllProducts);
router.post('/products', isAuthenticated, isAdmin, upload.single('image'), createProductValidation, handleValidationErrors, createProduct);
router.put('/products/:id', isAuthenticated, isAdmin, upload.single('image'), updateProductValidation, handleValidationErrors, updateProduct);
router.delete('/products/:id', isAuthenticated, isAdmin, deleteProduct);

// Order management routes (admin only)
router.get('/orders', isAuthenticated, isAdmin, getAllOrders);
router.put('/orders/:id/status', isAuthenticated, isAdmin, updateOrderStatusValidation, handleValidationErrors, updateOrderStatus);

// Dashboard stats (admin only)
router.get('/dashboard/stats', isAuthenticated, isAdmin, getDashboardStats);

module.exports = router;
