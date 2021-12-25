import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import UserModel, { User } from '../models/User';
import { userValidationRules } from '../utils/validator';
import { validationResult } from 'express-validator';

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
const userCreate: any = [
  userValidationRules,
  async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).array();
    if (errors) {
      return res.status(422).json({ username: req.body.username, errors });
    }

    try {
      const user: HydratedDocument<User> = new UserModel({
        username: req.body.username,
        password: await hashPassword(req.body.password),
      });

      await user.save();
      res.sendStatus(200);
    } catch (err) {
      return next(err);
    }
  },
];

const userController = { userList, userCreate };
export default userController;
