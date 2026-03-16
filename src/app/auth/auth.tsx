'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/form-elements/button'

import { Social } from './Social'
import styles from './auth.module.scss'
import { AuthFields } from './authFields'
import { useAuthForm } from './useAuthForm'

export function Auth() {
	const [isReg, setIsReg] = useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isReg)

	return (
		<div className={`${styles.wrapper} grid-cols-1 lg:grid-cols-2`}>
			<div className={`${styles.left} hidden lg:flex bg-blue-600`}>
				<Image
					src='images/auth.svg'
					alt='Auth'
					width={100}
					height={100}
				/>
			</div>
			<div className={`${styles.right} `}>
				<Card className={`${styles.card} p-6  `}>
					<CardHeader
						className={`${styles.header} p-5 flex flex-col items-center justify-center py-4 `}
					>
						<CardTitle>
							{isReg ? 'Зарегистрируйтесь' : 'Войдите'}
						</CardTitle>
					</CardHeader>
					<CardContent className={`${styles.content} p-0 `}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<AuthFields
								form={form}
								isPending={isPending}
								isReg={isReg}
							/>

							<Button disabled={isPending}>Продолжить</Button>
						</form>
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
						<Button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Войти' : 'Зарегистрироваться'}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
