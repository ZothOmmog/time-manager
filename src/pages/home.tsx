import React from 'react';
import { DiaryItemCreateForm } from '../components/diary-item-create-form/diary-item-create-form';
import { DiaryTable } from '../components/diary-table/diary-table';
import { PageTemplate } from '../components/page-template';
import { SiderTm } from '../components/sider';

export const Home: React.FC<unknown> = () => {
    return (
        <PageTemplate>
            <SiderTm />
            <>
                <DiaryTable />
                <DiaryItemCreateForm />
            </>
        </PageTemplate>
    );
};
