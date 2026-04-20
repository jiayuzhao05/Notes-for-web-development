import type {HTMLAttributes,ReactNode} from 'react'
export type ContainerDirection = 'horizontal' | 'vertical'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
    direction?: ContainerDirection
    chidlren?: ReactNode
}

