import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Email address not correct').isEmail(),
    body('username', 'username lenght must be >3 and <10').isLength({ min: 3 }).isLength({ max: 10 }),
    body('profilePicture','use the URL for avatar').optional().isURL(),

];