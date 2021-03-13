import React from 'react';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import { DiaryItemCreateEditForm } from '../diary-item-create-edit-form/diary-table-create-edit-form';
import {
    $isOpenCreateForm,
    closeCreateForm,
    createForm,
} from '../../models/diary-item-create-form/diary-item-create-form-model';

export const DiaryItemCreateForm = () => {
    const { fields, submit } = useForm(createForm);
    const isOpen = useStore($isOpenCreateForm);

    return (
        <DiaryItemCreateEditForm
            isVisible={isOpen}
            visibleType='create'
            fieldsData={{
                keyTask: {
                    value: fields.keyTask.value,
                    onChange: fields.keyTask.onChange,
                    errorText: fields.keyTask.errorText(),
                    hasError: fields.keyTask.hasError(),
                },
                description: {
                    value: fields.description.value,
                    onChange: fields.description.onChange,
                    errorText: fields.description.errorText(),
                    hasError: fields.description.hasError(),
                },
                timeStart: {
                    value: fields.timeStart.value,
                    onChange: fields.timeStart.onChange,
                    errorText: fields.timeStart.errorText(),
                    hasError: fields.timeStart.hasError(),
                },
                timeEnd: {
                    value: fields.timeEnd.value,
                    onChange: fields.timeEnd.onChange,
                    errorText: fields.timeEnd.errorText(),
                    hasError: fields.timeEnd.hasError(),
                },
            }}
            onClose={closeCreateForm}
            submit={submit}
        />
    );
};
