import { getRefreshToken } from '../../cookies/manage'
import { instance } from '../services'

export const refreshAccessTknService = async () => {
    const refreshToken = getRefreshToken() // نام کوکی رفرش توکن شما

    if (!refreshToken) {
        return Promise.reject(new Error('No refresh token available'))
    }
    const response = await instance.post('refreshToken', {
        refreshToken: refreshToken,
    })

    return response.data
}
