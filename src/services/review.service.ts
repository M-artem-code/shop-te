import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/app/config/api.config'

interface ReviewDto {
	text: string
	rating: number
}

class ReviewService {
	async getByStoreId(storeId: string) {
		const { data } = await axiosClassic({
			url: API_URL.reviews(`/by-storeId/${storeId}`),
			method: 'GET'
		})
		return data || []
	}

	async create(dto: ReviewDto, productId: string, storeId: string) {
		const { data } = await axiosWithAuth({
			url: API_URL.reviews(`/${productId}/${storeId}`),
			method: 'POST',
			data: dto
		})
		return data
	}

	async delete(id: string) {
		const { data } = await axiosWithAuth({
			url: API_URL.reviews(`/${id}`),
			method: 'DELETE'
		})
		return data
	}
}

export const reviewService = new ReviewService()
