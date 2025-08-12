import { getAccessToken } from '../../cookies/manage'
import { instance } from '../services'

export async function deletePayment(paymentID: string) {
    const resp = await instance.delete(`simpleUser/payments/${paymentID}`, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken(),
        },
    })

    return resp.data
}
