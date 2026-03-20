import { body } from 'express-validator';
import { param } from "express-validator";

export const createUserValidation = [
  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),

  body('date_of_birth')
    .notEmpty().withMessage('Data de nascimento é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),

  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

  body('passwordConfirmation')
    .custom((value, { req }) =>
        value === req.body.password
    )
    .withMessage('As senhas não coincidem'),
];

export const updateUserValidation = [
  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),

  body('date_of_birth')
    .notEmpty().withMessage('Data de nascimento é obrigatório'),

  body('email')
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido'),

  body('oldPassword')
    .notEmpty().withMessage('Senha antiga é obrigatória'),

  body('password')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

  body('passwordConfirmation')
    .custom((value, { req }) =>
        value === req.body.password
    )
    .withMessage('As senhas não coincidem'),
];

export const deleteUserValidation = [
  param("id")
    .notEmpty().withMessage("ID é obrigatório")
    .isInt().withMessage("ID deve ser um número"),
];
