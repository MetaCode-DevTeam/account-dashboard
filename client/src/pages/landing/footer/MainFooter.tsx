import {
    PiFacebookLogoDuotone,
    PiGithubLogoDuotone,
    PiInstagramLogoDuotone,
    PiMapPinThin,
    PiPhoneCallThin,
    PiWhatsappLogoDuotone,
} from 'react-icons/pi'
import Logo from '../../../components/ui/Logo'
import { Link } from 'react-router-dom'

export const MainFooter = () => {
    return (
        <div className="border-t border-gray-300 pt-10">
            <div className="w-full max-w-laptop p-5 grid grid-cols-3 md:justify-items-center gap-y-20 max-md:grid-cols-2">
                <div className="flex flex-col gap-6 max-md:col-span-full">
                    <Logo />
                    <p className="text-gray-500 text-sm">
                        RX یک پلتفرم هوشمند حسابداری و مالی است که کسب‌وکارها را با متخصصان حسابداری
                        متصل می‌کند. با جستجوی سریع، ابزارهای حرفه‌ای برای تهیه گزارش‌های مالی و
                        تطبیق هوشمند نیازها، حسابلین فرآیندهای حسابداری و مدیریت مالی را ساده و
                        کارآمد می‌کند.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-dana-bold">لینک ها</h2>
                    <ul className="flex gap-3 flex-col text-xs">
                        <li>
                            <Link to={'/'}>خانه</Link>
                        </li>
                        <li>
                            <Link to={'/about-us'}>درباره ما</Link>
                        </li>
                        <li>
                            <Link to={'/login'}>ورود</Link>
                        </li>
                        <li>
                            <Link to={'/sign-up'}>ثبت نام</Link>
                        </li>
                        <li>
                            <Link to={'/dashboard'}>داشبورد</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-dana-bold">ارتباط با ما</h2>
                    <div className="flex gap-1 justify-start items-center">
                        <span className="">
                            <PiInstagramLogoDuotone className="text-2xl text-purple-500" />
                        </span>
                        <span className="">
                            <PiWhatsappLogoDuotone className="text-2xl text-green-500" />
                        </span>
                        <span className="">
                            <PiFacebookLogoDuotone className="text-2xl text-blue-500" />
                        </span>
                        <span className="">
                            <PiGithubLogoDuotone className="text-2xl text-black" />
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 justify-start items-center text-xs">
                            {' '}
                            <span>
                                <PiMapPinThin className="text-2xl" />
                            </span>{' '}
                            1500 Marilla St, Dallas, TX 75201
                        </div>
                        <div className="flex gap-2 justify-start items-center text-xs">
                            {' '}
                            <span>
                                <PiPhoneCallThin className="text-2xl" />
                            </span>{' '}
                            1(647)558-5560
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-200 p-5">
                <p className="text-center text-xs text-gray-500">RX Copyright 2025</p>
            </div>
        </div>
    )
}
