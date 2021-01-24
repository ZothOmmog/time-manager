import { Rule } from "effector-forms/dist";

export const rules = {
    required: (): Rule<string> => ({
        name: "required",
        validator: (value) => Boolean(value),
        errorText: 'Обязательно для заполнения'
    }),
    number: (): Rule<string> => ({
        name: "number",
        validator: (value) => /^[0-9]+$/.test(value),
        errorText: 'Должно быть числом'
    }),
}