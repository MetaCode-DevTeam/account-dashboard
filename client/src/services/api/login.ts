import type { formData } from '../../typesAndConsts/types'
import { instance } from '../services'

export const loginService = async (userInfo: formData) => {
    const response = await instance.post('login/', userInfo)

    return response.data
}
