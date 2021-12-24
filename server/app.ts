import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as routeHandler } from './routes';

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message:
      'Welcome to the blog API! Refer to https://github.com/llfalcao/blog for the documentation.',
  });
});

app.use('/api/v1', routeHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
