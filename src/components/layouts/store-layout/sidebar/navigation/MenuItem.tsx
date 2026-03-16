'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './Navigation.module.scss'
import { IMenuItem } from './menu.interface'
import { cn } from '@/lib/utils'

interface MenuItemProps {
	item: IMenuItem
}

export function MenuItem({ item }: MenuItemProps) {
	const pathName = usePathname()

	return (
		<Link
			href={item.link}
			className={cn(
				styles.route,
				{
					[styles.active]: pathName === item.link
				},
				'flex items-center gap-x-3 text-slate-500 text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-blue-200/20 hover:text-blue-500 hover:drop-shadow-sm bg-transparent transition-all duration-200'
			)}
		>
			<item.icon />
			{item.value}
		</Link>
	)
}
