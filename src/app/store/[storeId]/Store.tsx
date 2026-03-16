import { Heading } from '@/components/ui/heading'

import styles from './Store.module.scss'

export function Store() {
	return (
		<div className={`${styles.wrapper}, p-6`}>
			<Heading title='Статистика' />
		</div>
	)
}
