import { useState } from 'react'
import { PiEyeClosedThin, PiEyeThin } from 'react-icons/pi'

type InputProps = {
    type: 'text' | 'password' | 'number' | 'tel' | 'textarea' // انواع جدید اضافه شد
    placeholder: string
}

export default function InputPrime({ type, placeholder, ...rest }: InputProps) {
    const [showPass, setShowPass] = useState(false)

    function toggleState() {
        setShowPass((p) => !p)
    }

    return (
        <>
            {type == 'textarea' ? (
                <>
                    <span className="text-xs font-dana dark:text-[#5B5774] -top-2.5 px-2 bg-white dark:bg-background-secondary-dark truncate w-fit absolute">
                        {placeholder}
                    </span>
                    <textarea className="outline-0 size-full p-2" {...rest}></textarea>
                </>
            ) : (
                <>
                    <span className="text-xs font-dana dark:text-[#5B5774] -top-2.5 px-2 bg-background-secondary-light dark:bg-background-secondary-dark truncate w-fit absolute">
                        {placeholder}
                    </span>
                    <input
                        type={type === 'password' ? (showPass ? 'text' : type) : type}
                        step={type === 'number' ? 'any' : ''}
                        className="w-full text-xs font-dana outline-0"
                        {...rest}
                    />
                    {type === 'password' &&
                        (showPass ? (
                            <button type="button" onClick={toggleState}>
                                <PiEyeThin className="text-xl" />
                            </button>
                        ) : (
                            <button type="button" onClick={toggleState}>
                                <PiEyeClosedThin className="text-xl" />
                            </button>
                        ))}
                </>
            )}
        </>
    )
}
