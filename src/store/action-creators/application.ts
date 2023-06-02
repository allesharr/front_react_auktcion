import { ApplicationActionTypes } from "../../types/application";

export const fetchStart = () => {
    return { type: ApplicationActionTypes.FETCH_START, payload: 1 }
}

export const fetchEnd = () => {
    return { type: ApplicationActionTypes.FETCH_END, payload: -1 }
}

export const setNotification = (payload: any) => {
    return { type: ApplicationActionTypes.SET_NOTIFICATION, payload }
}

export const hideNotification = (payload: any) => {
    return { type: ApplicationActionTypes.HIDE_NOTIFICATION, payload }
}

export const setIsAuth = (payload: boolean) => {
    return { type: ApplicationActionTypes.SET_IS_AUTH, payload }
}

export const setAuthorizationChecked = (payload: boolean) => {
    return { type: ApplicationActionTypes.SET_AUTHORIZATION_CHECKED, payload }
}

export const setRoles= (payload: number[]) => {
    return { type: ApplicationActionTypes.SET_ROLES, payload }
}

export const setSidebarOpen = () => {
    return { type: ApplicationActionTypes.SET_SIDEBAR_OPEN  }
}