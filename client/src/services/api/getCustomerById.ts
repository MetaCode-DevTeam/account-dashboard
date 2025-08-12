import { getAccessToken } from '../../cookies/manage'
import { instance } from '../services'

export async function getCustomerById(customerId: number | string) {
    const resp = await instance.get(`simpleUser/customers/get-by-id/${customerId}`, {
        headers: { Authorization: 'Bearer ' + getAccessToken() },
    })

    return resp.data
}
