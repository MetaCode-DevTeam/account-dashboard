import axios from 'axios'
import { refreshAccessTknService } from './api/refreshToken'
import { setCookie } from '../cookies/manage'

export const instance = axios.create({ baseURL: 'http://localhost:3000/api' })

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (
            error.response?.status === 401 &&
            originalRequest.url !== '/refreshToken' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            try {
                // ✅ ۲. اینجا تابع سرویس خود را مستقیماً فراخوانی کنید
                const data = await refreshAccessTknService()

                const newAccessToken = await data.accessToken
                setCookie('accessToken', newAccessToken, 1000 * 60 * 15)
                originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken

                return instance(originalRequest) // درخواست اصلی را با توکن جدید تکرار کن
            } catch (refreshError) {
                setCookie('accessToken', '', -1)
                setCookie('refreshToken', '', -1)
                window.location.href = '/sign-up'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    },
)
