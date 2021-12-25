import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as routeHandler } from './routes';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

const mongoDB = process.env.MONGODB || '';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/api', (req, res) => {
  res.json({
    message:
      'Welcome to the blog API! Refer to https://github.com/llfalcao/mern-blog for the documentation.',
  });
});

app.use('/api/v1', routeHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
