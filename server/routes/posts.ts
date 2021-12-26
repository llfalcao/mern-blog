import { Router } from 'express';
import postController from '../controllers/post.controller';
import commentController from '../controllers/comment.controller';

const router = Router();

router.post('/', postController.postCreate);
router.get('/:post', postController.postDetail);
router.get('/:post/comments', commentController.getComments);
router.get('/', postController.postList);

export default router;
