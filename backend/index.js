import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

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
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (1 day in this case)
    },
  })
);

app.use('/api/auth', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connect`))
  .catch((err) => console.error(err));

app.listen(PORT, () => `Server is running on ${PORT}`);
