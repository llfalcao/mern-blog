import { Router } from 'express';
const router = Router();

router.get('/', (req, res) =>
  res.json({ message: 'Posts API - To be implemented...' }),
);

export default router;
