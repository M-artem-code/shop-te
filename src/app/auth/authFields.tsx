import { UseFormReturn } from 'react-hook-form'

import { IAuthForm } from '../shared/types/auth.interface'

interface AuthFieldsProps {
	form: UseFormReturn<IAuthForm, any, IAuthForm>
	isPending: boolean
	isReg: boolean
}

export function AuthFields({
	form,
	isPending,
	isReg = false
}: AuthFieldsProps) {
	const {
		register,
		formState: { errors }
	} = form

	return (
		<>
			{/* Поле Имя — только для регистрации */}
			{isReg && (
				<div style={{ marginBottom: 12 }}>
					<input
						placeholder='Имя'
						disabled={isPending}
						{...register('name', { required: 'Имя обязательно' })}
						style={{
							padding: 8,
							border: '1px solid #ccc',
							borderRadius: 4,
							width: '100%'
						}}
					/>
					{errors.name && (
						<p style={{ color: 'red', marginTop: 4 }}>
							{errors.name.message}
						</p>
					)}
				</div>
			)}

			{/* Поле Email */}
			<div style={{ marginBottom: 12 }}>
				<input
					placeholder='Email'
					disabled={isPending}
					{...register('email', {
						required: 'Email обязателен',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Неверный формат email'
						}
					})}
					style={{
						padding: 8,
						border: '1px solid #ccc',
						borderRadius: 4,
						width: '100%'
					}}
				/>
				{errors.email && (
					<p style={{ color: 'red', marginTop: 4 }}>
						{errors.email.message}
					</p>
				)}
			</div>

			{/* Поле Пароль */}
			<div style={{ marginBottom: 12 }}>
				<input
					type='password'
					placeholder='Пароль'
					disabled={isPending}
					{...register('password', { required: 'Пароль обязателен' })}
					style={{
						padding: 8,
						border: '1px solid #ccc',
						borderRadius: 4,
						width: '100%'
					}}
				/>
				{errors.password && (
					<p style={{ color: 'red', marginTop: 4 }}>
						{errors.password.message}
					</p>
				)}
			</div>
		</>
	)
}
