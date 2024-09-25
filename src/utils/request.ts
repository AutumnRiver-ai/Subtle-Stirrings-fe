import axios from 'axios'
import config from '@/../config/devConfig'

const request = axios.create({
    baseURL: `${config.baseUrl}/autumnRiver`,
    timeout: 30000
})

const errorHandler = error => {
    console.log(error)
}


request.interceptors.request.use(config => {
    console.log(config)
    return config
}, errorHandler)

request.interceptors.response.use(response => {
    return Promise.resolve(response.data)
}, errorHandler)

export default request
