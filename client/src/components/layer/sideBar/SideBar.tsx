import { NavLink, useLocation } from 'react-router-dom'
import { useStoreHook } from '../../../hooks/store/stateManagement'
import Logo from '../../ui/Logo'
import { useEffect } from 'react'

export default function SideBar({
    dataSidebar,
    isOpen = true,
}: {
    isOpen?: boolean
    dataSidebar: {
        title: string
        id: number
        url: string
    }[]
}) {
    const isShowSidebar = useStoreHook((state) => state.isShowSidebar)
    const toggleIsShow = useStoreHook((state) => state.toggleIsShow)
    const closeSidebar = useStoreHook((state) => state.closeSidebar)
    const { pathname } = useLocation()

    useEffect(() => {
        closeSidebar()
    }, [pathname])

    return (
        <div
            className={`fixed top-0 shadow left-0 min-w-72 lg:max-w-40 w-full overflow-x-hidden overflow-y-auto h-screen flex flex-col z-[9999999999] max-lg:fixed max-lg:inset-0
                ${isShowSidebar ? 'max-lg:opacity-100 max-lg:z-[9999999999]' : 'max-lg:opacity-0 max-lg:-z-[9999999999] '}
                ${isOpen ? (isShowSidebar ? 'max-lg:opacity-100 max-lg:z-[9999999999]' : 'max-lg:opacity-0 max-lg:-z-[9999999999] ') : isShowSidebar ? 'opacity-100 z-[9999999999] bg-black/80' : 'opacity-0 -z-[9999999999] '}
                max-lg:w-full transition-all duration-300 `}
            onClick={(e) => {
                e.stopPropagation()
                toggleIsShow()
            }}
        >
            <div
                className={`bg-background-light min-w-72 max-w-72 p-4 pl-0 
                    ${isOpen ? (isShowSidebar ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full') : isShowSidebar ? 'translate-x-0' : '-translate-x-full'}
                    
                     transition-all duration-300 dark:bg-background-dark max-lg:shadow shadow-gray-800/50 dark:shadow-gray-600/50 max-lg:w-full h-full`}
                onClick={(e) => e.stopPropagation()}
            >
                <ul className="flex flex-col gap-6 justify-stretch items-start">
                    <li className="my-7 p-10 py-0">
                        <Logo />
                    </li>

                    {dataSidebar.map((item) => (
                        <li key={item.id} className="w-full dark:text-white text-black/70">
                            <NavLink
                                to={item.url}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? 'text-white bg-gradient-to-r from-info-bg to-primary-dark pl-4 p-3 rounded-r-full w-full block'
                                        : isPending
                                          ? 'pl-4 p-3 rounded-r-full w-full block'
                                          : 'pl-4 p-3 rounded-r-full w-full block'
                                }
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
