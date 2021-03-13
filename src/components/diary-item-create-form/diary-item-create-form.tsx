import React from 'react';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import {
    $visibleType,
    createEditForm,
    visibleChange,
} from '../../models/diary-item-create-edit-form/diary-item-create-edit-form-model';
import { DiaryItemCreateEditForm } from '../diary-item-create-edit-form/diary-table-create-edit-form';

export const DiaryItemCreateForm = () => {
    const { fields, submit } = useForm(createEditForm);
    const visibleType = useStore($visibleType);

    return (
        <DiaryItemCreateEditForm
            isVisible={visibleType === 'create'}
            visibleType={visibleType}
            fieldsData={fields}
            onClose={() => visibleChange('')}
            submit={submit}
        />
    );
};
