const { body } = require('express-validator');

const registerValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number'),
    body('address.street')
        .optional()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Street address must be at least 5 characters'),
    body('address.city')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('City must be at least 2 characters'),
    body('address.zip')
        .optional()
        .isPostalCode('any')
        .withMessage('Please provide a valid zip code'),
    body('address.country')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Country must be at least 2 characters')
];

const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .exists()
        .withMessage('Password is required')
];

const updateProfileValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number'),
    body('address.street')
        .optional()
        .trim()
        .isLength({ min: 5 })
        .withMessage('Street address must be at least 5 characters'),
    body('address.city')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('City must be at least 2 characters'),
    body('address.zip')
        .optional()
        .isPostalCode('any')
        .withMessage('Please provide a valid zip code'),
    body('address.country')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Country must be at least 2 characters')
];

const changePasswordValidation = [
    body('currentPassword')
        .exists()
        .withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
];

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation
};
