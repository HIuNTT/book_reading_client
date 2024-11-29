import axios, { AxiosHeaders } from 'axios'
import { useUser } from 'stores/user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const apiRecommend = axios.create({
  baseURL: import.meta.env.VITE_API_RECOMMENDED_URL,
})
