import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

const PORT = 8080;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connect`))
  .catch((err) => console.error(err));

app.listen(PORT, () => `Server is running on ${PORT}`);
