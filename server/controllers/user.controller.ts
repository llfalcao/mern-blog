import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { userValidation } from '../utils/validator';
import { validationResult } from 'express-validator';
import UserModel, { User } from '../models/User';

// Get all users
async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserModel.find({}, { username: 1 }).exec();
    res.status(200);
    res.json(users);
  } catch (err) {
    return next(err);
  }
}

// Create new user
const createUser: any = [
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

const userController = { getUsers, createUser };
export default userController;
