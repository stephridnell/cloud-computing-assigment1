import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

const instance: AxiosInstance = axios.create({ baseURL: 'http://localhost:8081/' })

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  ({ data }: AxiosResponse) => data,
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error.response?.data)
  }
)

export default instance
