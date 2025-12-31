import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

type CreateUserBody = {
  name: string;
  profilePictureUrl?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, profilePictureUrl } = req.body as CreateUserBody;

  try {
    validationErrorParser(errors);

    const newUser = await UserModel.create({
      name,
      profilePictureUrl,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const userId = req.params.id;

  try {
    validationErrorParser(errors);

    const user = await UserModel.findById(userId);

    if (user === null) {
      throw createHttpError(404, "User not found.");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
