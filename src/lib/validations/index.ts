// ============================================================================
// VALIDAÇÕES CENTRALIZADAS - FINANCIAL PLANNER
// ============================================================================
// Centraliza todas as validações usando Zod

import * as z from 'zod';

// ============================================================================
// SCHEMAS DE VALIDAÇÃO
// ============================================================================

// Schema para simulações
export const simulationSchema = z.object({
    name: z.string()
        .min(1, 'Nome é obrigatório')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    startDate: z.string()
        .min(1, 'Data de início é obrigatória')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
    realRate: z.number()
        .min(0, 'Taxa deve ser positiva')
        .max(100, 'Taxa deve ser menor que 100%'),
    status: z.enum(['Vivo', 'Morto', 'Inválido'], {
        required_error: 'Status é obrigatório'
    })
});

// Schema para alocações
export const allocationSchema = z.object({
    name: z.string()
        .min(1, 'Nome é obrigatório')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    type: z.enum(['FINANCIAL', 'IMMOVABLE'], {
        required_error: 'Tipo é obrigatório'
    }),
    value: z.number()
        .min(0, 'Valor deve ser positivo')
        .max(999999999.99, 'Valor muito alto'),
    date: z.string()
        .min(1, 'Data é obrigatória')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
    simulationId: z.string()
        .min(1, 'ID da simulação é obrigatório'),
    financing: z.object({
        startDate: z.string()
            .min(1, 'Data de início do financiamento é obrigatória')
            .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
        installments: z.number()
            .min(1, 'Número de parcelas deve ser pelo menos 1')
            .max(1000, 'Número de parcelas muito alto'),
        interestRate: z.number()
            .min(0, 'Taxa de juros deve ser positiva')
            .max(100, 'Taxa de juros deve ser menor que 100%'),
        downPayment: z.number()
            .min(0, 'Valor de entrada deve ser positivo')
    }).optional()
});

// Schema para movimentações
export const movementSchema = z.object({
    type: z.enum(['income', 'expense'], {
        required_error: 'Tipo é obrigatório'
    }),
    title: z.string()
        .min(1, 'Título é obrigatório')
        .max(255, 'Título deve ter no máximo 255 caracteres'),
    description: z.string()
        .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
        .optional(),
    value: z.number()
        .min(0, 'Valor deve ser positivo')
        .max(999999999.99, 'Valor muito alto'),
    frequency: z.enum(['unique', 'monthly', 'yearly'], {
        required_error: 'Frequência é obrigatória'
    }),
    startDate: z.string()
        .min(1, 'Data inicial é obrigatória')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
    endDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
        .optional(),
    simulationId: z.string()
        .min(1, 'ID da simulação é obrigatório')
});

// Schema para seguros
export const insuranceSchema = z.object({
    name: z.string()
        .min(1, 'Nome é obrigatório')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    type: z.enum(['life', 'disability'], {
        required_error: 'Tipo é obrigatório'
    }),
    startDate: z.string()
        .min(1, 'Data de início é obrigatória')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
    durationMonths: z.number()
        .min(1, 'Duração deve ser pelo menos 1 mês')
        .max(1200, 'Duração muito longa'),
    premium: z.number()
        .min(0, 'Prêmio deve ser positivo')
        .max(999999999.99, 'Prêmio muito alto'),
    insuredValue: z.number()
        .min(0, 'Valor segurado deve ser positivo')
        .max(999999999.99, 'Valor segurado muito alto'),
    simulationId: z.string()
        .min(1, 'ID da simulação é obrigatório')
});

// Schema para clientes
export const clientSchema = z.object({
    name: z.string()
        .min(1, 'Nome é obrigatório')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    email: z.string()
        .email('Email inválido')
        .max(255, 'Email deve ter no máximo 255 caracteres'),
    phone: z.string()
        .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido')
        .optional(),
    address: z.string()
        .max(500, 'Endereço deve ter no máximo 500 caracteres')
        .optional()
});

// ============================================================================
// TIPOS INFERIDOS
// ============================================================================

export type SimulationFormData = z.infer<typeof simulationSchema>;
export type AllocationFormData = z.infer<typeof allocationSchema>;
export type MovementFormData = z.infer<typeof movementSchema>;
export type InsuranceFormData = z.infer<typeof insuranceSchema>;
export type ClientFormData = z.infer<typeof clientSchema>;

// ============================================================================
// VALIDAÇÕES CUSTOMIZADAS
// ============================================================================

// Validação de data futura
export const futureDateSchema = z.string()
    .refine((date) => new Date(date) > new Date(), {
        message: 'Data deve ser futura'
    });

// Validação de data passada
export const pastDateSchema = z.string()
    .refine((date) => new Date(date) < new Date(), {
        message: 'Data deve ser passada'
    });

// Validação de CPF
export const cpfSchema = z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .refine((cpf) => {
        const cleanCPF = cpf.replace(/\D/g, '');
        if (cleanCPF.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
        
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
        }
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
        }
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cleanCPF.charAt(10));
    }, {
        message: 'CPF inválido'
    });

// Validação de CNPJ
export const cnpjSchema = z.string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .refine((cnpj) => {
        const cleanCNPJ = cnpj.replace(/\D/g, '');
        if (cleanCNPJ.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
        
        let sum = 0;
        let weight = 2;
        for (let i = 11; i >= 0; i--) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }
        let remainder = sum % 11;
        const firstDigit = remainder < 2 ? 0 : 11 - remainder;
        if (firstDigit !== parseInt(cleanCNPJ.charAt(12))) return false;

        sum = 0;
        weight = 2;
        for (let i = 12; i >= 0; i--) {
            sum += parseInt(cleanCNPJ.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }
        remainder = sum % 11;
        const secondDigit = remainder < 2 ? 0 : 11 - remainder;
        return secondDigit === parseInt(cleanCNPJ.charAt(13));
    }, {
        message: 'CNPJ inválido'
    });

// ============================================================================
// UTILITÁRIOS DE VALIDAÇÃO
// ============================================================================

// Função para validar dados
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
    return schema.parse(data);
};

// Função para validar dados de forma segura
export const safeValidateData = <T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: z.ZodError;
} => {
    try {
        const result = schema.safeParse(data);
        if (result.success) {
            return { success: true, data: result.data };
        } else {
            return { success: false, errors: result.error };
        }
    } catch (error) {
        return { success: false, errors: error as z.ZodError };
    }
};

// Função para obter mensagens de erro
export const getValidationErrors = (error: z.ZodError): Record<string, string> => {
    const errors: Record<string, string> = {};
    error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
    });
    return errors;
};
