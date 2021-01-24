import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { rules } from '../../helpers/form-rules';

export const createEditForm = createForm({
    validateOn: ['submit', 'blur', 'change'],
    fields: {
        keyTask: {
            init: '',
            rules: [
                rules.required(),
                rules.number()
            ]
        }
    }
});

export const visibleChange = createEvent<'create' | 'edit' | ''>();

export const $visibleType = createStore<'create' | 'edit' | ''>('');
export const $isVisible = $visibleType.map(state => Boolean(state));