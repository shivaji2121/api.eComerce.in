const express = require('express');
const connectDB = require('./src/config/dataBase.js')
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/user.routes');
const adminRoutes = require('./src/routes/admin.routes');
const cartRoutes = require('./src/routes/cart.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})
