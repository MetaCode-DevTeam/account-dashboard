import { useParams } from 'react-router-dom'
import { PiCalendarDotsThin, PiCoinsThin, PiMoneyThin, PiPhoneCallThin } from 'react-icons/pi'
import { useGetCustomerById } from '../../hooks/query/queries'
import { Toaster } from 'sonner'
import Profile from './Profile'
import Info from './Info'
import PayInput from './PayInput'
import PayInfo from './payInfo/PayInfo'

export default function ShowCustomer() {
    const { id } = useParams()
    const { data, isLoading } = useGetCustomerById(id as string)

    const infoOfCustomer = {
        phoneNumber: [<PiPhoneCallThin className="text-3xl" />, ''],
        totality: [<PiMoneyThin className="text-3xl" />, ' تومان '],
        CreatedAt: [<PiCalendarDotsThin className="text-3xl" />, ''],
        weight: [<PiCoinsThin className="text-3xl" />, ' گرم '],
    }

    if (isLoading) {
        return (
            <div className="size-full flex justify-center items-center">
                درحال دریافت اطلاعات ...
            </div>
        )
    }

    return (
        data && (
            <div className="text-black font-dana-light dark:text-white py-4">
                <Toaster
                    richColors
                    position="top-center"
                    toastOptions={{
                        // در این قسمت کلاس‌های Tailwind را به بخش‌های مختلف اعلان می‌دهیم
                        classNames: {
                            toast: 'font-dana text-xs', // ✅ اعمال کلاس فونت به کل اعلان
                            title: 'font-dana text-xs', // می‌توانید برای عنوان جداگانه تنظیم کنید
                            description: 'font-dana text-xs', // و برای توضیحات
                        },
                    }}
                />
                {/* profile */}
                <Profile data={data} />
                {/* profile */}

                <div className="w-full bg-gray-200 dark:bg-background-secondary-dark my-10 h-px"></div>

                {/* more info */}
                <Info data={data} infoOfCustomer={infoOfCustomer} />
                {/* more info */}

                {/* pay input */}
                <PayInput id={id as string} />
                {/* pay input */}

                {/* pay info */}
                <PayInfo data={data} />
                {/* pay info */}
            </div>
        )
    )
}
