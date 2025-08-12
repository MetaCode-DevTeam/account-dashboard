import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

type DelButton = {
    mutate: (id: string) => void
    id: string
    // mutate : UseMutateFunction<any, Error, string, unknown>
}

export default function ButtonInfoDelete({ mutate, id }: DelButton) {
    const [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }
    return (
        <>
            <button
                className="bg-error-light rounded-lg  dark:bg-error-dark px-5 py-2 text-white font-dana-bold text-xs"
                onClick={() => {
                    // console.log(item.ID as number)
                    // mutate((item.ID as number).toString())
                    open()
                }}
            >
                حذف
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
                            className="w-full max-w-md rounded-xl shadow shadow-black shadow/15 text-black dark:text-white bg-white p-6 backdrop-blur-2xl transition-all duration-300 "
                        >
                            <DialogTitle as="h3" className="text-warning-bg font-dana-black ">
                                اخطار حذف پرداخت
                            </DialogTitle>
                            <p className="mt-2 text-sm/6">ایا از حذف این پرداخت مطمئن هستید؟</p>
                            <div className="mt-4 flex *:w-40 justify-center items-center gap-4">
                                <Button
                                    className="flex justify-center items-center gap-2 rounded-md bg-main px-3 py-1.5 text-sm/6 font-dana text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => {
                                        close()
                                    }}
                                >
                                    بستن
                                </Button>
                                <Button
                                    className="flex justify-center items-center gap-2 rounded-md bg-error-bg px-3 py-1.5 text-sm/6 font-dana text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={() => {
                                        mutate(id)
                                        close()
                                    }}
                                >
                                    حذف کردن
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
