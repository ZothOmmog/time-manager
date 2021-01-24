import React from 'react';
import { DiaryTable } from '../components/diary-table/diary-table';
import { PageTemplate } from "../components/page-template";

export const Home: React.FC<unknown> = () => {
    return (
        <PageTemplate>
            <DiaryTable />
        </PageTemplate>
    );
}