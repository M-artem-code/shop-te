import { Logo } from '../../main-layout/header/logo/logo'

import { Navigation } from './navigation/Navigation'
import styles from './sidebar.module.scss'
import { cn } from '@/lib/utils'

export function Sidebar() {
	return (
		<div
			className={cn(
				styles.sidebar,
				` my-1 pt-4 px-5 border-r bg-neutral-50 overflow-y-auto `
			)}
		>
			<Logo />
			<Navigation />
		</div>
	)
}
