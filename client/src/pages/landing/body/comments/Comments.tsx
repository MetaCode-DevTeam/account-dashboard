import { LineHead } from '../LineHead'
import { Slider } from './Slider'

export const Comments = () => {
    return (
        <div className="flex justify-center items-center gap-8 flex-col max-w-laptop mx-auto w-full">
            <LineHead
                h2Par="نتایج مشخص است - مشتریان ما برنده‌اند"
                pPar="اعتماد در همکاری‌ها نمایان است. در اینجا دلایلی آورده شده که چرا شرکت‌ها برای ایجاد محیط‌های کاری متعهد و فراگیر، خدمات حسابرسی ما را انتخاب می‌کنند."
            />

            <div className="w-full">
                <Slider />
            </div>
        </div>
    )
}
