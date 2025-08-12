import Button from '../../components/ui/buttons/Button'

export function Head() {
    return (
        <div className="bg-gray-200 p-5 h-fit pt-[150px]">
            <div className="max-w-laptop w-full max-md:flex-col-reverse mx-auto h-fit flex xl:gap-[148px] gap-24 justify-center items-stretch">
                {/* text */}
                <div className="flex flex-col shrink gap-9 max-md:justify-center max-md:items-center md:max-w-[504px] py-[63px] max-md:pt-0">
                    <div className="flex flex-col gap-6 max-md:justify-center max-md:items-center">
                        <h2 className="lg:text-[56px] max-md:text-center text-2xl font-dana-bold">
                            با RX هوشمندانه‌تر استخدام کنید، سریع‌تر رشد کنید!
                        </h2>
                        <p className="text-gray-500 max-md:text-center max-lg:text-xs">
                            فرصت‌های شغلی خود را در RX ثبت کنید و با هزاران متخصص برتر ارتباط برقرار
                            کنید. با ابزارهای پیشرفته، سیستم‌های تطبیق هوشمند و رابط کاربری
                            کاربرپسند
                        </p>
                    </div>

                    <Button color="black" text={'یک شغل ثبت کنید'} size="lg" typeBtn="contained" />
                </div>

                {/* image */}
                <div className="grow ">
                    <img
                        src="/images/landingHeader.png"
                        className="h-full w-full object-contain"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
