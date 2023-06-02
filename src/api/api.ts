import axios, { AxiosRequestConfig } from 'axios'
import { UpdateParameters } from '../types/applicationData/applicationData'

export const apiURL = process.env.REACT_APP_API_URL

const config: AxiosRequestConfig = {
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
}

export const authorizationInstance = axios.create({...config, timeout: 10000})

export const instance = axios.create({...config, timeout: 10000})

export const notificationsInstance = axios.create(config)

export const setHeaders = (request) => {
    request.headers.login = localStorage.getItem('login')
    request.headers.session_key = localStorage.getItem('session_key')
    return request
}

export const authorizationAPI = {
        async login(login: string, password_hash: string) {
            return authorizationInstance.post('login',{ login, password_hash })
        },
        async checkAuth(session_key, id) {
            return authorizationInstance.post('check_auth',{ session_key, id })
        },

        async register(login :string, password_hash:string){
            return authorizationInstance.post('register', {login, password_hash})
        }
        // logoutRequest(login) {
        //     if (!login) return Promise.resolve() 
        //     return instance.post('logout')
        // }
}
// 
export const applicationDataAPI = {
    
    async fetchData (resource: string, parameters?: UpdateParameters | null, defaultParametersObject?: any) {

        let url: string = resource
        
        if (parameters) {

            const { page, perPage, orderBy, order, filterValues } = parameters
            url = `${resource}?page=${page}&rows_per_page=${perPage}&order_field=${orderBy}&order_op=${order}`

            if (!page && !perPage) url = `${resource}?order_field=${orderBy}&order_op=${order}`

            if (filterValues) {
                if (Object.keys(filterValues).length > 0) {
                    const filter = JSON.stringify(filterValues)
                    url+=`&filter=${filter}`
    
                }
            }

        }

        if (defaultParametersObject && Object.keys(defaultParametersObject).length > 0) {

            let divider = parameters ? "&" : "?"

            const defaultParameters = Object.keys(defaultParametersObject).reduce((acc,curr,i,array) => {
                if (i < array.length -1) return acc + curr + "=" + defaultParametersObject[curr] + "&"
                else return acc + curr + "=" + defaultParametersObject[curr]
            },divider)
            url += defaultParameters
        }
        

        return instance.get(url)
        .then(res => {
            return Promise.resolve({
                data: res.data,
                total: Number(res.headers['total_records'])
            })
        }).catch(err => { 
            return Promise.reject(err)
        })
    },


    async getOne(resource: string, id: string | number) {
        return instance.get(`${resource}/${id}`)
    },
    async createRecord (resource: string, formData) {
        return instance.post(resource, formData)
    },
    async updateRecord(resource: string, id: string | number, formData ) {
        return instance.put(`${resource}/${id}`, formData)
    },
    async deleteRecord(resource: string, id: string | number, data?) {
        return instance.delete(`${resource}/${id}`,{ data })
    },
    async customDelete(url, data?) {
        return instance.delete(url,{ data })
    }
}

export const reportsAPI = {
    async getReport(reportTtile) {

    }
}