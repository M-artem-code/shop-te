'use client'

import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_URL } from '@/app/config/url.config'

import { Loader } from '@/components/ui/loader'

import { useProfile } from '@/hooks/useProfile'

import { MobileSidebar } from '../sidebar/navigation/mobileSidebar'

import { StoreSwitch } from './StoreSwitcher'
import styles from './header.module.scss'

export function Header() {
	const { user, isLoading } = useProfile()

	return (
		<div
			className={`${styles.header} flex items-center border-b p-6 gap-x-4 h-full bg-white`}
		>
			<MobileSidebar />
			<div
				className={`${styles.header_menu}, flex items-center gap-x-4 ml-auto`}
			>
				{isLoading ? (
					<div>
						<Loader size='sm' />
					</div>
				) : (
					user && (
						<>
							<StoreSwitch items={user.stores} />
							<Link href={DASHBOARD_URL.home()}>
								<Image
									src={user.picture}
									alt={user.name}
									width={50}
									height={50}
								/>
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}
