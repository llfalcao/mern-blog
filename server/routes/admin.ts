import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      message: 'Welcome to the admin section!',
      user: req.user,
      token: req.query.secret_token,
    });
  },
);

export default router;
