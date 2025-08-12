import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import InputPrime from '../../components/ui/InputPrime'
import Button from '../../components/ui/buttons/Button'
import { usePostPayment } from '../../hooks/query/queries'

const zodInputs = z
    .object({
        amount: z.string().min(1, 'وارد کردن این فیلد الزامیست'),
    })
    .transform((data) => ({
        amount: Number(data.amount),
    }))

type Inputs = z.infer<typeof zodInputs>

export default function PayInput({ id }: { id: string }) {
    const { mutate } = usePostPayment(id)
    const onSubmit: SubmitHandler<Inputs> = (info) => {
        console.log('submit')
        console.log(info)
        mutate(info)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(zodInputs) })
    return (
        <div className="p-7 rounded-lg flex justify-center my-5 shadow shadow/15 shadow-black items-center flex-col gap-6 bg-background-secondary-light dark:bg-background-secondary-dark">
            <form
                onSubmit={handleSubmit(onSubmit)}
                dir="rtl"
                className="w-full max-w-96 flex justify-between items-center flex-col *:w-full gap-7"
            >
                <label className="relative">
                    <label className="w-full border-2 rounded border-gray-300 dark:border-[#5B5774] px-2 py-1 h-10 focus-within:border-main flex relative">
                        <InputPrime
                            type={'number'}
                            placeholder={'پرداخت قسط'}
                            {...register('amount')}
                        />
                    </label>

                    <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                        {errors.amount?.message?.toString()}
                    </span>
                </label>

                <Button
                    color="primary"
                    text="ثبت"
                    typeBtn="contained"
                    types="button"
                    onClick={handleSubmit(onSubmit)}
                />
            </form>
        </div>
    )
}
