import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './buttons/Button'
import { useState } from 'react'
import { getJalaliDate } from '../../logics/funcs'

type UserCardType = { username: string; createAt: string; email: string; role: string }

export default function UserCard({ username, createAt, email, role }: UserCardType) {
    const shamsiDate = getJalaliDate(createAt)

    const [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const roleString = role == '0' ? 'کاربر عادی' : role == '1' ? 'ادمین' : ''

    return (
        <>
            <div
                className=" bg-background-secondary-light w-full hover:-translate-y-2 rounded-lg transition-all duration-300 flex flex-col items-stretch justify-stretch dark:bg-background-secondary-dark p-4 shadow-lg"
                dir="rtl"
            >
                <table>
                    <tbody className="*:*:p-3">
                        <tr className="m-4">
                            <td className="text-[10px] ml-5">اسم : </td>
                            <td className="font-dana">{username}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5">تاریخ ایجاد حساب: </td>
                            <td className="font-dana">{shamsiDate}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5"> نقش : </td>
                            <td className="font-dana">{roleString}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5"> ایمیل : </td>
                            <td className="font-dana">{email}</td>
                        </tr>
                    </tbody>
                </table>
                <div className=" flex justify-center items-center gap-4 *:p-3.5 mt-7 mb-2 flex-wrap *:grow">
                    <Button
                        color="primary"
                        text="مشاهده جزییات"
                        typeBtn="contained"
                        types="button"
                        onClick={open}
                    />

                    <Button
                        color="success"
                        text="ویرایش"
                        typeBtn="contained"
                        types="button"
                        onClick={open}
                    />

                    <Button
                        color="error"
                        text="حذف کاربر"
                        typeBtn="contained"
                        types="button"
                        onClick={open}
                    />
                </div>
            </div>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-[999999999999999999] focus:outline-none font-dana"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen bg-black/80 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-5">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl dark:bg-white/5 bg-black/20 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                Payment successful
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                Your payment has been successfully submitted. We’ve sent you an
                                email with all of the details of your order.
                            </p>
                            <div className="mt-4">
                                <Button
                                    color="primary"
                                    text="مشاهده شد"
                                    typeBtn="contained"
                                    types="button"
                                    onClick={close}
                                />
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
