import { Theme } from '@material-ui/core/styles';
import React from 'react';

export interface ITableData {
  id: string,
  label: string,
  inputType: string, 
  width?: number,
  key?: string,
  dataHandler?,
  inputValueHandler?,
  inputHandler?,
  variants?,
}

type RowStyle = (row: {[key: string]: any}, theme: Theme) => {[key: string]: string | number}
type RowClick = (row: {[key: string]: any}) => void
type RowExpand = (tableData, row, open, actions) => React.ReactNode
type IsRowExpendable = (row: {[key: string]: any}) => boolean
type HandleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> , inputHandler: (row: {[key: string]: any}) => React.ReactNode) => void
type HandleDateRangeChange = (dateRange: { date_from: Date | "", date_to: Date | "" }, fieldName: string) => void
type HandleSelectChange = (event: React.ChangeEvent<{value: unknown}>) => void

export interface IDatagridProps {
  tableData: ITableData[], 
  resource: string,
  create?: boolean, 
  edit?: boolean,
  bulkActions?: boolean,
  defaultFilterValues?: {[key: string]: any}, 
  title?: string,
  toolbarActions?: React.ReactNode 
  rowClick?: RowClick, 
  rowStyle?: RowStyle, 
  rowExpand?: RowExpand, 
  isRowExpandable?: IsRowExpendable,
  children?: React.ReactNode,
  style?: {[key: string]: string | number}, 
}

export interface IEnhancedTable {
    rows: {[key: string]: any}[],
    toolbarActions?: React.ReactNode,
    selected: any[],
    create?: boolean,
    setSelected: (selected: any[]) => void,
    order?: "asc" | "desc",
    edit?: boolean,
    setOrder: (orderBy: string, order: string) => void,
    orderBy: string,
    count: number,
    page: number,
    setPage: (pageNumber: number) => void,
    rowsPerPage: number,
    setRowsPerPage: (rowsPerPage: number) => void,
    tableData: ITableData[],
    handleInputChange: HandleInputChange,
    handleDateRangeChange: HandleDateRangeChange,
    handleSelectChange: HandleSelectChange,
    clearInput: (name: string) => void,
    clearInputValues: () => void,
    inputValues: {[key: string]: any},
    resourse: string,
    resource_api_name: string,  
    basePath?: string, 
    bulkActions?: boolean,
    title?: string, 
    customActions?: React.ReactNode,
    rowStyle?: RowStyle,
    rowClick?: RowClick,
    style?: {[key: string]: string | number},
    rowExpand?: RowExpand,
    isRowExpandable?: IsRowExpendable,
  }

  export interface IEnhancedTableHead {
    classes?: any, 
    onSelectAllClick: (e: React.FormEvent<HTMLInputElement>) => void, 
    columns: string[],
    order?: "asc" | "desc",
    count: number,
    orderBy: string,
    resourse: string,
    numSelected: number, 
    rowCount: number, 
    onRequestSort: (event: any, property: string) => void, 
    tableData: ITableData[],
    handleInputChange: HandleInputChange, 
    handleSelectChange: HandleSelectChange,
    clearInput: (name: string) => void,
    bulkActions?: boolean,
    inputValues: {[key: string]: any},
    setDateRangePicker,
    customActionsArray?: "customAction"[],
    setDateRangePickerPosition,
    rowExpand?: RowExpand,
    columnsWidth: any[],
    setColumnsWidth,
    dataLength: number, 
}


export interface IEnhancedTableData {
    rows: {[key: string]: any}[],
    tableData: ITableData[],
    columns: string[],
    basePath?: string,
    resourse: string,
    bulkActions?: boolean,
    customActions?: React.ReactNode,
    rowStyle?: RowStyle,
    rowClick?: RowClick,
    rowExpand?: RowExpand,
    open: {[key: string]: boolean},
    setOpen,
    edit?: boolean,
    isSelected: (name: string) => boolean,
    handleClick: (event: React.MouseEvent<HTMLElement>, name: string) => void,
    classes?: any,
    columnsWidth: any[],
    customActionsArray: "customAction"[],
    isRowExpandable?: IsRowExpendable,
    selectedRows: boolean
}

export interface IEnhancedTableActions {
  resourse: string,
  row: {[key: string]: any},
  classes?: any,
  customActions?: any
}


  