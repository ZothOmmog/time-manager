import React from 'react';
import { Modal, Input, Button, Typography } from 'antd';
import { useStore } from 'effector-react';
import { $isVisible, $visibleType, createEditForm, visibleChange } from '../../models/diary-item-create-edit-form/diary-item-create-edit-form-model';
import { useField, useForm } from 'effector-forms/dist';
import { InputProps } from 'antd/lib/input';
import { Event } from 'effector';

const { Text } = Typography;

export const DiaryItemCreateEditForm = () => {
    const isVisible = useStore($isVisible);
    const visibleType = useStore($visibleType);
    const { submit } = useForm(createEditForm);
    
    let modalTitle;
    let createEditButtonText;
    switch(visibleType) {
        case 'create': {
            modalTitle = 'Форма создания записи';
            createEditButtonText = 'Создать';
            break;
        }
        case 'edit': {
            modalTitle = 'Форма редактирования записи';
            createEditButtonText = 'Редактировать';
            break;
        }
        default: {
            modalTitle = '';
            createEditButtonText = '';
            break;
        }
    }

    return (
        <Modal
            visible={isVisible}
            title={modalTitle}
            onCancel={() => visibleChange('')}
            maskClosable={false}
            footer={
                <>
                    <Button onClick={() => visibleChange('')}>Отмена</Button>
                    <Button type='primary' onClick={() => submit()}>{createEditButtonText}</Button>
                </>
            }
        >
            <KeyTaskInput />
        </Modal>
    )
}

function KeyTaskInput(props: InputProps) {
    const { value, onChange, hasError, errorText } = useField(createEditForm.fields.keyTask);
    
    return (
        <FormInput
            {...props}
            addonBefore='Номер таска'
            errorText={errorText()}
            hasError={hasError()}
            value={value}
            onChange={onChange}
        />
    )
}

interface IFormInputProps extends Omit<InputProps, 'onChange'> {
    errorText: string,
    hasError: boolean,
    onChange: Event<string>
}

function FormInput(props: IFormInputProps) {
    const { onChange, errorText, hasError, ...otherProps } = props;
    return (
        <div style={{ height: 54 }} className={hasError ? 'ant-form-item-has-error' : ''}>
            <Input {...otherProps} onChange={(e) => onChange(e.target.value)} />
            <Text type='danger'>
                {props.errorText}
            </Text>
        </div>
    );
}