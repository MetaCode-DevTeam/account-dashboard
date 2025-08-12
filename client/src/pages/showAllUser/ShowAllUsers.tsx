import UserCard from '../../components/ui/UserCard'
import { useEffect } from 'react'
import { useGetUsers } from '../../hooks/query/queries'

export default function ShowAllUsers() {
    const { data, isError, isLoading, error } = useGetUsers()

    useEffect(() => {
        console.log(data, isError)
    })

    if (isError) {
        if (error.response?.status === 403) {
            return <div className="mt-4">شما اجازه دسترسی به این بخش را ندارید.</div>
        }
        return <div className="mt-4">خطایی رخ داده است.</div>
    }

    if (isLoading) {
        return <div className="mt-4">درحال دریافت اطلاعات ....</div>
    }
    return (
        <div className="mt-4 pb-4 justify-center items-center justify-items-center *:grow grid grid-cols-2 max-md:grid-cols-1 gap-7">
            {data?.map((item) => (
                <UserCard
                    key={item.ID}
                    username={item.username}
                    createAt={item.CreatedAt}
                    email={item.email}
                    role={item.role}
                />
            ))}
        </div>
    )
}
