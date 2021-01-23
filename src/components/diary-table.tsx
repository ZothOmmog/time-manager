import { ColumnsType } from 'antd/lib/table';
import { addHours, differenceInMinutes, format } from 'date-fns';
import React from 'react';
import { IDiaryItem } from '../models/diary/diary-types';
import { VirtualTable } from './virtual-table';

export const DiaryTable = () => {
    const columns: ColumnsType<IDiaryItem> = [
        { title: 'Дата', render: (_, record) =>  format(new Date(record.timeStart), 'dd.MM.yyyy')},
        { title: 'Номер таска', dataIndex: 'keyTask' },
        { title: 'Время начала', dataIndex: 'timeStart', render: time => format(new Date(time), 'HH:mm:ss') },
        { title: 'Время конца', dataIndex: 'timeEnd', render: time => format(new Date(time), 'HH:mm:ss') },
        { title: 'Продолжительность', render: (_, record) => differenceInMinutes(new Date(record.timeEnd), new Date(record.timeStart)) },
        { title: 'Описание', dataIndex: 'desctiption' },
    ];

    const data: IDiaryItem[] = [
        {
            key: 0,
            desctiption: 'Что-то делал',
            keyTask: 228,
            timeStart: addHours(new Date(), -5).toUTCString(),
            timeEnd: addHours(new Date(), -4).toUTCString()
        },
        {
            key: 1,
            desctiption: 'Что-то делал и что-то получилось',
            keyTask: 228,
            timeStart: addHours(new Date(), -4).toUTCString(),
            timeEnd: addHours(new Date(), -2).toUTCString()
        },
        {
            key: 2,
            desctiption: 'Что-то начал делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -2).toUTCString(),
            timeEnd: addHours(new Date(), -1).toUTCString()
        },
        {
            key: 3,
            desctiption: 'Что-то продолжил делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -1).toUTCString(),
            timeEnd: new Date().toUTCString()
        },
        {
            key: 4,
            desctiption: 'Что-то делал',
            keyTask: 228,
            timeStart: addHours(new Date(), -5).toUTCString(),
            timeEnd: addHours(new Date(), -4).toUTCString()
        },
        {
            key: 5,
            desctiption: 'Что-то делал и что-то получилось',
            keyTask: 228,
            timeStart: addHours(new Date(), -4).toUTCString(),
            timeEnd: addHours(new Date(), -2).toUTCString()
        },
        {
            key: 6,
            desctiption: 'Что-то начал делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -2).toUTCString(),
            timeEnd: addHours(new Date(), -1).toUTCString()
        },
        {
            key: 7,
            desctiption: 'Что-то продолжил делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -1).toUTCString(),
            timeEnd: new Date().toUTCString()
        },
        {
            key: 8,
            desctiption: 'Что-то делал',
            keyTask: 228,
            timeStart: addHours(new Date(), -5).toUTCString(),
            timeEnd: addHours(new Date(), -4).toUTCString()
        },
        {
            key: 9,
            desctiption: 'Что-то делал и что-то получилось',
            keyTask: 228,
            timeStart: addHours(new Date(), -4).toUTCString(),
            timeEnd: addHours(new Date(), -2).toUTCString()
        },
        {
            key: 10,
            desctiption: 'Что-то начал делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -2).toUTCString(),
            timeEnd: addHours(new Date(), -1).toUTCString()
        },
        {
            key: 11,
            desctiption: 'Что-то продолжил делать',
            keyTask: 1488,
            timeStart: addHours(new Date(), -1).toUTCString(),
            timeEnd: new Date().toUTCString()
        },
    ];

    return (
        <VirtualTable
            columns={columns}
            dataSource={data}
            scroll={{ y: 600 }}
            tableHeight='calc(100vh - 213px)'
            cellStyle={{ border: '1px solid #f0f0f0' }}
        />
    );
};
