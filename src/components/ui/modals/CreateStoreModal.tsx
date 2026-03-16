'use client'

import { type PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IStoreCreate } from '@/app/shared/types/store.inteface'

import { useCreateStore } from '@/hooks/queries/stores/useCreateStore'

import { Button } from '../button'
import { Input } from '../form-elements/input'
import { Label } from '../form-elements/label'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../dialog'

export function CreateStoreModule({ children }: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false)

	const { createStore, isLoadingCreate } = useCreateStore()

	const form = useForm<IStoreCreate>({
		mode: 'onChange'
	})

	const onSubmit = (data: IStoreCreate) => {
		createStore(data)
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='w-full'>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание магазина</DialogTitle>
					<DialogDescription>
						Для создания магазина необходимо ввести название
						магазина
					</DialogDescription>
				</DialogHeader>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className='space-y-2'>
						<Label htmlFor='title'>Название магазина</Label>
						<Input
							id='title'
							placeholder='Введите название'
							{...form.register('title', {
								required: 'Название обязательно',
								minLength: {
									value: 3,
									message: 'Минимум 3 символа'
								}
							})}
						/>
						{form.formState.errors.title && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.title.message}
							</p>
						)}
					</div>
					<div className='flex justify-end'>
						<Button
							type='submit'
							variant='primary'
							disabled={isLoadingCreate}
						>
							Создать
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
