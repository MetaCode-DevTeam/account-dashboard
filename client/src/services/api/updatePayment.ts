import { getAccessToken } from '../../cookies/manage'
import type { paymentType } from '../../typesAndConsts/types'
import { instance } from '../services'

export async function updatePayment(paymentID: string | number, data: paymentType) {
    const resp = await instance.put(`simpleUser/payments/${paymentID}`, data, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        },
    })

    return resp.data
}
