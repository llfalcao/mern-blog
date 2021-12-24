import { Router } from 'express';
import users from './users';
import posts from './posts';
import comments from './comments';

const router = Router();

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

export { router };
