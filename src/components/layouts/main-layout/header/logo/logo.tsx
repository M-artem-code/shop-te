import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/app/config/url.config'

import { SITE_NAME } from '@/constants/seo.constants'

import styles from './logo.module.scss'

export function Logo() {
	return (
		<Link href={PUBLIC_URL.home()} className={`${styles.logo} gap-2`}>
			<Image
				src='/images/logo.svg'
				alt={SITE_NAME}
				width={25}
				height={35}
			/>
			<div className='text-xl text-blue-600 font-bold'>{SITE_NAME}</div>
		</Link>
	)
}
