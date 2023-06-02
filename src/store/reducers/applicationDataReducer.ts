import { ApplicationDataAction, ApplicationDataActionTypes, ApplicationDataState} from "../../types/applicationData/applicationData";

const initialState: ApplicationDataState = {
    
    events: {
        data: [],
        parameters: {
            page: 1,
            perPage: 25,
            orderBy: "event_time",
            order: "desc",
            filterValues: {
                org_name: "ГУП \"Электронный регион\""
            }
        },
        selected: [],
        total: 0,
        loading: false,
        resource_api_name: "event",
        basePath: "/events"
    },
    employees: {
        data: [],
        parameters: {
            page: 1,
            perPage: 25,
            orderBy: "id",
            order: "asc",
            filterValues: {
                org_name: "ГУП \"Электронный регион\""
            }
        },
        selected: [],
        total: 0,
        loading: false,
        resource_api_name: "user",
        basePath: "/users"
    },
    users: {
        data: [],
        parameters: {
            page: 1,
            perPage: 25,
            orderBy: "id",
            order: "asc",

            filterValues: {
            }
        },
        selected: [],
        total: 0,
        loading: false,
        resource_api_name: "sys_user",
        basePath: "/users"
    }

}

export const applicationDataReducer = (state = initialState, action: ApplicationDataAction): ApplicationDataState => {
    switch (action.type) {
        case ApplicationDataActionTypes.FETCH_DATA:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                parameters: {
                    ...state[action.resource].parameters,
                    ...action.payload
                },
                loading: true   
        }}

        case ApplicationDataActionTypes.FETCH_DATA_SUCCESS:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                data: action.payload.data,
                total: action.payload.total,
                loading: false
        }}

        case ApplicationDataActionTypes.FETCH_DATA_ERROR:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                data: [],
                loading: false
        }}

        case ApplicationDataActionTypes.RESET_TABLE_STATE:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                data: []
        }}

        case ApplicationDataActionTypes.SET_SELECTED_RECORDS:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                selected: action.payload
        }}

        case ApplicationDataActionTypes.UPDATE_TABLE_PARAMETERS:
            return { ...state, [action.resource]: {
                ...state[action.resource],
                parameters: { ...state[action.resource].parameters, ...action.payload }
        }}

        default:
            return state
    }
}