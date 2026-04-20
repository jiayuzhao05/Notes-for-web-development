import {forwardRef,Children,isValidElement} from 'react'
import type {ContainerProps} from './types'
import './container.css'

const Container = forwardRef<HTMLDivElement, ContainerProps>((props,ref)=>{
    const {direction,children,className = '',...rest} = props

    const isVertical = 
         direction === 'vertical'
            ? true
            : direction == 'horizontal'
            ?false
            : Children.toArray(children).some(
                (child)=>
                    isValidElement(child) && 
                (
                (child.type as {displayName?: string})?.displayName === 'Header' ||
                (child.type as {displayName?: string})?.displayName === 'Footer'
            ))

            return (
                <div 
                    ref={ref}
                    {...rest}
                    className={`el-container ${isVertical ? 'is-vertical' : ''} ${className}`}
                >
    {children}</div>
)
})

Container.displayName = 'Container'
export default Container


