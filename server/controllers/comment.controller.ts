import { Request, Response, NextFunction } from 'express';
import CommentModel from '../models/Comment';
import PostModel from '../models/Post';

// Get a single comment from a post
async function getComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { comment: commentId } = req.params;
    const comment = await CommentModel.findById(commentId)
      .populate('author', 'username')
      .exec();

    if (!comment) return next();
    res.json(comment);
  } catch (err) {
    return next(err);
  }
}

// Get all comments from a post
async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { post: postId } = req.params;
    const data = await PostModel.findById(postId, { comments: 1 })
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

const commentController = { getComment, getComments };
export default commentController;
