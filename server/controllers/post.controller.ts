import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HydratedDocument } from 'mongoose';
import passport from 'passport';
import { postValidation } from '../utils/validator';
import PostModel, { Post } from '../models/Post';

// Get all posts
async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    let posts;
    // Get all posts, including unpublished ones
    if (req.query.allPosts === '1') {
      posts = await PostModel.find({}, { comments: 0 })
        .populate('author', 'username')
        .sort({ created_at: -1 })
        .exec();
    } else {
      // Get only published posts
      posts = await PostModel.find({ private: false }, { comments: 0 })
        .populate('author', 'username')
        .sort({ created_at: -1 })
        .exec();
    }

    res.json(posts);
  } catch (err) {
    return next(err);
  }
}

// Get a single post
async function getPost(req: Request, res: Response, next: NextFunction) {
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
const createPost: any = [
  postValidation,
  passport.authenticate('jwt', { session: false }),
  async function (req: any, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      const post: HydratedDocument<Post> = new PostModel({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
        created_at: new Date(),
        private: req.body.visibility === 'private' ? true : false,
      });

      if (!errors.isEmpty()) {
        return res.status(403).json({ post, errors: errors.array() });
      }

      await post.save();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

// Update post
const updatePost: any = [
  postValidation,
  passport.authenticate('jwt', { session: false }),
  async function (req: any, res: Response, next: NextFunction) {
    console.log(req.params, req.body);
    try {
      const errors = validationResult(req);

      const post = {
        title: req.body.title,
        text: req.body.text,
        updated_at: new Date(),
        private: req.body.visibility === 'private' ? true : false,
      };

      if (!errors.isEmpty()) {
        return res.status(403).json({ post, errors: errors.array() });
      }

      await PostModel.updateOne({ _id: req.params.post }, post).exec();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

// Delete post
async function deletePost(req: any, res: Response, next: NextFunction) {
  try {
    await PostModel.deleteOne({ _id: req.params.post }).exec();
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
}

const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
export default postController;
