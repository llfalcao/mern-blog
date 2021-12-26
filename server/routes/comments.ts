import { Router } from 'express';
import commentController from '../controllers/comment.controller';

const router = Router();

// Get a single comment
router.get('/:comment', commentController.getComment);

export default router;
