import { Parameters, UpdateParameters } from './applicationData'

export interface TabbedDataGridState {
    [key: string]: TabbedDataGridObject
}

export interface Resource {
    data: any[],
    parameters: Parameters,
    selected: string[] | number[],
    total: number,
    loading: boolean
    basePath?: string
}

type TabbedDataGridObject = {
    [key: string]: Resource
}

export enum TabbedDataGridActionTypes {
    FETCH_DATA = 'FETCH_DATA/TABBED_DATAGRID',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS/TABBED_DATAGRID',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR/TABBED_DATAGRID',
    FETCH_TABLE_DATA = 'FETCH_TABLE_DATA/TABBED_DATAGRID',
    FETCH_TABLE_DATA_SUCCESS = 'FETCH_TABLE_DATA_SUCCESS/TABBED_DATAGRID',
    FETCH_TABLE_DATA_ERROR = 'FETCH_TABLE_DATA_ERROR/TABBED_DATAGRID',
    SET_SELECTED_RECORDS = 'SET_SELECTED_RECORDS/TABBED_DATAGRID',
    RESET_TABBED_DATAGRID = 'RESET_TABBED_DATAGRID'
}

interface FetchTabbedDataGridAction {
    type: TabbedDataGridActionTypes.FETCH_DATA;
    payload?: UpdateParameters,
    tabbedTableName: string,
    table1_name: string,
    table2_name: string,
}

interface FetchTabbedDataGridSuccessAction {
    type: TabbedDataGridActionTypes.FETCH_DATA_SUCCESS;
    payload: { data_table1: any[], total_table1: number, data_table2: any[], total_table2: number },
    tabbedTableName: string,
    table1_name: string,
    table2_name: string,
}

interface FetchTabbedDataGridErrorAction {
    type: TabbedDataGridActionTypes.FETCH_DATA_ERROR;
    payload: { },
    tabbedTableName: string,
    table1_name: string,
    table2_name: string,
}

interface FetchTabbedDataGridTable {
    type: TabbedDataGridActionTypes.FETCH_TABLE_DATA
    payload?: UpdateParameters,
    tabbedTableName: string,
    tableName: string,
}

interface FetchTabbedDataGridTableSuccess {
    type: TabbedDataGridActionTypes.FETCH_TABLE_DATA_SUCCESS;
    payload: { data: any[], total: number },
    tabbedTableName: string,
    tableName: string,
}

interface FetchTabbedDataGridTableError {
    type: TabbedDataGridActionTypes.FETCH_TABLE_DATA_ERROR;
    payload: [],
    tabbedTableName: string,
    tableName: string,
}

interface SetTabbedDataGridSelectedRecords {
    type: TabbedDataGridActionTypes.SET_SELECTED_RECORDS,
    payload: string[],
    tabbedTableName: string,
    tableName: string,
}

interface ResetTabbedDatagrid {
    type: TabbedDataGridActionTypes.RESET_TABBED_DATAGRID
    tabbedTableName: string,
    table1_name: string,
    table2_name: string,
}

export type TabbedDataGridAction = FetchTabbedDataGridAction 
                                        | FetchTabbedDataGridSuccessAction 
                                        | FetchTabbedDataGridErrorAction 
                                        | FetchTabbedDataGridTable 
                                        | FetchTabbedDataGridTableSuccess
                                        | FetchTabbedDataGridTableError
                                        | SetTabbedDataGridSelectedRecords
                                        | ResetTabbedDatagrid