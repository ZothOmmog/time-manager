import { createForm } from 'effector-forms/dist';
import { rules } from '../../helpers/form-rules';

export const getCreateEditForm = () => createForm({
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
                    validator: (timeStart, { timeEnd }) => {
                        return new Date(timeStart).getTime() <= new Date(timeEnd).getTime();
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
                    validator: (timeEnd, { timeStart }) => {
                        return new Date(timeStart).getTime() <= new Date(timeEnd).getTime();
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
