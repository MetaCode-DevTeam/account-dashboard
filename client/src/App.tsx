import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import SignUp from './pages/signUp/SignUp'
import Login from './pages/login/Login'
import { Dashboard } from './pages/dashboard/Dashboard'
import AddCustomer from './pages/addCustomer/AddCustomer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ShowAllUsers from './pages/showAllUser/ShowAllUsers'
import ShowCustomer from './pages/showCustomer/ShowCustomer'
import Landing from './pages/landing/Landing'
import NotFount from './pages/notFound/NotFount'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="select-none font-dana" onContextMenu={() => {}}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<SignUp />} path="/sign-up" />
                        <Route element={<Login />} path="/login" />
                        <Route
                            element={
                                <section className="font-dana text-lg" dir="rtl">
                                    <Outlet />
                                </section>
                            }
                            path="/"
                        >
                            <Route element={<Landing />} path="" />
                        </Route>

                        <Route element={<Layout />} path="/dashboard">
                            <Route element={<Dashboard />} path="debtor" />
                            <Route element={<Dashboard />} path="creditor" />
                            <Route element={<AddCustomer />} path="add-new-customer" />
                            <Route element={<ShowAllUsers />} path="users" />
                            <Route element={<ShowCustomer />} path="customers/:id" />
                        </Route>

                        <Route path="*" element={<NotFount />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    )
}

export default App
