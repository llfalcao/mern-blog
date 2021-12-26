import { Router } from 'express';
import postController from '../controllers/post.controller';
const router = Router();

router.get('/', postController.postList);
router.post('/', postController.postCreate);

export default router;
