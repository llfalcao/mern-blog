import { Request, Response, NextFunction } from 'express';
import PostModel from '../models/Post';

// Get all comments from a post
async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { post } = req.params;
    const data = await PostModel.findById(post, { comments: 1 })
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' },
      })
      .exec();

    const comments = data!.comments;
    if (!comments) return res.sendStatus(404);
    res.json(comments);
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

const commentController = { getComments };
export default commentController;
