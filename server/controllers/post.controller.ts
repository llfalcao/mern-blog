import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HydratedDocument } from 'mongoose';
import passport from 'passport';
import { postValidation } from '../utils/validator';

import PostModel, { Post } from '../models/Post';

// Get all posts
async function postList(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await PostModel.find({}, { comments: 0 })
      .populate('author', 'username')
      .exec();
    res.json(posts);
  } catch (err) {
    return next(err);
  }
}

// Get a single post
async function postDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await PostModel.findById(req.params.post, { comments: 0 })
      .populate('author', 'username')
      .exec();
    if (!post) res.sendStatus(404);
    res.json(post);
  } catch (err) {
    return next(err);
  }
}

// Create new post
const postCreate: any = [
  postValidation,
  passport.authenticate('jwt', { session: false }),
  async function (req: any, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      console.log(req.body.private);

      const post: HydratedDocument<Post> = new PostModel({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
        created_at: new Date(),
        private: req.body.private === 'private' ? true : false,
      });

      if (!errors.isEmpty()) {
        return res.json({ post, errors: errors.array() });
      }

      await post.save();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const postController = { postList, postDetail, postCreate };
export default postController;
