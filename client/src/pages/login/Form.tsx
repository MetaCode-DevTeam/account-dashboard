import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/buttons/Button'
import Input from '../../components/ui/Input'
import Logo from '../../components/ui/Logo'
import { useForm, type SubmitHandler } from 'react-hook-form'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../../hooks/query/queries'

const zodInputs = z.object({
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
    const logingHook = useLogin()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        logingHook.mutate(data)
    }

    return (
        <div
            className="p-5  rounded shadow-lg z-[99] max-w-80 w-full shadow-gray-300 bg-background-secondary-light flex flex-col gap-5"
            dir="rtl"
        >
            <section className="w-full flex justify-center items-center">
                <Logo />
            </section>
            <h2 className="text-2xl font-morabba">به وبسایت ما خوش آمدید</h2>
            <p className="text-xs font-dana-light">
                برای استفاده از امکانات سایت ما لطفا وارد حساب کاربری خودتون بشید
            </p>
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex justify-between items-center">
                    <label className="flex gap-2 font-dana text-xs hover:cursor-pointer w-fit">
                        <input type="checkbox" />
                        مرا به خاطر بسپار
                    </label>

                    <Button text="رمز خود را فراموش کردم" color="primary" typeBtn="text" />
                </div>

                <Button
                    text="وارد شوید"
                    color="primary"
                    typeBtn="contained"
                    types="submit"
                    onClick={handleSubmit(onSubmit)}
                />

                <section className="flex gap-0.5 font-dana text-xs items-center justify-center flex-col">
                    <p>اکانت فعال ندارید؟</p>
                    <Button
                        text="ساخت اکانت جدید"
                        color="primary"
                        typeBtn="text"
                        onClick={() => navigation('/sign-up')}
                    />
                </section>
            </form>
        </div>
    )
}
