'use client';

import { BaseForm } from '@/components/common/base-form';
import { movementSchema, FORM_FIELD_CONFIGS, MovementFormData } from '@/lib/validations/schemas';

interface MovementFormProps {
    onSubmit: (data: MovementFormData) => void;
    defaultValues?: Partial<MovementFormData>;
}

export function MovementForm({ onSubmit, defaultValues }: MovementFormProps) {
    return (
        <BaseForm
            schema={movementSchema}
            fields={FORM_FIELD_CONFIGS.movement}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            title="Nova Movimentação"
            triggerText="Adicionar Movimentação"
        />
    );
}