import { ApplicationDataActionTypes, Parameters, UpdateParameters } from "../../types/applicationData/applicationData";
import { ApplicationActionTypes } from "../../types/application";
import { applicationDataAPI } from "../../api/api";

export const fetchData= ( resource: string, resource_api_name: string, parameters: Parameters, defaultParameters?: {[key: string]: string}) => {
    return async (dispatch) => {
        try {
            dispatch({type: ApplicationActionTypes.SET_QUERY, payload: {
                resource,
                resource_api_name,
                parameters,
                defaultParameters
            }})
            dispatch({type: ApplicationDataActionTypes.FETCH_DATA, payload: parameters, resource})
            const { data, total } = await applicationDataAPI.fetchData(resource_api_name, parameters, defaultParameters)
            dispatch({type: ApplicationDataActionTypes.FETCH_DATA_SUCCESS, resource, payload: { data, total }})

        } catch (error: any) {
            dispatch({
                type: ApplicationDataActionTypes.FETCH_DATA_ERROR,
                payload: [],
                resource
            })
        }
    }
}

export const setSelectedRecords = (resource: string, selected) => {
    return { type: ApplicationDataActionTypes.SET_SELECTED_RECORDS, resource, payload: selected }
}

export const resetTableState = (resource: string) => {
    return { type: ApplicationDataActionTypes.RESET_TABLE_STATE, resource }
}

export const setTab = (resource: string, tab) => {
    return { type: ApplicationDataActionTypes.SET_TAB, resource, payload: tab }
}

export const updateTableParameters = (resource: string, parameters: UpdateParameters) => {
    return { type: ApplicationDataActionTypes.UPDATE_TABLE_PARAMETERS, resource, payload: parameters }
}