import type { PropsWithChildren } from 'react'

import { StoreLayout } from '@/components/layouts/store-layout/storeLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <StoreLayout>{children}</StoreLayout>
}
