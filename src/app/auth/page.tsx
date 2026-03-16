import type { Metadata } from 'next'
import { Auth } from './auth'

export const metadata: Metadata = {
	title: 'Auth'
}

export default function AuthPage() {
	return <Auth />
}
