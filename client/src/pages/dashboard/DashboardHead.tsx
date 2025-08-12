import { PiMagnifyingGlassLight } from 'react-icons/pi'

export function DashboardHead() {
    return (
        <div className="w-full h-96 mb-20 rounded-2xl overflow-hidden relative flex justify-center items-center bg-none">
            <img
                src="/images/bg-search.jpg"
                className="absolute bottom-0 h-full z-0 w-full object-cover object-center"
            />
            <form
                dir="rtl"
                className="z-50 gap-2 flex w-full max-w-96 bg-white text-black ring-blue-600 rounded-xl p-2 mx-10 h-fit overflow-hidden  shadow-[0_0_20px_2px_#155dfc]  focus-within:ring-4"
            >
                <button className="w-fit text-gray-600" type="button">
                    <PiMagnifyingGlassLight className="text-2xl" />
                </button>
                <label className="*:outline-0 w-full grow ">
                    <input
                        type="text"
                        className="placeholder:font-morabba font-dana w-full"
                        placeholder="جستجو ...."
                    />
                </label>
            </form>
        </div>
    )
}
