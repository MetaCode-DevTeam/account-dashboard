import { getAccessToken } from '../../cookies/manage'
import { instance } from '../services'

export const getAlluserService = async () => {
    const response = await instance.get('admin/users', {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        },
    })

    return response.data
}
