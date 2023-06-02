import { combineReducers } from "redux";
import { applicationDataReducer} from "./applicationDataReducer";
import { applicationReducer } from './applicationReducer'

export const rootReducer = combineReducers({
    applicationData: applicationDataReducer,
    application: applicationReducer
})

export type RootState = ReturnType<typeof rootReducer>