import { Router } from 'express';
import commentController from '../controllers/comment.controller';

const router = Router();

// Handle comment submission
router.post('/', commentController.createComment);

// Get a single comment
router.get('/:comment', commentController.getComment);

// Delete comment
router.post('/:comment/delete', commentController.deleteComment);

export default router;
