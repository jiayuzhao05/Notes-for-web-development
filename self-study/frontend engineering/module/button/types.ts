import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: ButtonType // 有？是optional 可以传，也可以不传
    size?: ButtonSize
    plain?: boolean
    round?: boolean
    circle?: boolean
    disabled?: boolean
    autoFocus?: boolean
    nativeType?: NativeType
    children?: ReactNode
}

export const defaultButtonProps: Partial<ButtonProps> = {
    type: 'primary',
    size: 'medium',
    plain: false,
    round: false,
    circle: false,
    disabled: false,
    autoFocus: false,
    nativeType: 'button',
}
