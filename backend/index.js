import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import accountRoutes from './routes/account.js';
import transactionRoutes from './routes/transaction.js';
import billRoutes from './routes/bill.js';

const PORT = 8888;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Set up session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // Replace with a strong secret key
    resave: false, // Forces session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (1 day in this case)
    },
  })
);

// Create a connection pool
const db = mongoose.connect(process.env.MONGO_URI);

// Define a function to get a session from the connection pool
export const getSession = async () => {
  return await mongoose.startSession();
};

app.use('/api/auth', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/bill', billRoutes);

db.then(() => console.log(`MongoDB connect`)).catch((err) =>
  console.error(err)
);

app.listen(PORT, () => `Server is running on ${PORT}`);
