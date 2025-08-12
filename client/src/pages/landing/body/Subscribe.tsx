import Button from '../../../components/ui/buttons/Button'
import { SvgF1 } from './svgs/SvgF1'
import { SvgF2 } from './svgs/SvgF2'
import { SvgF3 } from './svgs/SvgF3'

export const Subscribe = () => {
    return (
        <div className="bg-neutral-800 my-20 w-full p-5 max-sm:py-14 py-32 overflow-hidden flex justify-between items-center">
            <div className="w-full max-w-laptop mx-auto h-fit relative grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-28 justify-center items-center z-50">
                <SvgF1 className="absolute -bottom-50 p-2 scale-90 right-0 -z-10" />
                <SvgF3 className="absolute -bottom-20 p-2 scale-90 right-20 -z-10" />
                <SvgF2 className="absolute -bottom-30 p-2 scale-90 right-40 -z-10" />

                <SvgF1 className="absolute -left-80 -top-40 -z-10" />

                <div className="flex flex-col max-lg:justify-center max-lg:items-center *:max-lg:text-center gap-11">
                    <div className="flex flex-col max-lg:justify-center max-lg:items-center *:max-lg:text-center justify-between items-start gap-9">
                        <h2 className="text-white text-5xl font-dana-bold">
                            امکانات بیشتر با اشتراک ما
                        </h2>
                        <p className="text-white/60">
                            با دسترسی به پلتفرم حسابداری ما، راه‌حل‌های متنوع و کارآمدی برای مدیریت
                            مالی و حسابرسی خود خواهید یافت. ما متعهد به ارائه خدمات باکیفیت و
                            پشتیبانی مستمر هستیم تا اطمینان حاصل شود که نیازهای حسابداری شما به
                            بهترین شکل برآورده می‌شود.
                        </p>
                    </div>
                    <Button
                        color="primary"
                        text={'خرید'}
                        types="button"
                        typeBtn="contained"
                        size="sm"
                    />
                </div>
                <div className="shrink-0">
                    <img src="/images/Frame.png" alt="" />
                </div>
            </div>
        </div>
    )
}
