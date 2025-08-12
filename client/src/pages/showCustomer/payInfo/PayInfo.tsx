import BoxIcon from '../BoxIcon'
import { getJalaliDate, getNameById } from '../../../logics/funcs'
import type { customerType } from '../../../typesAndConsts/types'
import { filteredAccount } from '../../../typesAndConsts/consts'
import { useDeletePayment } from '../../../hooks/query/queries'
import ButtonInfoDelete from './Btn/ButtonInfoDelete'
import ButtonInfoEdit from './Btn/ButtonInfoEdit'

export default function PayInfo({ data }: { data: customerType }) {
    const accountType = getNameById(data?.accountType as number, filteredAccount)

    const { mutate: deletePayment } = useDeletePayment(data.ID as number)

    return (
        <>
            <BoxIcon Icon={<p>اطلاعات پرداخت قسط</p>} value="">
                <section className="pb-6 w-full">
                    {data.payment !== null ? (
                        accountType === filteredAccount[0].name ? (
                            <div className="flex w-full flex-col gap-4" dir="rtl">
                                {data?.payment?.map((item) => (
                                    <div
                                        className="w-full flex gap-10 justify-between items-center"
                                        key={item.ID as number}
                                    >
                                        <span>{item.amount} گرم</span>
                                        <span>{getJalaliDate(item.CreatedAt as string)}</span>
                                        <div className="flex justify-center items-center gap-2">
                                            <ButtonInfoEdit
                                                customerID={data.ID as number}
                                                payID={item.ID as number}
                                            />
                                            <ButtonInfoDelete
                                                mutate={deletePayment}
                                                id={(item.ID as number).toString()}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex w-full flex-col gap-4" dir="rtl">
                                {data?.payment?.map((item) => (
                                    <div
                                        className="w-full flex gap-10 justify-between items-center"
                                        key={item.ID as number}
                                    >
                                        <span>{item.amount.toLocaleString()} تومان</span>
                                        <span>{getJalaliDate(item.CreatedAt as string)}</span>
                                        <div className="flex justify-center items-center gap-2">
                                            <button className="bg-success-light rounded-lg  dark:bg-success-dark px-5 py-2 text-white font-dana-bold text-xs">
                                                ویرایش
                                            </button>
                                            <ButtonInfoDelete
                                                mutate={deletePayment}
                                                id={(item.ID as number).toString()}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        '-- هیچ پرداختی وجود ندارد --'
                    )}
                </section>
            </BoxIcon>
        </>
    )
}
