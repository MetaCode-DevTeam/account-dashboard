import { PiSignIn, PiTextAlignJustify } from 'react-icons/pi'
import Button from '../../ui/buttons/Button'
import Logo from '../../ui/Logo'
import { NavLink } from 'react-router-dom'
import SideBar from '../sideBar/SideBar'
import { dataSidebarLanding } from '../../../typesAndConsts/consts'
import { useStoreHook } from '../../../hooks/store/stateManagement'

export const LandingHeader = () => {
    const toggleIsShow = useStoreHook((state) => state.toggleIsShow)
    // const closeSidebar = useStoreHook((state) => state.closeSidebar)
    return (
        <>
            <div className="" dir="ltr">
                <SideBar dataSidebar={dataSidebarLanding} isOpen={false} />
            </div>

            <div className="flex justify-center items-center  fixed z-[99999999] w-full md:p-5 bg-gradient-to-b from-background-light  from-20% to-70% to-white/0">
                <div className="w-full bg-white md:rounded-2xl  shadow shadow-black shadow/35 max-w-laptop h-20 flex justify-between px-10 items-center">
                    <div className="">
                        <Logo />
                    </div>
                    <div className="max-md:hidden">
                        <ul className="flex justify-center items-center gap-2 text-sm">
                            <li className="px-4 py-[9px]">
                                <NavLink
                                    to={'/'}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? 'text-primary-dark w-full block'
                                            : isPending
                                              ? 'pl-4 p-3 rounded-r-full w-full block'
                                              : 'pl-4 p-3 rounded-r-full w-full block'
                                    }
                                >
                                    خانه
                                </NavLink>
                            </li>
                            <li className="px-4 py-[9px]">
                                <NavLink
                                    to={'/dashboard'}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? 'text-primary-dark w-full block'
                                            : isPending
                                              ? 'pl-4 p-3 rounded-r-full w-full block'
                                              : 'pl-4 p-3 rounded-r-full w-full block'
                                    }
                                >
                                    داشبورد
                                </NavLink>
                            </li>
                            <li className="px-4 py-[9px]">
                                <NavLink
                                    to={'/about-us'}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? 'text-primary-dark w-full block'
                                            : isPending
                                              ? 'pl-4 p-3 rounded-r-full w-full block'
                                              : 'pl-4 p-3 rounded-r-full w-full block'
                                    }
                                >
                                    درباره ما
                                </NavLink>
                            </li>
                            <li className="px-4 py-[9px]">
                                <NavLink
                                    to={'/contact-us'}
                                    className={({ isActive, isPending }) =>
                                        isActive
                                            ? 'text-primary-dark w-full block'
                                            : isPending
                                              ? 'pl-4 p-3 rounded-r-full w-full block'
                                              : 'pl-4 p-3 rounded-r-full w-full block'
                                    }
                                >
                                    تماس با ما
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="max-md:hidden">
                        <div className="">
                            <Button
                                text={
                                    <div className="flex justify-center items-center gap-3">
                                        <span>
                                            <PiSignIn className="text-2xl" />
                                        </span>
                                        ورود
                                    </div>
                                }
                                color="black"
                                size="sm"
                                typeBtn="contained"
                                types="button"
                                classNameProps="rounded-2xl"
                            />
                        </div>
                    </div>

                    <div className="md:hidden">
                        <div className="">
                            <button onClick={toggleIsShow}>
                                <PiTextAlignJustify className="text-2xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
