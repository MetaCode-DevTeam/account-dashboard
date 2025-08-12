import { getAccessToken } from '../../cookies/manage'
import type { customerType } from '../../typesAndConsts/types'
import { instance } from '../services'

export const addCustomerService = async (data: customerType) => {
    const resp = await instance.post('simpleUser/customers/', data, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        },
    })

    return resp.data
}
