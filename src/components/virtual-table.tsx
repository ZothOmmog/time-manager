import React, { useState, useEffect, useRef } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';

interface IVirtualTableProps<RecordType> extends TableProps<RecordType> {
    cellStyle?: React.CSSProperties,
    tableHeight: number | string
    columns: ColumnsType<RecordType>
}

type IVirtualTable = <RecordType extends object = any>(props: IVirtualTableProps<RecordType>) => JSX.Element;

export const VirtualTable: IVirtualTable = (props) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const [tableHeight, setTableHeight] = useState(0);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: false,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
        ref.current = connectObject;
        const totalHeight = rawData.length * 100;
        console.log(rawData)
        return (
            <Grid
                ref={gridRef}
                className='virtual-grid'
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll!.y! && index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                rowCount={rawData.length}
                rowHeight={() => 100}
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
                }) => (
                    <div
                        style={{
                            ...style,
                            ...props.cellStyle
                        }}
                    >
                        {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={(args) => {
                setTableWidth(args.width);
                setTableHeight(args.height);
                console.log(args);
            }}
        >
            <Table
                {...props}
                style={{ height: props.tableHeight }}
                bordered
                className='virtual-table'
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: renderVirtualList,
                }}
            />
        </ResizeObserver>
    );
}
