import { getAccessToken } from '../../cookies/manage'
import type { paymentType } from '../../typesAndConsts/types'
import { instance } from '../services'

export async function postPaymentService(data: paymentType, customerId: number | string) {
    const resp = await instance.post(`simpleUser/payments/${customerId}`, data, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        },
    })

    return resp.data
}
