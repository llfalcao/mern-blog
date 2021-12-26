import { Request, Response, NextFunction } from 'express';
import PostModel from '../models/Post';

// Get all comments from a post
async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await PostModel.findById(req.params.post, {
      comments: 1,
    }).exec();

    const comments = data!.comments;
    if (!comments) return res.sendStatus(404);

    res.json(comments);
  } catch (err) {
    return next(err);
  }
}

const commentController = { getComments };
export default commentController;
