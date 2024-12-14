//import
import { body, validationResult } from 'express-validator';
// validations
export const validation ={
    "*":(req, res, next) => validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() }),
    "get_data":[],
    "get1_data":[],
    "send_data":[
        body('username')
        .exists()
        .withMessage('Name is required')
        .bail()
        .matches(/^.{4,}$/)
        .withMessage('Enter Proper Name')
        .bail()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .matches(/^[^\d]/)
        .withMessage('Name should not start with a number')
        .bail()
        .not()
        .matches(/['-=]/)
        .withMessage('Name should not contain single quotes or hyphens')
        ,
        body('password')
        .exists()
        .withMessage('password is required')
        .bail()
        .matches(/^.{4,}$/)
        .withMessage('Enter Proper password')
        .bail()
        .isString()
        .withMessage('password must be a string')
    ],
    "login_data":[
        body('username')
        .exists()
        .withMessage('Name is required')
        .bail()
        .matches(/^.{4,}$/)
        .withMessage('Enter Proper Name')
        .bail()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .matches(/^[^\d]/)
        .withMessage('Name should not start with a number')
        .bail()
        .not()
        .matches(/['-=]/)
        .withMessage('Name should not contain single quotes or hyphens')
        ,
        body('password')
        .exists()
        .withMessage('password is required')
        .bail()
        .matches(/^.{4,}$/)
        .withMessage('Enter Proper password')
        .bail()
        .isString()
        .withMessage('password must be a string')
    ]
}