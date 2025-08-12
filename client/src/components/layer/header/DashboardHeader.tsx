import { useEffect, useState } from 'react'
import { PiDotsThreeOutlineVerticalThin, PiMoonThin, PiSunThin } from 'react-icons/pi'
import { useStoreHook } from '../../../hooks/store/stateManagement'

export default function DashboardHeader() {
    const [isDark, setIsDark] = useState(false)

    const toggle = useStoreHook((s) => s.toggleIsShow)

    useEffect(() => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }, [isDark])

    return (
        <div className="flex px-4 inset-x-0 shadow shadow/70 shadow-black/10 bg-background-light dark:bg-background-dark justify-between items-center py-6 fixed top-0 z-[9999999]">
            <div className="">
                <button className="lg:hidden" onClick={toggle} type="button">
                    <PiDotsThreeOutlineVerticalThin className="text-3xl" />
                </button>
            </div>
            <div className="">
                <div className="flex justify-center items-stretch  gap-7">
                    <div className="flex justify-center items-center">
                        <button onClick={() => setIsDark((p) => !p)}>
                            {isDark ? (
                                <PiMoonThin className="text-3xl" />
                            ) : (
                                <PiSunThin className="text-3xl" />
                            )}
                        </button>
                    </div>
                    <div className="size-10 rounded-full bg-main"></div>
                </div>
            </div>
        </div>
    )
}
