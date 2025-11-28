import { Link } from '@tanstack/react-router'
import React from 'react'
import { Diamonds } from '@icon-park/react'

export const Navbar = () => {
	return <div className='bg-white border-primary border-t-4 shadow-sm mb-6'>
		<div className="container m-auto h-16 flex items-center gap-6">
			<Link to='/' className="text-primary flex items-center gap-1">
				<Diamonds theme="outline" size="24" />
				<span className="uppercase">
					houdunren.com</span>
			</Link>
			<Link to='/front'>my blog</Link>
			<Link to='/feature'>React feature</Link>
			<Link to='/front/live'>time schedule</Link>
		</div>
	</div>
}