import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseMutationResult,
    type UseQueryResult,
} from '@tanstack/react-query'
import { registerService } from '../../services/api/register'
import type {
    customerType,
    CustomerTypeSearch,
    formData,
    paymentType,
    paymentTypeResponse,
    RegisterResponse,
    responseCustomerType,
    User,
} from '../../typesAndConsts/types'
import { toast } from 'sonner'
import { successFunc } from './funcQuery'
import { AxiosError } from 'axios'
import { useManageDialog, useStoreHook } from '../store/stateManagement'
import { getAlluserService } from '../../services/api/getAllusers'
import { loginService } from '../../services/api/login'
import { useNavigate } from 'react-router-dom'
import { addCustomerService } from '../../services/api/addCustomer'
import { getCustomerByType } from '../../services/api/getCustomerByType'
import { getCustomerById } from '../../services/api/getCustomerById'
import { postPaymentService } from '../../services/api/postPaymentService'
import { deletePayment } from '../../services/api/deletePayment'
import { updatePayment } from '../../services/api/updatePayment'

type ApiError = {
    error: string
}

export function useRegister(): UseMutationResult<RegisterResponse, AxiosError<ApiError>, formData> {
    const setUser = useStoreHook((state) => state.setUser)
    const navigation = useNavigate()

    const mutation = useMutation<RegisterResponse, AxiosError<ApiError>, formData>({
        mutationFn: (userInfo: formData) => registerService(userInfo),
        onSuccess: (data) => {
            successFunc(data)
            setUser(data.user)
            navigation('/dashboard/debtor')
        },
        onError: (error: AxiosError<ApiError>) => {
            console.log('error', error.response?.data.error)
            if (error.response?.data.error === 'user already exist') {
                toast.error('کاربری با این اطلاعات وجود دارد ')
            } else {
                toast.error('مشکلی در ثبت نام شما پیش امده لطفا مجدد امتحان کنید')
            }
        },
    })

    return mutation
}

export function useLogin(): UseMutationResult<RegisterResponse, Error, formData> {
    const setUser = useStoreHook((state) => state.setUser)
    const navigation = useNavigate()

    const mutation = useMutation<RegisterResponse, AxiosError<ApiError>, formData>({
        mutationFn: (userInfo: formData) => loginService(userInfo),
        onSuccess: (data) => {
            successFunc(data)
            setUser(data.user)
            navigation('/')
        },
        onError: (error: AxiosError<ApiError>) => {
            console.log('error', error.response?.data.error)
            if (error.response?.data.error === 'user already exist') {
                toast.error('کاربری با این اطلاعات وجود دارد ')
            } else {
                toast.error('مشکلی در ثبت نام شما پیش امده لطفا مجدد امتحان کنید')
            }
        },
    })

    return mutation
}

export function useGetUsers(): UseQueryResult<User[], AxiosError<ApiError>> {
    const query = useQuery<User[], AxiosError<ApiError>>({
        queryFn: getAlluserService,
        queryKey: ['users'],

        retry: (failureCount, error) => {
            // اگر خطا از نوع 403 (عدم دسترسی) یا 401 (عدم احراز هویت) بود، دیگر تلاش نکن
            if (error.response?.status === 403 || error.response?.status === 401) {
                return false
            }

            return failureCount < 2
        },
    })

    return query
}

export function useAddCustomer(): UseMutationResult<responseCustomerType, Error, customerType> {
    const mutation = useMutation<responseCustomerType, Error, customerType>({
        mutationFn: (customer) => addCustomerService(customer),
        onError: (e) => {
            toast.error('مشکلی در ارسال داده ها ایجاد شده')
            console.log(e)
        },
        onSuccess: () => {
            toast.success('داده با موفقیت ارسال شد')
        },
    })

    return mutation
}

export function useGetCustomerByType(
    cType: CustomerTypeSearch,
): UseQueryResult<customerType[], AxiosError<ApiError>> {
    const query = useQuery<customerType[], AxiosError<ApiError>>({
        queryKey: ['customer', cType],
        queryFn: async () => getCustomerByType(cType),
        enabled: !!cType,
    })

    return query
}

export function useGetCustomerById(
    customerId: number | string,
): UseQueryResult<customerType, Error> {
    const query = useQuery<customerType, AxiosError<ApiError>>({
        queryKey: ['customer', Number(customerId)],
        queryFn: async () => getCustomerById(customerId),
        enabled: !!customerId,
    })

    return query
}

export function usePostPayment(
    customerId: string | number,
): UseMutationResult<paymentTypeResponse, Error, paymentType> {
    const queryClient = useQueryClient()
    const mutation = useMutation<paymentTypeResponse, Error, paymentType>({
        mutationFn: (data: paymentType) => postPaymentService(data, customerId),
        mutationKey: ['payment', Number(customerId)],
        onError: (error) => {
            console.log(error)
            toast.error('مشکلی در ارسال اطلاعات پرداخت پیش آمده است')
        },
        onSuccess: () => {
            toast.success('اطلاعات با موفقیت ارسال شد')
            queryClient.invalidateQueries({
                queryKey: ['customer', Number(customerId)],
            })
        },
    })

    return mutation
}

export function useDeletePayment(customerId: string | number) {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (paymentID: string) => deletePayment(paymentID),
        onSuccess: () => {
            toast.success('حذف با موفقیت انجام شد')
            queryClient.invalidateQueries({
                queryKey: ['customer', Number(customerId)],
            })
        },

        onError: () => {
            toast.error('عملیات حذف شکست خورد!!!!')
        },
    })

    return mutation
}

export function usePutPayment(
    customerId: string | number,
    paymentID: string | number,
): UseMutationResult<paymentType, Error, paymentType> {
    const queryClient = useQueryClient()
    const close = useManageDialog((state) => state.close)
    const mutation = useMutation<paymentType, Error, paymentType>({
        mutationFn: (data: paymentType) => updatePayment(paymentID, data),
        onSuccess: () => {
            toast.success('ویرایش با موفقیت انجام شد')
            queryClient.invalidateQueries({
                queryKey: ['customer', Number(customerId)],
            })
            close()
        },

        onError: (error) => {
            console.log(error)
            toast.error('عملیات حذف شکست خورد!!!!')
        },
    })

    return mutation
}
