import { LineHead } from './LineHead'

export const Evolve = () => {
    const arr = []
    for (let i = 0; i < 4; i++) {
        arr.push(i)
    }
    console.log(arr)
    return (
        <div className="max-w-laptop mx-auto w-full flex flex-col justify-center items-center gap-8">
            <LineHead
                h2Par="استراتژی حسابرسی خود را ارتقا دهید"
                pPar="فرآیند حسابرسی خود را با راهکارهای نوآورانه برای تامین منابع و رویدادها، انعطاف‌پذیر و ساده کنید"
            />

            <div className="grid grid-cols-4 w-full max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
                {arr.map((item) => (
                    <div
                        className="bg-neutral-200 p-4 rounded-xl flex flex-col gap-3 shadow-2xl border border-gray-300"
                        key={item}
                    >
                        <h2 className="text-2xl font-dana-black">Lorem ipsum dolor sit amet</h2>
                        <p className="text-xs font-dana text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
                            voluptas ex est modi rerum eos, sit delectus tempore unde ipsam ab quia
                            maxime et molestias nesciunt sint, consequuntur doloribus? Facere quidem
                            distinctio, commodi quasi assumenda itaque dolores velit perspiciatis
                            culpa!
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
