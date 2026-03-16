'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: PropsWithChildren) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false
					}
				}
			}),
		[]
	)

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			{children}
		</QueryClientProvider>
	)
}
