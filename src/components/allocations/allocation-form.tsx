'use client';

import { BaseForm } from '@/components/common/base-form';
import { allocationSchema, FORM_FIELD_CONFIGS, AllocationFormData } from '@/lib/validations/schemas';

interface AllocationFormProps {
    onSubmit: (data: AllocationFormData) => void;
    defaultValues?: Partial<AllocationFormData>;
}

export function AllocationForm({ onSubmit, defaultValues }: AllocationFormProps) {
    return (
        <BaseForm
            schema={allocationSchema}
            fields={FORM_FIELD_CONFIGS.allocation}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            title="Nova Alocação"
            triggerText="Adicionar Alocação"
        />
    );
}