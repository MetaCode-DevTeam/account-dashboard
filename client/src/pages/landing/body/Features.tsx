import { LineHead } from './LineHead'
import {
    PiBellThin,
    PiBezierCurveThin,
    PiCalculatorThin,
    PiChartPieSliceThin,
} from 'react-icons/pi'

const dataBox = [
    {
        icon: <PiBellThin className="text-8xl text-main" />,
        title: 'جستجوی رزومه قوی',
        id: 1,
    },
    {
        icon: <PiBezierCurveThin className="text-8xl text-main" />,
        title: 'انعطاف‌پذیر و کارآمد',
        id: 2,
    },
    {
        icon: <PiCalculatorThin className="text-8xl text-main" />,
        title: 'محاسبات دقیق',
        id: 3,
    },
    {
        icon: <PiChartPieSliceThin className="text-8xl text-main" />,
        title: 'نمایش داده های آماری',
        id: 4,
    },
]

export const Features = () => {
    return (
        <div className="max-w-laptop mx-auto">
            <div className="flex gap-12 flex-col">
                <LineHead
                    h2Par="راهکارهای کارآمد برای موفقیت در استخدام"
                    pPar="استخدام خود را با ابزارهای قدرتمند برای جستجو، عملکرد، کارایی و دیده شدن بهینه کنید"
                />

                <div className="flex justify-center items-center gap-x-3 gap-y-6 flex-wrap">
                    {dataBox.map((item) => (
                        <div
                            className="flex hover:cursor-pointer hover:-translate-y-3.5 shadow shadow-black shadow/25 max-w-[296px] flex-wrap flex-col gap-8 justify-center items-center *:text-center border rounded-2xl border-gray-200 p-4"
                            key={item.id}
                        >
                            <div className="">{item.icon}</div>
                            <div className="flex flex-col gap-3 justify-center items-center">
                                <h2 className="text-2xl font-dana-bold">{item.title}</h2>
                                <p className="text-gray-500">
                                    لورم ایپسن متن ساختی که در زمان های دور در خلال جنگ دوازده روزه
                                    ایران و روم شرقی بود درگذشت
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
