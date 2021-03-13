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
        },
        timeStart: {
            init: '0',
            rules: [
                rules.required(),
                {
                    name: 'timePairStart',
                    validator: (startTime, { endTime }) => {
                        return new Date(startTime).getTime() <= new Date(endTime).getTime();
                    },
                    errorText: 'Время начала не может быть больше времени конца'
                }
            ]
        },
        timeEnd: {
            init: '0',
            rules: [
                rules.required(),
                {
                    name: 'timePairEnd',
                    validator: (endTime, { startTime }) => {
                        return new Date(startTime).getTime() <= new Date(endTime).getTime();
                    },
                    errorText: 'Время конца не может быть меньше времени начала'
                }
            ]
        },
        description: {
            init: '',
            rules: [
                rules.required()
            ]
        }
    }
});

export const visibleChange = createEvent<'create' | 'edit' | ''>();
export const hide = createEvent();

export const $visibleType = createStore<'create' | 'edit' | ''>('');
export const $isVisible = $visibleType.map(state => Boolean(state));