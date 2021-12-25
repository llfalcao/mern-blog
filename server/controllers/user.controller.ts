import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { HydratedDocument } from 'mongoose';
import UserModel, { User } from '../models/User';

// Get all users
async function userList(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserModel.find().exec();
    res.json(users);
  } catch (err) {
    return next(err);
  }
}

async function hashPassword(password: string) {
  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hash;
}

// Create new user
const userCreate = [
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

      const isMatch: User | null = await UserModel.findOne({ username }).exec();
      if (isMatch) throw new Error('Username not available.');
    }),
  body('password', 'Password required.')
    .trim()
    .isLength({ min: 8 })
    .withMessage('The password must contain at least 8 characters.'),
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      const user: HydratedDocument<User> = new UserModel({
        username: req.body.username,
        password: await hashPassword(req.body.password),
      });

      if (!errors.isEmpty()) {
        return res.json({
          username: req.body.username,
          errors: errors.array(),
        });
      }

      await user.save();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const userController = { userList, userCreate };
export default userController;
