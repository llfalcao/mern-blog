import { Router } from 'express';
import postController from '../controllers/post.controller';
import commentController from '../controllers/comment.controller';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', postController.createPost);
router.get('/:post', postController.getPost);
// router.get('/:post/edit', postController.editPost);
router.get('/:post/comments/:comment', commentController.getComment);
router.get('/:post/comments', commentController.getComments);

export default router;
