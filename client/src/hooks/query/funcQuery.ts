import { toast } from 'sonner'
import { setCookie } from '../../cookies/manage'
import type { RegisterResponse } from '../../typesAndConsts/types'

export function successFunc(data: RegisterResponse) {
    console.log('is success')
    setCookie('accessToken', data.accessToken, 1000 * 60 * 15)
    setCookie('refreshToken', data.refreshToken, 1000 * 60 * 60 * 24 * 7)
    toast.success('ثبت نام شما موفقیت آمیز بود')
}
