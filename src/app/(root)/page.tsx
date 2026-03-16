import type { Metadata } from 'next'

import { Home } from './Home'

export const metadata: Metadata = {
	title: 'Шоппинг'
}

export default function HomePage() {
	return <Home />
}
