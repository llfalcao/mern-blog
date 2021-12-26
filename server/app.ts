import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import routes from './routes';
import './auth/auth';

const mongoDB = process.env.MONGODB || '';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use('/', routes);

// Error Handling
app.use(((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
}) as ErrorRequestHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
