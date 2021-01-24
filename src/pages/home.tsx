import { Button } from 'antd';
import React from 'react';
import { DiaryItemCreateEditForm } from '../components/diary-item-create-edit-form/diary-table-create-edit-form';
import { DiaryTable } from '../components/diary-table/diary-table';
import { PageTemplate } from "../components/page-template";
import { visibleChange } from '../models/diary-item-create-edit-form/diary-item-create-edit-form-model';

export const Home: React.FC<unknown> = () => {
    return (
        <PageTemplate>
            <>
                <Button style={{ marginBottom: 16 }} type='primary' onClick={() => visibleChange('create')}>Добавить запись</Button>
                <DiaryTable />
                <DiaryItemCreateEditForm />
            </>
        </PageTemplate>
    );
}