import { type JSX } from 'react'

type boxIconType = {
    Icon: JSX.Element
    value: string
    children?: JSX.Element | string
}

export default function BoxIcon({ Icon, value, children }: boxIconType) {
    return (
        <div className="p-5 rounded-lg flex justify-center shadow shadow/15 shadow-black items-center flex-col gap-6 bg-background-secondary-light dark:bg-background-secondary-dark">
            <div className="">{Icon}</div>
            <div className="">{value}</div>
            {children && <div className="grow w-full">{children}</div>}
        </div>
    )
}
