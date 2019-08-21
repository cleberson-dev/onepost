import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import errorHandlerMiddleware from './middlewares/error.middleware';

dotenv.config();

const app: express.Application = express();

// Middlewares
app.use(bodyParser.json());

// Initializing DB
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/onepost';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (): void => {
  console.log('Database connected.');
});

// Inserting the routes
app.use('/auth', authRoutes);

// Error handlers
app.use(errorHandlerMiddleware);

export default app;
