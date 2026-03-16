import { PropsWithChildren } from 'react'

import styles from './StoreLayout.module.scss'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'
import { cn } from '@/lib/utils'

export function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className={cn(`${styles.wrapper}`)}>
			<div className={cn(`${styles.layout}`)}>
				<div
					className={cn(
						`${styles.sidebar} inset-y-0 z-[50] md:flex w-64 hidden`
					)}
				>
					<Sidebar />
				</div>
				<div
					className={cn(
						`${styles.header} fixed w-full h-[70px] md:pl-64 inset-y-0 z-[49]`
					)}
				>
					<Header />
				</div>
				<main className={cn(`md:pl-64 py-[70px] bg-white`)}>
					{children}
				</main>
			</div>
		</div>
	)
}
