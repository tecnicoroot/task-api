import { body } from 'express-validator';
import { param } from "express-validator";

export const createRoleValidation = [
  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),

];

export const deleteRoleValidation = [
  param("id")
    .notEmpty().withMessage("ID é obrigatório")
    .isInt().withMessage("ID deve ser um número"),
];
