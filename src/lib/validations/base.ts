import { z } from 'zod';

/**
 * Validação para campos de data no formato ISO 8601 (YYYY-MM-DD)
 */
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD');

/**
 * Validação para campos monetários (números positivos com até 2 casas decimais)
 */
export const currencySchema = z
  .number({
    required_error: 'Valor é obrigatório',
    invalid_type_error: 'Valor deve ser um número',
  })
  .min(0, 'Valor não pode ser negativo');

/**
 * Validação para taxas (números entre 0 e 100, com até 2 casas decimais)
 */
export const rateSchema = z
  .number({
    required_error: 'Taxa é obrigatória',
    invalid_type_error: 'Taxa deve ser um número',
  })
  .min(0, 'Taxa não pode ser negativa')
  .max(100, 'Taxa não pode ser maior que 100%');

/**
 * Validação para campos de texto obrigatórios
 */
export const requiredStringSchema = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} deve ser um texto`,
    })
    .min(1, `${fieldName} não pode estar vazio`);

/**
 * Validação para campos de texto opcionais
 */
export const optionalStringSchema = z.string().optional();

/**
 * Validação para campos numéricos inteiros positivos
 */
export const positiveIntegerSchema = (fieldName: string) =>
  z
    .number({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} deve ser um número`,
    })
    .int(`${fieldName} deve ser um número inteiro`)
    .min(1, `${fieldName} deve ser maior que zero`);

/**
 * Validação para campos booleanos
 */
export const booleanSchema = z.boolean({
  required_error: 'Valor booleano é obrigatório',
  invalid_type_error: 'Valor deve ser verdadeiro ou falso',
});

/**
 * Validação para campos de e-mail
 */
export const emailSchema = z.string().email('E-mail inválido').optional().or(z.literal(''));

/**
 * Validação para campos de telefone (formato brasileiro)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\(\d{2}\)\s?)?(\d{4,5}-?\d{4})$/, 'Telefone inválido. Use o formato (XX) XXXXX-XXXX')
  .optional()
  .or(z.literal(''));

/**
 * Validação para CPF (formato brasileiro)
 */
export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido. Use o formato XXX.XXX.XXX-XX')
  .optional()
  .or(z.literal(''));
