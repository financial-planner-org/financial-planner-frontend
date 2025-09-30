'use client';

import { BaseForm } from '@/components/common/base-form';
import { insuranceSchema, FORM_FIELD_CONFIGS, InsuranceFormData } from '@/lib/validations/schemas';

interface InsuranceFormProps {
    onSubmit: (data: InsuranceFormData) => void;
    defaultValues?: Partial<InsuranceFormData>;
}

export function InsuranceForm({ onSubmit, defaultValues }: InsuranceFormProps) {
    return (
        <BaseForm
            schema={insuranceSchema}
            fields={FORM_FIELD_CONFIGS.insurance}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            title="Novo Seguro"
            triggerText="Adicionar Seguro"
        />
    );
}