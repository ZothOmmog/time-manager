import React, { useState, useEffect, useRef, useMemo } from 'react';
import { VariableSizeList as List } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';
import { ColumnsType, ColumnType, TableProps } from 'antd/lib/table';

const ROW_HEIGHT = 54;

interface IVirtualTableProps<RecordType> extends TableProps<RecordType> {
    cellStyle?: React.CSSProperties,
    tableHeight: number | string
    columns: ColumnsType<RecordType>
}

type IVirtualTable = <RecordType extends object = any>(props: IVirtualTableProps<RecordType>) => JSX.Element;

export const VirtualTable: IVirtualTable = (props) => {
    const { columns } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const [tableHeight, setTableHeight] = useState(0);

    const columnWidthConstantSum = columns.reduce((sum, { width }) => width ? sum + (width as number) : sum, 0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor((tableWidth - columnWidthConstantSum) / widthColumnCount),
        };
    });

    return (
        <ResizeObserver
            onResize={(args) => {
                setTableWidth(args.width);
                setTableHeight(args.height);
            }}
        >
            <Table
                {...props}
                scroll={{ y: tableHeight }}
                style={{ height: props.tableHeight }}
                bordered
                className='virtual-table'
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: (rawData, { scrollbarSize, onScroll }) => (
                        <CustomBody
                            columns={mergedColumns}
                            cellStyle={props.cellStyle}
                            onScroll={onScroll}
                            rawData={rawData}
                            scrollbarSize={scrollbarSize}
                            tableHeight={tableHeight}
                            tableWidth={tableWidth}
                        />
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
    onScroll: any,
    tableHeight: number,
    tableWidth: number,
    cellStyle?: React.CSSProperties
}

function CustomBody<RecordType extends object = any>({
    columns,
    onScroll,
    rawData,
    scrollbarSize,
    tableHeight,
    tableWidth,
    cellStyle
}: ICustomBodyProps<RecordType>) {
    const totalHeight = rawData.length * ROW_HEIGHT;

    const gridRef = useRef<List>(null);

    useEffect(() => {
        gridRef.current?.resetAfterIndex(0, false);
    }, [tableWidth, tableHeight]);

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
            ref={gridRef}
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
                />
            )}
        </List>
    );
}

interface ICustomRowProps<RecordType> {
    record: RecordType,
    recordStyle: React.CSSProperties,
    columns: ColumnsType<RecordType>,
    cellStyle?: React.CSSProperties
}

function CustomRecord<RecordType>({ record, columns, recordStyle, cellStyle }: ICustomRowProps<RecordType>) {
    const recordKeys = Object.getOwnPropertyNames(record).filter(key => key !== 'key');
    
    return (
        <div style={{...recordStyle, display: 'flex'}} key={Object.getOwnPropertyDescriptor(record, 'key')?.value}>
            {recordKeys.map(key => (
                <CustomCell
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