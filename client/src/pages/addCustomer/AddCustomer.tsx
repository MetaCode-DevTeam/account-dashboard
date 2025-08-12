import { Toaster } from 'sonner'
import Form from './Form'

export default function AddCustomer() {
    return (
        <div>
            <div className=" resp w-11/12 mx-auto bg-background-secondary-light shadow-lg font-dana dark:bg-background-secondary-dark py-10 rounded-xl mt-10 mb-4">
                <div className="text-3xl text-background-dark dark:text-background-secondary-light font-morabba text-center mb-14">
                    ثبت اطلاعات کاربر
                </div>

                <Form />

                <Toaster
                    richColors
                    position="top-center"
                    toastOptions={{
                        // در این قسمت کلاس‌های Tailwind را به بخش‌های مختلف اعلان می‌دهیم
                        classNames: {
                            toast: 'font-dana text-xs', // ✅ اعمال کلاس فونت به کل اعلان
                            title: 'font-dana text-xs', // می‌توانید برای عنوان جداگانه تنظیم کنید
                            description: 'font-dana text-xs', // و برای توضیحات
                        },
                    }}
                />
            </div>
        </div>
    )
}
