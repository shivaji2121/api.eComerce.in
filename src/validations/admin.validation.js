const { body } = require('express-validator');

// Register admin validation
const registerAdminValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').optional().isMobilePhone().withMessage('Valid phone number is required'),
    body('address.street').optional().notEmpty().withMessage('Street is required if address is provided'),
    body('address.city').optional().notEmpty().withMessage('City is required if address is provided'),
    body('address.state').optional().notEmpty().withMessage('State is required if address is provided'),
    body('address.zip').optional().isPostalCode('any').withMessage('Valid zip code is required'),
    body('address.country').optional().notEmpty().withMessage('Country is required if address is provided')
];

// Create product validation
const createProductValidation = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('sku').optional().matches(/^[A-Za-z0-9\-]+$/).withMessage('SKU must contain only letters, numbers, and hyphens'),
    body('tags').optional().customSanitizer((value) => {
        if (typeof value === 'string') {
            return value.split(',').map(tag => tag.trim());
        } else if (Array.isArray(value)) {
            return value.map(tag => typeof tag === 'string' ? tag.trim() : tag);
        }
        return value;
    }),
    body('tags.*').optional().isLength({ max: 20 }).withMessage('Each tag must be at most 20 characters'),

];

// Update product validation
const updateProductValidation = [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    body('description').optional().isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('sku').optional().matches(/^[A-Za-z0-9\-]+$/).withMessage('SKU must contain only letters, numbers, and hyphens'),
];

// Update user role validation
const updateUserRoleValidation = [
    body('role').isIn(['user', 'admin']).withMessage('Role must be either user or admin')
];

// Update order status validation
const updateOrderStatusValidation = [
    body('status').isIn(['pending', 'shipped', 'delivered']).withMessage('Status must be pending, shipped, or delivered')
];

module.exports = {
    registerAdminValidation,
    createProductValidation,
    updateProductValidation,
    updateUserRoleValidation,
    updateOrderStatusValidation
};
