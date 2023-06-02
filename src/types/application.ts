import { Parameters } from "./applicationData/applicationData"

export interface Message {
    message: string,
    variant: "error" | "success"
}

export interface Query {
    resource?: string,
    resource_api_name?: string,
    parameters?: Parameters,
    defaultParameters?: {[key: string]: string}
}

export enum Roles {
    Admin = 1,
    User = 2
}

export interface ApplicationState {
    loading: number;
    roles: number[];
    loggedIn: boolean;
    authorizationChecked: boolean;
    sideBarOpen: boolean;
    notifications: {[key: string]: Message},
    tabs: {
        [key: string]: number | string
    },
    query: Query
}

export enum ApplicationActionTypes {
    FETCH_START = 'FETCH_START',
    FETCH_END = 'FETCH_END',
    SET_IS_AUTH = 'SET_IS_AUTH',
    SET_AUTHORIZATION_CHECKED = 'SET_AUTHORIZATION_CHECKED',
    SET_ROLES = 'SET_ROLES',
    SET_SIDEBAR_OPEN = 'SET_SIDEBAR_OPEN',
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    HIDE_NOTIFICATION = 'HIDE_NOTIFICATION',
    SET_TAB = 'SET_TAB',
    SET_QUERY = 'SET_QUERY'
}

interface FetchStart {
    type: ApplicationActionTypes.FETCH_START;
    payload: number
}

interface FetchEnd {
    type: ApplicationActionTypes.FETCH_END;
    payload: number
}

interface SetIsAuth {
    type: ApplicationActionTypes.SET_IS_AUTH,
    payload: boolean
}

interface SetAuthorizationChecked {
    type: ApplicationActionTypes.SET_AUTHORIZATION_CHECKED,
    payload: boolean
}

interface SetRoles {
    type: ApplicationActionTypes.SET_ROLES,
    payload: number[]
}

interface SetSidebarOpen {
    type: ApplicationActionTypes.SET_SIDEBAR_OPEN,
    // payload: boolean
}

interface SetNotification {
    type: ApplicationActionTypes.SET_NOTIFICATION,
    payload: Message
}
interface HideNotification {
    type: ApplicationActionTypes.HIDE_NOTIFICATION,
    payload: number
}

interface SetTab {
    type: ApplicationActionTypes.SET_TAB,
    payload: string | number,
    resource: string
}

interface SetQuery {
    type: ApplicationActionTypes.SET_QUERY,
    payload: Query
}


export type ApplicationAction = FetchStart | FetchEnd | SetIsAuth | SetAuthorizationChecked | SetRoles | SetSidebarOpen | SetNotification |  HideNotification | SetTab | SetQuery