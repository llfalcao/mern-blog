import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import UserModel, { User } from '../models/User';
import { userValidation } from '../utils/validator';
import { validationResult } from 'express-validator';

// Get all users
async function userList(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserModel.find({}, { username: 1 }).exec();
    res.status(200);
    res.json(users);
  } catch (err) {
    return next(err);
  }
}

// Create new user
const userCreate: any = [
  userValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      return res.status(422).json({ username: req.body.username, errors });
    }

    try {
      const user: HydratedDocument<User> = new UserModel({
        username: req.body.username,
        password: req.body.password,
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
