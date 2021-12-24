import { Router } from 'express';
const router = Router();

router.get('/', (req, res) =>
  res.json({ message: 'Comments API - To be implemented...' }),
);

export default router;
