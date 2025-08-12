import { PiCaretRightThin } from 'react-icons/pi'
import Button from '../../../components/ui/buttons/Button'
import { LineHead } from './LineHead'

const imgs = ['/images/afterpay.png', '/images/airbnb.png', '/images/framer.png']

export const Companies = () => {
    return (
        <div className="flex justify-center items-center gap-8 flex-col">
            <LineHead
                pPar='"ما بهترین پلتفرمی هستیم که شما را مستقیماً به یک داشیورد مدیریت سرمایه ، متصل می‌کند."'
                h2Par="ساخته شده برای شرکت‌هایی در هر اندازه‌ای"
            />

            {/* buttons */}
            <div className="flex flex-wrap gap-7 justify-center items-center flex-row-reverse">
                <Button
                    color="black"
                    size="sm"
                    text={'ثبت نام کنید'}
                    typeBtn="contained"
                    types="button"
                />
                <Button
                    color="black"
                    size="sm"
                    text={
                        <div className="flex justify-center items-center flex-row-reverse gap-1.5">
                            وارد حسابتان شوید
                            <PiCaretRightThin className="lg:text-xl" />
                        </div>
                    }
                    typeBtn="outlined"
                    types="button"
                />
            </div>

            {/* company */}
            <div className="flex flex-wrap my-8 justify-center items-center max-w-laptop mx-auto gap-5">
                {imgs.map((item) => (
                    <div
                        className="w-40 p-7 h-16 flex justify-center items-center rounded-full bg-gray-200"
                        key={item}
                    >
                        <img src={item} alt="" />
                    </div>
                ))}
                {imgs.map((item) => (
                    <div
                        className="w-40 p-7 h-16 flex justify-center items-center rounded-full bg-gray-200"
                        key={item}
                    >
                        <img src={item} alt="" />
                    </div>
                ))}
                {imgs.map((item) => (
                    <div
                        className="w-40 p-7 h-16 flex justify-center items-center rounded-full bg-gray-200"
                        key={item}
                    >
                        <img src={item} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}
