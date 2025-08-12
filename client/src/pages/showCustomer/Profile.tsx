import { FaUserAlt } from 'react-icons/fa'
import type { customerType } from '../../typesAndConsts/types'

type profileType = {
    data: customerType
}

export default function Profile({ data }: profileType) {
    return (
        <div className="flex max-sm:flex-col-reverse max-sm:justify-center max-sm:items-center justify-end items-stretch gap-10">
            {/* info */}
            <div className="flex justify-center max-sm:items-center items-end gap-6 flex-col">
                <div className="flex justify-center items-center gap-4" dir="rtl">
                    <span>نام : </span>
                    <span className="font-dana-bold">{data.firstName}</span>
                </div>
                <div className="flex justify-center items-center gap-4" dir="rtl">
                    <span>نام خانوادگی : </span>
                    <span className="font-dana-bold">{data.lastName}</span>
                </div>
            </div>
            {/* info */}
            <section className="size-32 shadow-lg shadow/20 shadow-black min-w-32 min-h-32 flex justify-center items-center bg-background-secondary-light dark:bg-background-secondary-dark rounded-full overflow-hidden">
                <FaUserAlt className="text-6xl text-main" />
            </section>
        </div>
    )
}
