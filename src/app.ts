import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes';
import wordsRoutes from './routes/words.routes';
import errorHandlerMiddleware from './middlewares/error.middleware';

dotenv.config();

const app: express.Application = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

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
app.use('/posts', postsRoutes);
app.use('/words', wordsRoutes);

// Error handlers
app.use(errorHandlerMiddleware);

export default app;
