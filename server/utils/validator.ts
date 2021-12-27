import { body } from 'express-validator';
import UserModel, { User } from '../models/User';

const userValidation = [
  body('username', 'Username required')
    .trim()
    .notEmpty()
    .isLength({ max: 50 })
    .withMessage('The username is too long.')
    .custom(async (username) => {
      if (!username.match(/^[A-Za-z0-9]+$/)) {
        throw new Error(
          'The username must not contain spaces or special characters (e.g. !@#$)',
        );
      }

      const isMatch: User | null = await UserModel.findOne({
        username,
      }).exec();
      if (isMatch) throw new Error('Username not available.');
    }),

  body('password', 'Password required.')
    .trim()
    .isLength({ min: 8 })
    .withMessage('The password must contain at least 8 characters.'),
];

const postValidation = [
  body('title', 'Title required.').trim().notEmpty().isLength({ max: 150 }),
  body('text', 'Post text required.').trim().notEmpty(),
  body('visibility').custom((value) => {
    if (value !== 'private' && value !== 'public') {
      throw new Error('Post visibility required.');
    }
    return true;
  }),
];

export { userValidation, postValidation };
