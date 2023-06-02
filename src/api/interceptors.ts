import axios  from 'axios';
import { Store } from 'redux';
import { instance, 
            notificationsInstance, 
            authorizationInstance, 
            setHeaders 
        } from './api';
import { fetchStart, fetchEnd, setIsAuth, setNotification } from '../store/action-creators/application';

export interface IRequestError {
    message: string, 
    status?: number,
}

export const errorMessages = {
    "default": "Ошибка",
    "401": "Неверный логин или пароль",
    "502": "Ошибка соединения",
    "504": "Сервер не отвечает",
    "request": "Ошибка при выполнении запроса",
    "canceled": "Запрос был прерван",
    "put": "Ошибка при редактировании данных",
    "delete": "Ошибка при удалении"
  }
  
  const errorsHandler = (error: any, store?: Store) =>
   {
    if (axios.isCancel(error)) return Promise.reject({message: errorMessages["canceled"], canceled: true});
  
    const { config } = error
    const { url, method } = config
  
   if (error.response) {

    const { status, data } = error.response

    let message = errorMessages["default"]

    if (method === "delete") message = errorMessages["delete"]
    if (method === "put") message = errorMessages["put"]
    if (status === 401 && url === "login") message = errorMessages["401"]
    if (status === 401 && url !== "login") store && store.dispatch(setIsAuth(false))
    if (status === 502) message = errorMessages["502"]
    if (status === 504) message = errorMessages["504"]
  
    if (data && data.message) {
        message = data.message
    }

    if (store && status !== 401) {
        store.dispatch(setNotification({message, status}))
    } 
    
    return Promise.reject({message, status})

   }

   if (error.request) {

        if (store) {
            store.dispatch(setNotification({ message: errorMessages["request"] }))
        } 
        return Promise.reject({message: errorMessages["request"]});
    }
  }

const interceptors = (store: Store) => {

    // REQUEST

    instance.interceptors.request.use( request => {
        setTimeout(() => store.dispatch(fetchStart()),200)
        return setHeaders(request)
    })

    notificationsInstance.interceptors.request.use( request => {
        return setHeaders(request)
    })

    authorizationInstance.interceptors.request.use( request => {
        return request
        }, errorsHandler
    )

    // RESPONSE
    
    instance.interceptors.response.use( response => {
        store.dispatch(fetchEnd())
        return response
        },  (error) => {
            store.dispatch(fetchEnd())
            return errorsHandler(error, store)
        } 
      )

    notificationsInstance.interceptors.response.use( response => {
        return response
        }, errorsHandler
    )
    
    authorizationInstance.interceptors.response.use( response => {
        return response
        }, errorsHandler
    )
    
};

export default interceptors;