import Card from '../../components/ui/Card'
import { useGetCustomerByType } from '../../hooks/query/queries'
import type { CustomerTypeSearch } from '../../typesAndConsts/types'

export function DashboardBody({ typeSearch }: { typeSearch: CustomerTypeSearch }) {
    const { isLoading: customersLoder, data: customers } = useGetCustomerByType(typeSearch)

    console.log(customers)

    if (customersLoder) {
        return (
            <div className="h-screen w-screen absolute inset-0 flex justify-center items-center">
                در حال بارگذاری اطلاعات...
            </div>
        )
    }
    return customers && customers.length > 0 ? (
        <div className="flex justify-center items-stretch flex-wrap *:flex-1 *:grow *:shrink basis-auto gap-7">
            {customers.map((item) => {
                console.log('items =>', item, item.customerType)
                return (
                    <Card
                        key={item.ID}
                        CreatedAt={item.CreatedAt as string}
                        accountType={item.accountType}
                        customerType={item.customerType}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        ID={item.ID as number}
                    />
                )
            })}
        </div>
    ) : (
        <div className="font-dana-black text-3xl dark:text-white flex justify-center items-center">
            <p>موردی یافت نشد</p>
        </div>
    )
}
