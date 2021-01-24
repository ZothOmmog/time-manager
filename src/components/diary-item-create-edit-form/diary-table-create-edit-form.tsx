import React from 'react';
import { Modal, Input, Button, Typography, Row, Col } from 'antd';
import { useStore } from 'effector-react';
import { $isVisible, $visibleType, createEditForm, visibleChange } from '../../models/diary-item-create-edit-form/diary-item-create-edit-form-model';
import { useField, useForm } from 'effector-forms/dist';
import { InputProps } from 'antd/lib/input';
import { Event } from 'effector';
import DatePicker from '../date-picker';

const { Text } = Typography;
const { TimePicker } = DatePicker;

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
            bodyStyle={{ height: 360 }}
            footer={
                <>
                    <Button onClick={() => visibleChange('')}>Отмена</Button>
                    <Button type='primary' onClick={() => submit()}>{createEditButtonText}</Button>
                </>
            }
        >
            <Row gutter={[16, 16]}>
                <Col span={24}><KeyTaskInput /></Col>
                <Col span={12}>Время начала действия: <StartTimeInput /></Col>
                <Col span={12}>Время конца действия:<EndTimeInput /></Col>
            </Row>
            Описание:
            <DescriptionInput />
        </Modal>
    )
}

function KeyTaskInput() {
    const { value, onChange, hasError, errorText } = useField(createEditForm.fields.keyTask);
    
    return (
        <FormInput
            addonBefore='Номер таска'
            errorText={errorText()}
            hasError={hasError()}
            value={value}
            onChange={onChange}
        />
    )
}

function StartTimeInput() {
    const { value, onChange, hasError, errorText } = useField(createEditForm.fields.startTime);
    
    return (
        <FormInputTimePicker
            format='HH:mm'
            placeholder='ЧЧ:ММ'
            errorText={errorText()}
            hasError={hasError()}
            value={value}
            onChange={onChange}
        />
    );
}

function EndTimeInput() {
    const { value, onChange, hasError, errorText } = useField(createEditForm.fields.endTime);
    
    return (
        <FormInputTimePicker
            format='HH:mm'
            placeholder='ЧЧ:ММ'
            errorText={errorText()}
            hasError={hasError()}
            value={value}
            onChange={onChange}
        />
    );
}

function DescriptionInput() {
    const { value, onChange, hasError, errorText } = useField(createEditForm.fields.description);
    
    return (
        <FormInputTextarea
            autoSize={{
                minRows: 5,
                maxRows: 5
            }}
            showCount
            allowClear
            maxLength={320}
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

interface IFormInputTimePickerProps extends Omit<Omit<React.ComponentProps<typeof TimePicker>, 'onChange'>, 'value'> {
    errorText: string,
    hasError: boolean,
    onChange: Event<string>,
    value: string
}

function FormInputTimePicker(props: IFormInputTimePickerProps) {
    const { errorText, hasError, onChange, value, ...otherProps } = props;
    return (
        <div style={{ height: 54 }} className={hasError ? 'ant-form-item-has-error' : ''}>
            <TimePicker
                {...otherProps}
                value={value ? new Date(value) : null}
                onChange={value => onChange(value ? value.toUTCString() : '')}
            />
            <div>
                <Text type='danger'>
                    {props.errorText}
                </Text>
            </div>
        </div>
    );
}

interface IFormInputTextareaProps extends Omit<React.ComponentProps<typeof Input.TextArea>, 'onChange'> {
    errorText: string,
    hasError: boolean,
    onChange: Event<string>
}

function FormInputTextarea(props: IFormInputTextareaProps) {
    const { onChange, errorText, hasError, ...otherProps } = props;

    let errorStyle: React.CSSProperties;

    if (otherProps.showCount) {
        errorStyle = {
            position: 'relative',
            top: -22
        };
    }
    else errorStyle = {};

    return (
        <div style={{ height: 54 }} className={hasError ? 'ant-form-item-has-error' : ''}>
            <Input.TextArea {...otherProps} onChange={(e) => onChange(e.target.value)} />
            <Text type='danger' style={errorStyle} >
                {props.errorText}
            </Text>
        </div>
    );
}