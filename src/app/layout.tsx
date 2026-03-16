import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

import './globals.css'
import { Providers } from './providers'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className={cn("font-sans", geist.variable)}>
			<body className={GeistSans.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
