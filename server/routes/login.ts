import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);

        const body = { _id: user._id, usename: user.username };
        const secret: any = process.env.SECRET;
        const token = jwt.sign({ user: body }, secret);

        return res.json({ token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

export default router;
