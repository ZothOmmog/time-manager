import { ColumnsType } from 'antd/lib/table';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { $diaryItemView } from '../models/diary/diary-model';
import { IDiaryItemView } from '../models/diary/diary-types';
import { VirtualTable } from './virtual-table';

export const DiaryTable = () => {
    const diaryItemsView = useStore($diaryItemView);

    const columns = useMemo<ColumnsType<IDiaryItemView>>(() => [
        { title: 'Дата', dataIndex: 'date', width: 100, align: 'right' },
        { title: 'Номер таска', dataIndex: 'keyTask', width: 120, align: 'right' },
        { title: 'Время начала', dataIndex: 'timeStart', width: 150, align: 'right' },
        { title: 'Время конца', dataIndex: 'timeEnd', width: 150, align: 'right' },
        { title: 'Продолжительность', dataIndex: 'duration', width: 180, align: 'right' },
        { title: 'Описание', dataIndex: 'desctiption' }
    ], []);

    return (
        <VirtualTable
            columns={columns}
            dataSource={diaryItemsView}
            tableHeight='calc(100vh - 213px)'
            initialScroll='bottom'
            cellStyle={{ border: '1px solid #f0f0f0', padding: 5 }}
        />
    );
};
