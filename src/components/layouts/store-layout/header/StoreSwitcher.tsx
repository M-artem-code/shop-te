'use client'

import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { IStore } from '@/app/shared/types/store.inteface'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command'
import { CreateStoreModule } from '@/components/ui/modals/CreateStoreModal'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

interface StoreSwitchProps {
	items: IStore[]
}

export const StoreSwitch = ({ items }: StoreSwitchProps) => {
	const router = useRouter()

	const [isOpen, setIsOpen] = useState(false)

	const onStoreSelect = (store: IStore) => {
		setIsOpen(false)
		router.push(`/stores/${store.id}`)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger>
				<Button
					variant='outline'
					size='sm'
					role='combobox'
					aria-label='Выберите магазин'
					aria-expanded={isOpen}
					className='w-50'
				>
					<StoreIcon className='mr-2 size-4' />
					Текущий магазин
					<ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Command>
					<CommandList>
						<CommandInput placeholder='Найти магазин' />
						<CommandEmpty>Нечего не найдено.</CommandEmpty>
						<CommandGroup heading='Магазины'>
							{items.map(item => (
								<CommandItem
									key={item.id}
									onSelect={() => onStoreSelect(item)}
									className='text-sm'
								>
									<StoreIcon className='mr-2 size-4' />
									<div className='line-clamp-1'>
										{item.title}
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList  className='mt-3'>
						<CommandGroup>
                            <CreateStoreModule>
                                <CommandItem >
                                    <Plus className='mr-2 size-4' />
                                    <div className='line-clamp-1'>
                                        Создать магазин
                                    </div>
                                </CommandItem>
                            </CreateStoreModule>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
