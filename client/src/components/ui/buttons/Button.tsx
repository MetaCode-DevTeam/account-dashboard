import type { JSX } from 'react'

type buttonType = {
    color: 'info' | 'warning' | 'error' | 'success' | 'primary' | 'secondary' | 'black'
    typeBtn: 'contained' | 'outlined' | 'text'
    text: string | JSX.Element
    types?: 'button' | 'reset' | 'submit'
    size?: 'sm' | 'lg' | ''
    classNameProps?: string
    onClick?: () => void
}
export default function Button({
    typeBtn,
    color,
    text,
    types = 'button',
    size = '',
    classNameProps = '',
    onClick = () => {
        console.log('clicked')
    },
}: buttonType) {
    let className = ''
    switch (color) {
        case 'error':
            className += '  bg-error-main text-error-main border-error-main'
            break
        case 'info':
            className += ' '
            break
        case 'primary':
            className += ' bg-primary-main text-primary-main border-primary-main'
            break
        case 'secondary':
            className += ' bg-secondary-main text-secondary-main border-secondary-main'
            break
        case 'success':
            className += ' bg-success-main text-success-main border-success-main'
            break
        case 'warning':
            className += ' '
            break
        case 'black':
            className += ' bg-black text-white border-black'
            break
    }

    switch (typeBtn) {
        case 'contained':
            className = className + ' !text-white border-0 shadow-lg '
            break
        case 'outlined':
            className = className + ' !text-black !bg-transparent border shadow-lg '
            break
        case 'text':
            className = className + ' border-0 !bg-transparent'
            break
    }

    switch (size) {
        case '':
            break
        case 'sm':
            className =
                className + ' w-[223px] h-[48px] lg:text-[14px] max-lg:w-[168px] max-lg:h-[41px]'
            break
        case 'lg':
            className =
                className +
                ' w-[296px] h-[56px] lg:text-[20px]! text-[16px]! max-lg:w-[223px] max-lg:h-[48px]'
            break
    }

    return (
        <button
            className={`${className} py-2 px-3 rounded text-xs ${classNameProps} `}
            type={types}
            onClick={() => onClick()}
        >
            {text}
        </button>
    )
}
