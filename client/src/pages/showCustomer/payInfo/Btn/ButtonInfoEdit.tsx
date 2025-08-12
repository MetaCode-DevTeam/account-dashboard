import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Input from '../../../../components/ui/Input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePutPayment } from '../../../../hooks/query/queries'
import { useManageDialog } from '../../../../hooks/store/stateManagement'

const zodInputs = z
    .object({
        amount: z.string().min(1, 'وارد کردن قسط پرداختی الزامی است'),
    })
    .transform((data) => ({
        amount: Number(data.amount),
    }))

type Inputs = z.infer<typeof zodInputs>

export default function ButtonInfoEdit({
    customerID,
    payID,
}: {
    customerID: string | number
    payID: string | number
}) {
    const { mutate } = usePutPayment(customerID, payID)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(zodInputs),
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        mutate(data)
    }

    const open = useManageDialog((state) => state.open)
    const close = useManageDialog((state) => state.close)
    const isOpen = useManageDialog((state) => state.isOpen)

    return (
        <>
            <button
                onClick={open}
                className="bg-success-light rounded-lg  dark:bg-success-dark px-5 py-2 text-white font-dana-bold text-xs"
            >
                ویرایش
            </button>

            <Dialog
                open={isOpen}
                as="div"
                className="relative z-[99999999999999999999] focus:outline-none"
                onClose={close}
            >
                <div className="fixed z-[99999] inset-0 w-screen overflow-y-auto bg-black/30 backdrop-blur-xs">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            dir="rtl"
                            transition
                            className="w-full max-w-md shadow shadow-black shadow/15 rounded-xl text-black dark:text-white bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-info-bg font-dana-bold text-xl text-center"
                            >
                                ویرایش اطلاعات پرداخت
                            </DialogTitle>
                            <div className="my-5 text-sm/6">
                                <form
                                    className="flex flex-col gap-4"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <label className="w-full border-2 rounded border-gray-300 px-2 py-1 h-10 focus-within:border-main flex relative">
                                        <Input
                                            placeholder="مقدار پرداختی جدید...."
                                            type="text"
                                            {...register('amount')}
                                        />

                                        {errors.amount && (
                                            <span className="text-xs font-dana text-red-500 absolute -bottom-5 right-0">
                                                {errors.amount.message}
                                            </span>
                                        )}
                                    </label>
                                    <Button
                                        type="button"
                                        className="flex justify-center items-center gap-2 rounded-md bg-main px-3 py-1.5 text-sm/6 font-dana text-white shadow-inner shadow-white/10"
                                        onClick={() => {
                                            handleSubmit(onSubmit)()
                                            close()
                                        }}
                                    >
                                        ثبت اطلاعات
                                    </Button>
                                </form>
                            </div>
                            <div className="mt-4 flex *:w-40 justify-center items-center gap-4">
                                <Button
                                    className="flex justify-center items-center gap-2 rounded-md bg-error-bg px-3 py-1.5 text-sm/6 font-dana text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => {
                                        close()
                                    }}
                                >
                                    بستن
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
