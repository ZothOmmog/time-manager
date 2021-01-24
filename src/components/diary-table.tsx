import { ColumnsType } from 'antd/lib/table';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { $diaryItemView } from '../models/diary/diary-model';
import { IDiaryItemView } from '../models/diary/diary-types';
import { VirtualTable } from './virtual-table';

export const DiaryTable = () => {
    const diaryItemsView = useStore($diaryItemView);

    const columns = useMemo<ColumnsType<IDiaryItemView>>(() => [
        { title: 'Дата', dataIndex: 'date', width: 100 },
        { title: 'Номер таска', dataIndex: 'keyTask', width: 120 },
        { title: 'Время начала', dataIndex: 'timeStart', width: 150 },
        { title: 'Время конца', dataIndex: 'timeEnd', width: 150 },
        { title: 'Продолжительность', dataIndex: 'duration', width: 180 },
        { title: 'Описание', dataIndex: 'desctiption' }
    ], []);

    return (
        <VirtualTable
            columns={columns}
            dataSource={diaryItemsView}
            scroll={{ y: 600 }}
            tableHeight='calc(100vh - 213px)'
            cellStyle={{ border: '1px solid #f0f0f0' }}
        />
    );
};
