import { Button } from 'antd';
import React from 'react';
import { DiaryItemCreateForm } from '../components/diary-item-create-form/diary-item-create-form';
import { DiaryTable } from '../components/diary-table/diary-table';
import { PageTemplate } from "../components/page-template";
import { openCreateForm } from '../models/diary-item-create-form/diary-item-create-form-model';

export const Home: React.FC<unknown> = () => {
    return (
        <PageTemplate>
            <>
                <Button style={{ marginBottom: 16 }} type='primary' onClick={() => openCreateForm()}>Добавить запись</Button>
                <DiaryTable />
                <DiaryItemCreateForm />
            </>
        </PageTemplate>
    );
}