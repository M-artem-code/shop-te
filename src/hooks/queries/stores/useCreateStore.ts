import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/app/config/url.config'
import { IStoreCreate } from '@/app/shared/types/store.inteface'

import { storeService } from '@/services/store.service'

export function useCreateStore() {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create-store'],
		mutationFn: (data: IStoreCreate) => storeService.create(data),
		onSuccess(store) {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Store created successfully')
			router.push(STORE_URL.home(store.id))
		},
		onError() {
			toast.error('Error creating store')
		}
	})

	return useMemo(
		() => ({ createStore, isLoadingCreate }),
		[createStore, isLoadingCreate]
	)
}
