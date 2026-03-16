import { useRouter } from 'next/navigation'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/form-elements/button'

import { SERVER_URL } from '../config/api.config'

import styles from './auth.module.scss'

export function Social() {
	const router = useRouter()
	return (
		<div className={`${styles.social} mt-5 space-y-3`}>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FcGoogle />
				<span>Google</span>
			</Button>
			<Button
				variant='outline'
				onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
			>
				<FaYandex color='#FC3F10' />
				<span>Yandex</span>
			</Button>
		</div>
	)
}
