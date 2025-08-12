import Button from './buttons/Button'
import { getJalaliDate, getNameById } from '../../logics/funcs'
import { useNavigate } from 'react-router-dom'
import { filteredAccount, filteredPeople } from '../../typesAndConsts/consts'

export default function Card({
    customerType,
    firstName,
    lastName,
    CreatedAt,
    accountType,
    ID,
}: {
    CreatedAt: string
    customerType: number
    accountType: number
    firstName: string
    lastName: string
    ID: number
}) {
    const strType = getNameById(customerType, filteredPeople)
    const strAcc = getNameById(accountType, filteredAccount)
    const dateJalali = getJalaliDate(CreatedAt as string)
    const navigation = useNavigate()

    return (
        <>
            <div
                className="bg-background-secondary-light  hover:-translate-y-2 rounded-lg transition-all duration-300 flex flex-col items-stretch justify-between dark:bg-background-secondary-dark max-w-80 min-w-60 p-4 shadow-lg"
                dir="rtl"
            >
                <table>
                    <tbody className="*:*:p-3">
                        <tr className="m-4">
                            <td className="text-[10px] ml-5 truncate">اسم : </td>
                            <td className="text-[14px] font-dana">{firstName + ' ' + lastName}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5 truncate">تاریخ : </td>
                            <td className="text-[14px] font-dana">{dateJalali}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5 truncate">نوع مشتزی : </td>
                            <td className="text-[14px] font-dana">{strType}</td>
                        </tr>

                        <tr className="m-4">
                            <td className="text-[10px] ml-5 truncate">نوع حساب : </td>
                            <td className="text-[14px] font-dana">{strAcc}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="*:w-full *:p-3.5">
                    <Button
                        color="primary"
                        text="مشاهده جزییات"
                        typeBtn="contained"
                        types="button"
                        onClick={() => navigation(`/dashboard/customers/${ID}`)}
                    />
                </div>
            </div>
        </>
    )
}
