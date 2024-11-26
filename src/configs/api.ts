import axios, { AxiosHeaders } from 'axios'
import { useUser } from 'stores/user'

export const api = axios.create({
  baseURL: 'https://dz9k802l-8080.asse.devtunnels.ms/',
})

api.interceptors.request.use(
  (config) => {
    const accessToken = useUser.getState().tokens.accessToken
    if (accessToken) (config.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
