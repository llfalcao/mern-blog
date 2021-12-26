import { Router } from 'express';
import login from './login';
import admin from './admin';
import users from './users';
import posts from './posts';
import comments from './comments';

const router = Router();

router.get('/api', (req, res) => {
  res.json({
    message:
      'Welcome to the blog API! Refer to https://github.com/llfalcao/mern-blog for the documentation.',
  });
});

router.use('/login', login);
router.use('/admin', admin);
router.use('/api/v1/users', users);
router.use('/api/v1/posts', posts);
router.use('/api/v1/comments', comments);

export default router;
