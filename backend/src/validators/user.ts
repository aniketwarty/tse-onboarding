import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");

const makeProfilePictureUrlValidator = () =>
  body("profilePictureUrl").optional().isString().withMessage("profilePictureUrl must be a string");

export const createUser = [makeNameValidator(), makeProfilePictureUrlValidator()];
