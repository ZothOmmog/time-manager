import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid, VariableSizeGrid } from 'react-window';
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

    const gridRef = useRef<VariableSizeGrid>(null);

    useEffect(() => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            rowIndex: 0,
            shouldForceUpdate: false
        });
    }, [tableWidth, tableHeight]);

    return (
        <Grid
            ref={gridRef}
            className='virtual-grid'
            columnCount={columns.length}
            columnWidth={(index: number) => {
                const { width } = columns[index];
                return totalHeight > tableHeight && index === columns.length - 1
                    ? (width as number) - scrollbarSize
                    : (width as number);
            }}
            rowCount={rawData.length}
            rowHeight={() => ROW_HEIGHT}
            width={tableWidth}
            height={tableHeight}
            onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                onScroll({ scrollLeft });
            }}
        >
            {({
                columnIndex,
                rowIndex,
                style,
            }: {
                columnIndex: number;
                rowIndex: number;
                style: React.CSSProperties;
            }) => {
                const row = rawData[rowIndex];

                const columnInfo = columns[columnIndex] as ColumnType<RecordType>;
                const cellName = columnInfo.dataIndex as string;

                const cellData = Object.getOwnPropertyDescriptor(row, cellName)?.value;
                
                if (!cellData) {
                    throw Error(`Не удалось найти свойство ${cellName} в строке с индексом ${rowIndex} при отрисовке компонента VirtualTable`);
                }

                return (
                    <div
                        style={{
                            ...style,
                            ...cellStyle,
                            textAlign: columnInfo.align
                        }}
                    >
                        {cellData}
                    </div>
                );
            }}
        </Grid>
    );
}