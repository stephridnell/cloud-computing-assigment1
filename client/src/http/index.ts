import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

const instance: AxiosInstance = axios.create({ baseURL: 'http://localhost:8081/' })

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.info(`[request] [${JSON.stringify(config)}]`)
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  ({ data }: AxiosResponse) => data,
  (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`)
    return Promise.reject(error)
  }
)

export default instance
