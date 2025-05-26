const path = require('path');

// ✅ Load environment variables before anything else
require('dotenv').config({ path: path.join(__dirname, 'config/config.env') });


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/books');
const reviewRouter = require('./routes/reviews');
const errorMiddleware = require('./middleware/error');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/reviews', reviewRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use(errorMiddleware.errorMiddleware); 

module.exports = server;
