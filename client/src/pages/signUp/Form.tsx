import Input from '../../components/ui/Input'
import Button from '../../components/ui/buttons/Button'
import Logo from '../../components/ui/Logo'
import { useNavigate } from 'react-router-dom'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getRefreshToken } from '../../cookies/manage'
import { useRegister } from '../../hooks/query/queries'

const zodInputs = z.object({
    username: z
        .string()
        .max(20, { message: 'نام کاربری باید کمتر از 20 کاراکتر باشد' })
        .min(3, { message: 'نام کاربری باید بیشتر از 3 کاراکتر باشد' }),
    email: z.string().email({ message: 'فرمت ایمیل صحیح نیست' }),
    password: z.string().min(8, { message: 'رمز ورود باید بیشتر از 8 کاراکتر باشد' }),
})

type Inputs = z.infer<typeof zodInputs>

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(zodInputs) })
    const navigation = useNavigate()
    const regHook = useRegister()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        regHook.mutate(data)
    }

    if (getRefreshToken()) {
        // navigation('/')
    }

    return (
        <div
            className="p-5 rounded z-[99] shadow-lg max-w-80 w-full shadow-gray-300 bg-background-secondary-light flex flex-col gap-5"
            dir="rtl"
        >
            <section className="w-full flex justify-center items-center">
                <Logo />
            </section>
            <h2 className="text-2xl font-morabba">به وبسایت ما خوش آمدید</h2>
            <p className="text-xs font-dana-light">
                برای استفاده از امکانات سایت ما لطفا حساب کاربری جدید خودتون را بسازید
            </p>
            <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
                <label className="w-full border-2 rounded border-gray-300 px-2 py-1 h-10 focus-within:border-main flex relative">
                    <Input
                        type="text"
                        placeholder="نام کاربری..."
                        {...register('username', { required: 'وارد کردن نام کاربری اجباریست' })}
                    />
                    {errors.username && (
                        <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                            {errors.username.message}
                        </span>
                    )}
                </label>
                <label className="w-full border-2 rounded border-gray-300 px-2 py-1 h-10 focus-within:border-main flex relative">
                    <Input
                        type="text"
                        placeholder="ایمیل..."
                        {...register('email', { required: 'وارد کردن ایمیل اجباریست' })}
                    />
                    {errors.email && (
                        <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                            {errors.email.message}
                        </span>
                    )}
                </label>

                <label className="w-full border-2 rounded border-gray-300 px-2 py-1 h-10 focus-within:border-main flex relative">
                    <Input
                        type="password"
                        placeholder="رمز عبور..."
                        {...register('password', { required: 'وارد کردن رمز عبور اجباریست' })}
                    />
                    {errors.password && (
                        <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                            {errors.password.message}
                        </span>
                    )}
                </label>

                <Button
                    text="وارد شوید"
                    color="primary"
                    typeBtn="contained"
                    types="submit"
                    onClick={handleSubmit(onSubmit)}
                />

                <section className="flex gap-0.5 font-dana text-xs items-center justify-center flex-col">
                    <p> حساب کاریری دارید؟ </p>
                    <Button
                        text="وارد حساب کاربری قبلی خود شوید"
                        color="primary"
                        typeBtn="text"
                        onClick={() => navigation('/login')}
                    />
                </section>
            </form>
        </div>
    )
}
