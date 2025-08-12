import type { formData } from '../../typesAndConsts/types'
import { instance } from '../services'

export const registerService = async (userInfo: formData) => {
    const response = await instance.post('register/', userInfo)

    return response.data
}
