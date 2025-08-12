import { PiMegaphoneBold, PiMetaLogoDuotone } from 'react-icons/pi'

export default function CommentCard() {
    return (
        <div className="w-full flex px-1 justify-center items-center ">
            <div className="bg-gray-100 shadow h-[410px] max-w-[400px] w-full shadow-black shadow/30 p-4 rounded-lg min-w-72 flex flex-col justify-between gap-4">
                <div className="">
                    <PiMegaphoneBold className="text-4xl text-main" />
                </div>
                <p className="overflow-y-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita reprehenderit,
                    quia facere nihil repudiandae facilis eveniet impedit eaque? Quibusdam,
                    incidunt! Sapiente nesciunt eum consequuntur quas sed cumque. Perspiciatis,
                    reprehenderit fugit.
                </p>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="flex justify-start items-center gap-3">
                    <div className="size-16 rounded-full overflow-hidden">
                        <img src="/images/defaultUser.jpg" alt="" />
                    </div>
                    <div className="flex flex-col justify-between">
                        <span className="text-sm">امیر رستمی</span>
                        <span className="text-sm">مدیر پروژه</span>
                        <span className="flex gap-0.5 justify-center items-center text-sm">
                            <PiMetaLogoDuotone className="text-amber-500" />
                            golden time
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
