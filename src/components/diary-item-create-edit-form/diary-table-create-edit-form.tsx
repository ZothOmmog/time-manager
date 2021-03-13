import React from 'react';
import { Modal, Input, Button, Typography, Row, Col } from 'antd';
import { visibleChange } from '../../models/diary-item-create-edit-form/diary-item-create-edit-form-model';
import { InputProps } from 'antd/lib/input';
import DatePicker from '../date-picker';
import { IDiaryItemNew } from '../../models/diary/diary-types';

const { Text } = Typography;
const { TimePicker } = DatePicker;

type DiaryItemCreateEditFormProps = {
    isVisible: boolean;
    visibleType: 'create' | 'edit' | '';
    fieldsData: {
        [K in keyof IDiaryItemNew]: {
            value: string;
            onChange: (value: string) => void;
            hasError: () => boolean;
            errorText: () => string;
        };
    };
    submit: () => void;
    onClose: () => void;
};

export const DiaryItemCreateEditForm = (props: DiaryItemCreateEditFormProps) => {
    let modalTitle;
    let createEditButtonText;
    switch(props.visibleType) {
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
            visible={props.isVisible}
            title={modalTitle}
            onCancel={props.onClose}
            maskClosable={false}
            bodyStyle={{ height: 360 }}
            footer={
                <>
                    <Button onClick={() => visibleChange('')}>Отмена</Button>
                    <Button type='primary' onClick={props.submit}>
                        {createEditButtonText}
                    </Button>
                </>
            }
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <FormInput {...props.fieldsData.keyTask} addonBefore='Номер таска' />
                </Col>
                <Col span={12}>
                    Время начала действия: <FormInputTimePicker {...props.fieldsData.timeStart} />
                </Col>
                <Col span={12}>
                    Время конца действия: <FormInputTimePicker {...props.fieldsData.timeEnd} />
                </Col>
            </Row>
            Описание:
            <FormInputTextarea
                autoSize={{
                    minRows: 5,
                    maxRows: 5,
                }}
                showCount
                allowClear
                maxLength={320}
                {...props.fieldsData.description}
            />
        </Modal>
    );
}

// type KeyTaskInput

// function KeyTaskInput() {
//     const { value, onChange, hasError, errorText } = useField(createEditForm.fields.keyTask);
    
//     return (
//         <FormInput
//             addonBefore='Номер таска'
//             errorText={errorText()}
//             hasError={hasError()}
//             value={value}
//             onChange={onChange}
//         />
//     )
// }

// function StartTimeInput() {
//     const { value, onChange, hasError, errorText } = useField(createEditForm.fields.startTime);
    
//     return (
//         <FormInputTimePicker
//             format='HH:mm'
//             placeholder='ЧЧ:ММ'
//             errorText={errorText()}
//             hasError={hasError()}
//             value={value}
//             onChange={onChange}
//         />
//     );
// }

// function EndTimeInput() {
//     const { value, onChange, hasError, errorText } = useField(createEditForm.fields.endTime);
    
//     return (
//         <FormInputTimePicker
//             format='HH:mm'
//             placeholder='ЧЧ:ММ'
//             errorText={errorText()}
//             hasError={hasError()}
//             value={value}
//             onChange={onChange}
//         />
//     );
// }

// function DescriptionInput() {
//     const { value, onChange, hasError, errorText } = useField(createEditForm.fields.description);
    
//     return (
//         <FormInputTextarea
//             autoSize={{
//                 minRows: 5,
//                 maxRows: 5
//             }}
//             showCount
//             allowClear
//             maxLength={320}
//             errorText={errorText()}
//             hasError={hasError()}
//             value={value}
//             onChange={onChange}
//         />
//     )
// }

interface IFormInputProps extends Omit<InputProps, 'onChange'> {
    errorText: () => string;
    hasError: () => boolean;
    onChange: (value: string) => void;
}

function FormInput(props: IFormInputProps) {
    const { onChange, errorText, hasError, ...otherProps } = props;
    return (
        <div style={{ height: 54 }} className={hasError() ? 'ant-form-item-has-error' : ''}>
            <Input {...otherProps} onChange={(e) => onChange(e.target.value)} />
            <Text type='danger'>
                {props.errorText()}
            </Text>
        </div>
    );
}

interface IFormInputTimePickerProps extends Omit<Omit<React.ComponentProps<typeof TimePicker>, 'onChange'>, 'value'> {
    errorText: () => string,
    hasError: () => boolean,
    onChange: (value: string) => void,
    value: string
}

function FormInputTimePicker(props: IFormInputTimePickerProps) {
    const { errorText, hasError, onChange, value, ...otherProps } = props;
    return (
        <div style={{ height: 54 }} className={hasError() ? 'ant-form-item-has-error' : ''}>
            <TimePicker
                {...otherProps}
                value={value ? new Date(value) : null}
                onChange={value => onChange(value ? value.toUTCString() : '')}
            />
            <div>
                <Text type='danger'>
                    {props.errorText()}
                </Text>
            </div>
        </div>
    );
}

interface IFormInputTextareaProps extends Omit<React.ComponentProps<typeof Input.TextArea>, 'onChange'> {
    errorText: () => string,
    hasError: () => boolean,
    onChange: (value: string) => void;
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
        <div style={{ height: 54 }} className={hasError() ? 'ant-form-item-has-error' : ''}>
            <Input.TextArea {...otherProps} onChange={(e) => onChange(e.target.value)} />
            <Text type='danger' style={errorStyle} >
                {props.errorText()}
            </Text>
        </div>
    );
}