require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());
// // Import Routes
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookshelfRoutes = require("./routes/bookshelfRoutes");

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use("/api/bookshelves", bookshelfRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Review System API!');
});

// MongoDB Connection
const PORT = process.env.PORT || 3004;
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });
