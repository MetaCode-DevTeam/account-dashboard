import { getAccessToken } from '../../cookies/manage'
import type { CustomerTypeSearch } from '../../typesAndConsts/types'
import { instance } from '../services'

export async function getCustomerByType(cType: CustomerTypeSearch) {
    const resp = await instance.get(`simpleUser/customers/get-all/${cType}`, {
        headers: { Authorization: 'Bearer ' + getAccessToken() },
    })

    return resp.data
}
