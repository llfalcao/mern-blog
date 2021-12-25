import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

// Get all posts
async function postList(req: Request, res: Response, next: NextFunction) {
  try {
    const posts: object[] = await Post.find().exec();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
}

const postController = { postList };
export default postController;
