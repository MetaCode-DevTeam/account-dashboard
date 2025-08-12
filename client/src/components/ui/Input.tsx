import { useState } from 'react'
import { PiEyeClosedThin, PiEyeThin } from 'react-icons/pi'

type inputType = {
    type: 'password' | 'text'
    placeholder: string
}

export default function Input({ type, placeholder, ...rest }: inputType) {
    const [showPass, setShowPass] = useState(false)

    function toggleState() {
        setShowPass((p) => !p)
    }

    return (
        <>
            <input
                {...rest}
                type={type === 'password' ? (showPass ? 'text' : type) : type}
                placeholder={placeholder}
                className="w-full text-xs font-dana outline-0"
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
    )
}
