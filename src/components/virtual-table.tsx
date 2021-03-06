import React, { useState, useEffect, useRef, useMemo } from 'react';
import { VariableSizeList as List } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';
import { ColumnsType, ColumnType, TableProps } from 'antd/lib/table';

const ROW_HEIGHT = 54;

type ScrollType = 'top' | 'bottom';

interface IVirtualTableProps<RecordType> extends Omit<TableProps<RecordType>, 'onRow'> {
    cellStyle?: React.CSSProperties,
    rowClassName?: string,
    tableHeight: number | string,
    columns: ColumnsType<RecordType>,
    initialScroll?: ScrollType,
    scrollToItemReceiver?: (scrollToItem: List['scrollToItem']) => void,
    onRow?: (record: RecordType) => void
}

type IVirtualTable = <RecordType extends object = any>(props: IVirtualTableProps<RecordType>) => JSX.Element;

export const VirtualTable: IVirtualTable = (props) => {
    const { columns, initialScroll = 'top', cellStyle, tableHeight, style, rowClassName, scrollToItemReceiver, onRow, ...otherProps } = props;
    const [tableWidthAbs, setTableWidthAbs] = useState(0);
    const [tableHeightAbs, setTableHeightAbs] = useState(0);

    const columnWidthConstantSum = columns.reduce((sum, { width }) => width ? sum + (width as number) : sum, 0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor((tableWidthAbs - columnWidthConstantSum) / widthColumnCount),
        };
    });

    return (
        <ResizeObserver
            onResize={(args) => {
                setTableWidthAbs(args.width);
                setTableHeightAbs(args.height);
            }}
        >
            <Table
                {...otherProps}
                style={{ ...style, height: tableHeight }}
                scroll={{ y: tableHeightAbs }}
                bordered
                className='virtual-table'
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: (rawData, { scrollbarSize }) => (
                        tableHeightAbs > 0 ? (
                            <CustomBody
                                scrollToItemReceiver={scrollToItemReceiver}
                                columns={mergedColumns}
                                cellStyle={props.cellStyle}
                                rawData={rawData}
                                rowClassName={rowClassName}
                                scrollbarSize={scrollbarSize}
                                tableHeight={tableHeightAbs}
                                tableWidth={tableWidthAbs}
                                initialScroll={initialScroll}
                                onRow={onRow}
                            />
                        ) : null
                    )
                }}
            />
        </ResizeObserver>
    );
}

interface ICustomBodyProps<RecordType> {
    columns: ColumnsType<RecordType>,
    rawData: RecordType[],
    scrollbarSize: number,
    tableHeight: number,
    tableWidth: number,
    cellStyle?: React.CSSProperties,
    rowClassName?: string,
    scrollToItemReceiver?: (scrollToItem: List['scrollToItem']) => void,
    initialScroll: ScrollType,
    onRow?: (record: RecordType) => void
}

function CustomBody<RecordType extends object = any>({
    columns,
    rawData,
    scrollbarSize,
    tableHeight,
    tableWidth,
    cellStyle,
    initialScroll,
    rowClassName,
    scrollToItemReceiver,
    onRow
}: ICustomBodyProps<RecordType>) {
    const totalHeight = rawData.length * ROW_HEIGHT;
    const [isInitScroll, setIsInitScroll] = useState(false);

    const ListRef = useRef<List>(null);

    useEffect(() => {
        ListRef.current?.resetAfterIndex(0, false);
    }, [tableWidth, tableHeight]);
    
    useEffect(() => {
        if (!isInitScroll && rawData.length > 0 ) {
            if (initialScroll === 'bottom') {
                ListRef.current?.scrollToItem(rawData.length - 1);
            }
            setIsInitScroll(true);
        };
    }, [rawData.length, isInitScroll, initialScroll]);

    useEffect(() => {
        if (scrollToItemReceiver && ListRef.current) {
            scrollToItemReceiver(ListRef.current.scrollToItem.bind(ListRef.current));
        }
    }, [scrollToItemReceiver]);

    const columnNormalizeWidth = useMemo<ColumnsType<RecordType>>(() => {
        return columns.map((column, index, columns) => {
                const { width } = column;

                return totalHeight > tableHeight && index === columns.length - 1
                    ? { ...column, width: (width as number) - scrollbarSize}
                    : column;
            })
    }, [totalHeight, columns, scrollbarSize, tableHeight]);

    return (
        <List
            style={{ display: isInitScroll ? 'block' : 'none' }}
            ref={ListRef}
            itemCount={rawData.length}
            itemSize={() => ROW_HEIGHT}
            width={tableWidth}
            height={tableHeight}
        >
            {({ index, style }) => (
                <CustomRecord
                    record={rawData[index]}
                    recordStyle={style}
                    cellStyle={cellStyle}
                    columns={columnNormalizeWidth}
                    recordClassName={rowClassName}
                    onClick={onRow}
                />
            )}
        </List>
    );
}

interface ICustomRowProps<RecordType> {
    record: RecordType,
    recordStyle: React.CSSProperties,
    columns: ColumnsType<RecordType>,
    cellStyle?: React.CSSProperties,
    recordClassName?: string,
    onClick?: (record: RecordType) => void
}

function CustomRecord<RecordType>({ record, columns, recordStyle, cellStyle, recordClassName, onClick }: ICustomRowProps<RecordType>) {
    const recordKeys = (columns as ColumnType<RecordType>[]).map(column => column.dataIndex as string);
    
    return (
        <div
            className={recordClassName}
            style={{...recordStyle, display: 'flex'}}
            key={Object.getOwnPropertyDescriptor(record, 'key')?.value}
            onClick={() => {
                if (onClick) onClick(record);
            }}
        >
            {recordKeys.map(key => (
                <CustomCell
                    key={key}
                    cellData={Object.getOwnPropertyDescriptor(record, key)?.value as React.ReactNode}
                    cellStyle={cellStyle}
                    columnInfo={(columns as ColumnType<RecordType>[]).find(column => column.dataIndex === key)!}
                />
            ))}
        </div>
    );
}

interface ICustomCellProps<RecordType> {
    cellData: React.ReactNode,
    cellStyle?: React.CSSProperties,
    columnInfo: ColumnType<RecordType>
}

function CustomCell<RecordType>({
    cellData,
    cellStyle,
    columnInfo,
}: ICustomCellProps<RecordType>) {
    return (
        <div
            style={{
                ...cellStyle,
                textAlign: columnInfo.align,
                width: columnInfo.width
            }}
        >
            {cellData}
        </div>
    );
};