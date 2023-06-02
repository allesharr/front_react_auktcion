export interface Data {
    [id: number]: { } | undefined;
}

export interface Parameters {
    page: number,
    perPage: number,
    orderBy: string,
    order: "asc" | "desc",
    filterValues: {[key: string]: any }
}

export interface UpdateParameters {
    page?: number,
    perPage?: number,
    orderBy?: string,
    order?: "asc" | "desc",
    filterValues?: {[key: string]: any }
}

export interface Resource {
    data: any[],
    parameters: Parameters,
    selected: string[] | number[],
    total: number,
    loading: boolean
    resource_api_name: string,
    basePath?: string
}

export interface ApplicationDataState {
    [key: string]: Resource
}

export enum ApplicationDataActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR',
    SET_TAB = 'SET_TAB',
    RESET_TABLE_STATE = 'RESET_TABLE_STATE',
    SET_SELECTED_RECORDS = 'SET_SELECTED_RECORDS',
    UPDATE_TABLE_PARAMETERS = 'UPDATE_TABLE_PARAMETERS'
}

interface FetchApplicationDataAction {
    type: ApplicationDataActionTypes.FETCH_DATA;
    payload?: UpdateParameters,
    resource: string
}

interface FetchApplicationDataSuccessAction {
    type: ApplicationDataActionTypes.FETCH_DATA_SUCCESS;
    payload: { data: any[], total: number },
    resource: string
}

interface FetchApplicationDataErrorAction {
    type: ApplicationDataActionTypes.FETCH_DATA_ERROR;
    payload: { },
    resource: string
}

interface SetTab {
    type: ApplicationDataActionTypes.SET_TAB;
    payload: string | number,
    resource: string
}

interface ResetTableState {
    type: ApplicationDataActionTypes.RESET_TABLE_STATE;
    resource: string
}

interface SetSelectedRecords {
    type: ApplicationDataActionTypes.SET_SELECTED_RECORDS,
    payload: string[],
    resource: string,
}

interface UpdateTableParameters {
    type: ApplicationDataActionTypes.UPDATE_TABLE_PARAMETERS,
    payload: UpdateParameters,
    resource: string,
}



export type ApplicationDataAction = FetchApplicationDataAction 
                                            | FetchApplicationDataSuccessAction 
                                            | FetchApplicationDataErrorAction 
                                            | SetTab 
                                            | ResetTableState 
                                            | SetSelectedRecords
                                            | UpdateTableParameters