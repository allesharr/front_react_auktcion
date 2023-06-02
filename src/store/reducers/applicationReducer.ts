import { removeByKey } from "../../helpers/helpers";
import { ApplicationState, ApplicationActionTypes, ApplicationAction } from "../../types/application";

const initialState: ApplicationState = {
    loading: 0,
    loggedIn: false,
    roles: [],
    authorizationChecked: false,
    sideBarOpen: true,
    notifications: {
        
    },
    tabs: {
        license: 0,
        license_history: 0,
        organization_licenses: 0,
        organization_license_history: 0
    },
    query: {
        
    }
}

export const applicationReducer = (state = initialState, action: ApplicationAction): ApplicationState => {
    switch (action.type) {
        case ApplicationActionTypes.FETCH_START:
            return { ...state, loading: state.loading += action.payload }
        case ApplicationActionTypes.FETCH_END:
            return { ...state, loading: state.loading += action.payload }
        case ApplicationActionTypes.SET_SIDEBAR_OPEN:
            return { ...state, sideBarOpen: !state.sideBarOpen }
        case ApplicationActionTypes.SET_IS_AUTH:
            return { ...state, loggedIn: action.payload }
        case ApplicationActionTypes.SET_AUTHORIZATION_CHECKED:
            return { ...state, authorizationChecked: action.payload }
        case ApplicationActionTypes.SET_NOTIFICATION:
            return { ...state, notifications: { ...state.notifications, [String(Object.keys(state.notifications).length + 1)]: action.payload } }
        case ApplicationActionTypes.HIDE_NOTIFICATION:
            return { ...state, notifications: removeByKey(state.notifications,action.payload) }
        case ApplicationActionTypes.SET_TAB:
            return { ...state, tabs: {...state.tabs, [action.resource]: action.payload}}
        case ApplicationActionTypes.SET_QUERY:
            return { ...state, query: action.payload}
        case ApplicationActionTypes.SET_ROLES:
            return { ...state, roles: action.payload}        
        default:
            return state
    }
}