import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/app/config/api.config'
import {
	EnumOrderStatus,
	IPaymentResponse
} from '@/app/shared/types/order.interface'

interface OrderDto {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
		storeId: string
	}
}
class OrderService {
	async checkout(data: OrderDto) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/place'),
			method: 'POST',
			data
		})
	}
}

export const orderService = new OrderService()
