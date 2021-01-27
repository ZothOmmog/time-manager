import { ColumnsType } from 'antd/lib/table';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { $diaryItemView, $scrollTableToBottomNeed, scrollTableToBottom } from '../../models/diary/diary-model';
import { IDiaryItemView } from '../../models/diary/diary-types';
import { VirtualTable } from '../virtual-table';
import styles from './diary-table.module.css';

export const DiaryTable = () => {
    const diaryItemsView = useStore($diaryItemView);
    const scrollTableToBottomNeed = useStore($scrollTableToBottomNeed);

    const columns = useMemo<ColumnsType<IDiaryItemView>>(() => [
        { title: 'Дата', dataIndex: 'date', width: 100, align: 'right', defaultSortOrder: 'ascend', sorter: {
            compare: (a, b) => a.dateTimestamp - b.dateTimestamp
        } },
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
            tableHeight='calc(100vh - 267px)'
            initialScroll='bottom'
            rowClassName={styles['row']}
            cellStyle={{ border: '1px solid #f0f0f0', padding: 5 }}
            scrollToItemReceiver={(scrollToItem) => {
                if (!scrollTableToBottomNeed) return;

                scrollToItem(diaryItemsView.length - 1);
                scrollTableToBottom();
            }}
            onRow={record => {
                console.log(record);
            }}
        />
    );
};
