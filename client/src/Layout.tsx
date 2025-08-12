import { Outlet } from 'react-router-dom'
import DashboardHeader from './components/layer/header/DashboardHeader'
import SideBar from './components/layer/sideBar/SideBar'
import { dataSidebarDashboard } from './typesAndConsts/consts'

export default function Layout() {
    return (
        <div
            className={`bg-background-light font-morabba dark:bg-background-dark min-h-screen flex dark:text-white max-w-dvw overflow-y-hidden`}
        >
            <SideBar dataSidebar={dataSidebarDashboard} />
            <div className="grow lg:ml-72 ">
                <div className="flex flex-col items-stretch relative ">
                    <DashboardHeader />
                    <div className="mt-20 my-0 resp">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
