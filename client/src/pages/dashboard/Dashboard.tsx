import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { CustomerTypeSearch } from '../../typesAndConsts/types'
import { DashboardHead } from './DashboardHead'
import { DashboardBody } from './DashboardBody'

export const Dashboard = () => {
    const { pathname } = useLocation()
    const [typeSearch, setTypeSearch] = useState<CustomerTypeSearch>('debtor')

    useEffect(() => {
        const arrType = pathname.split('/')
        const ownType = arrType[arrType.length - 1]

        setTypeSearch(ownType as CustomerTypeSearch)
    }, [pathname])

    return (
        <>
            <div className="py-10">
                <DashboardHead />
                <DashboardBody typeSearch={typeSearch} />
            </div>
        </>
    )
}
