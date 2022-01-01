import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CommentModel from '../models/Comment';
import PostModel from '../models/Post';
import { commentValidation } from '../utils/validator';

// Get a single comment from a post
async function getComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { comment: commentId } = req.params;
    const comment = await CommentModel.findById(commentId).exec();
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
      .populate({ path: 'comments', options: { sort: { created_at: -1 } } })
      .exec();

    const comments = data!.comments;
    if (!comments) return res.sendStatus(404);
    res.json(comments);
  } catch (err) {
    return next(err);
  }
}

// Create a new comment
const createComment: any = [
  commentValidation,
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      const { author, text, post } = req.body;
      const comment = new CommentModel({
        author,
        text,
        post,
        created_at: new Date(),
      });

      if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
      }

      const postRef = await PostModel.findById(post).exec();
      postRef?.comments.push(comment._id);
      await postRef?.save();
      await comment.save();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const commentController = { getComment, getComments, createComment };
export default commentController;
