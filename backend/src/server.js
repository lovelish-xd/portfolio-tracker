require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./api/auth');
const stockRoutes = require('./routes/stockRoutes');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('server is up and running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
