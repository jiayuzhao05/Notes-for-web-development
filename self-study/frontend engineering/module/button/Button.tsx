import { forwardRef } from 'react'
import type { ForwardedRef } from 'react'
import type {ButtonProps} from './types'

const Button = forwardRef<HTMLButtonElement,ButtonProps>((props,ref)=>{
    const { type='primary',size='medium',children,...rest} = props

    return (
        <button ref={ref} className={`btn btn-${type} btn-${size}`} {...rest}>
            {children}
        </button>
    )
})

Button.displayName = 'Button'
export default Button