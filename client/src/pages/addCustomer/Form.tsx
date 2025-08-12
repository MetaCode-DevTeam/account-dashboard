import { Button } from '@headlessui/react'
import InputPrime from '../../components/ui/InputPrime'
import SelectBox from './SelectBox'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddCustomer } from '../../hooks/query/queries'
import { filteredAccount, filteredPeople } from '../../typesAndConsts/consts'

const zodInputs = z
    .object({
        firstName: z.string().min(1, ' وارد کردن نام الزامیست'),
        lastName: z.string().min(1, ' وارد کردن نام خانوادگی الزامیست'),
        phoneNumber: z
            .string()
            .min(11, 'شماره تماس نامعتبر است')
            .max(11, 'شماره تماس نامعتبر است')
            .startsWith('09', 'فرمت شماره تماس صحیح نیست'),
        totality: z.coerce.number('لطفاً یک عدد معتبر وارد کنید'),
        weight: z.coerce.number('لطفاً یک عدد معتبر وارد کنید'),
        description: z.string(),
        customerType: z.object({
            id: z.number(),
            name: z.string(),
        }),
        accountType: z.object({
            id: z.number(),
            name: z.string(),
        }),
    })
    .transform((data) => ({
        ...data,
        customerType: data.customerType.id,
        accountType: data.accountType.id,
    }))

type Inputs = z.infer<typeof zodInputs>

const formFields: { name: keyof Inputs; placeholder: string; type: 'text' | 'tel' | 'number' }[] = [
    { name: 'firstName', placeholder: 'نام', type: 'text' },
    { name: 'lastName', placeholder: 'نام خانوادگی', type: 'text' },
    { name: 'phoneNumber', placeholder: 'شماره تماس', type: 'tel' },
    { name: 'totality', placeholder: 'مبلغ کل', type: 'number' },
    { name: 'weight', placeholder: 'وزن طلا (گرم)', type: 'number' },
]

export default function Form() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: zodResolver(zodInputs) })
    const addCustomerHook = useAddCustomer()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        addCustomerHook.mutate(data)
    }

    return (
        <form
            className="grid grid-cols-2 gap-6 gap-y-9 max-sm:grid-cols-1 max-sm:px-3"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            {formFields.map((item) => (
                <div className="relative" key={item.name}>
                    <label className="w-full border-2 rounded border-gray-300 dark:border-[#5B5774] px-2 py-1 h-10 focus-within:border-main flex relative">
                        <InputPrime
                            type={item.type}
                            placeholder={item.placeholder}
                            {...register(item.name, { required: 'وارد کردن این فیلد الزامیست' })}
                        />
                    </label>
                    {errors[item.name] && (
                        <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                            {errors[item.name]?.message}
                        </span>
                    )}
                </div>
            ))}

            {/* select box */}
            <Controller
                name="customerType"
                defaultValue={filteredPeople[0]}
                control={control}
                render={({ field }) => (
                    <SelectBox
                        filteredPeople={filteredPeople}
                        selected={field.value}
                        setSelected={field.onChange}
                    />
                )}
            />

            <Controller
                name="accountType"
                defaultValue={filteredAccount[0]}
                control={control}
                render={({ field }) => (
                    <SelectBox
                        filteredPeople={filteredAccount}
                        selected={field.value}
                        setSelected={field.onChange}
                    />
                )}
            />

            <div className="col-span-full">
                <label className="w-full text-xs border-2 rounded border-gray-300 dark:border-[#5B5774] px-2 py-1 h-20 focus-within:border-main flex relative">
                    <InputPrime
                        type="textarea" // از نوع جدید textarea استفاده می‌کنیم
                        placeholder="توضیحات تکمیلی"
                        {...register('description')}
                    />
                </label>
            </div>
            <Button
                type="submit"
                className={
                    'col-span-full shadow-lg text-white bg-info-bg max-w-96 mx-auto w-full p-2 rounded-md'
                }
            >
                ثبت اطلاعات
            </Button>
        </form>
    )
}
