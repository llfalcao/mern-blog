import { Router } from 'express';
import postController from '../controllers/post.controller';
import commentController from '../controllers/comment.controller';

const router = Router();

router.post('/', postController.createPost);
router.get('/:post', postController.getPost);
router.get('/:post/comments', commentController.getComments);
router.get('/', postController.getPosts);

export default router;
