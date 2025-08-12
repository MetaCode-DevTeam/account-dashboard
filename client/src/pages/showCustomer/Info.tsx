import BoxIcon from './BoxIcon'
import { getJalaliDateByClock } from '../../logics/funcs'
import type { JSX } from 'react'
import type { customerType } from '../../typesAndConsts/types'

type InfoType = {
    data: customerType
    infoOfCustomer: {
        phoneNumber: (string | JSX.Element)[]
        totality: (string | JSX.Element)[]
        CreatedAt: (string | JSX.Element)[]
        weight: (string | JSX.Element)[]
    }
}

export default function Info({ data, infoOfCustomer }: InfoType) {
    return (
        <section className="mt-2 flex flex-col gap-5" dir="rtl">
            {data !== undefined && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 *:w-full gap-4">
                    {Object.entries(data).map(([key, value]) => {
                        if (key.toString() in infoOfCustomer) {
                            const typedKey = key as keyof typeof infoOfCustomer
                            return (
                                <div className="" key={key}>
                                    <BoxIcon
                                        value={
                                            (key === 'CreatedAt'
                                                ? getJalaliDateByClock(value as string)
                                                : key === 'totality'
                                                  ? value.toLocaleString()
                                                  : (value as string)) + infoOfCustomer[typedKey][1]
                                        }
                                        Icon={infoOfCustomer[typedKey][0] as JSX.Element}
                                    ></BoxIcon>
                                </div>
                            )
                        }
                    })}
                </div>
            )}
            <div className="flex flex-col justify-center items-stretch *:grow gap-4">
                {
                    <BoxIcon
                        Icon={<span> مانده : </span>}
                        value={data?.remainingAmount?.toLocaleString() as string}
                    />
                }

                {data?.description && (
                    <BoxIcon
                        Icon={<span>توضیحات تکمیلی : </span>}
                        value={data.description}
                    ></BoxIcon>
                )}
            </div>
        </section>
    )
}
