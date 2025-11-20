const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Product = require('../models/product.model');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        // Clear existing users
        await User.deleteMany();

        // Hash password
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                phone: '1234567890',
                address: {
                    street: '123 Admin St',
                    city: 'Admin City',
                    state: 'AC',
                    zip: '12345',
                    country: 'USA'
                }
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'user',
                phone: '0987654321',
                address: {
                    street: '456 User St',
                    city: 'User City',
                    state: 'UC',
                    zip: '67890',
                    country: 'USA'
                }
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'user',
                phone: '1122334455',
                address: {
                    street: '789 User Ave',
                    city: 'User Town',
                    state: 'UT',
                    zip: '54321',
                    country: 'USA'
                }
            }
        ];

        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

const seedProducts = async () => {
    try {
        // Clear existing products
        await Product.deleteMany();

        const products = [
            {
                name: 'Laptop',
                description: 'A high-performance laptop',
                price: 999.99,
                category: 'Electronics',
                images: ['https://example.com/laptop.jpg'],
                stock: 10
            },
            {
                name: 'T-Shirt',
                description: 'Comfortable cotton t-shirt',
                price: 19.99,
                category: 'Clothing',
                images: ['https://example.com/tshirt.jpg'],
                stock: 50
            },
            {
                name: 'Book',
                description: 'An interesting novel',
                price: 9.99,
                category: 'Books',
                images: ['https://example.com/book.jpg'],
                stock: 20
            }
        ];

        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};

const runSeeder = async () => {
    await connectDB();
    await seedUsers();
    await seedProducts();
    console.log('Seeding completed');
    process.exit();
};

runSeeder();
