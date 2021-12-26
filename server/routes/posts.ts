import { Router } from 'express';
import postController from '../controllers/post.controller';

const router = Router();

router.get('/', postController.postList);
router.post('/', postController.postCreate);
router.get('/:post', postController.postDetail);

export default router;
