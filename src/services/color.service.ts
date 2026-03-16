import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/app/config/api.config'
import { IColor, IColorInput } from '@/app/shared/types/color.interface'

class ColorService {
	async getByStoreId(storeId: string) {
		const { data } = await axiosWithAuth<IColor[]>({
			url: API_URL.colors(`/by-storeId/${storeId}`),
			method: 'GET'
		})

		return data
	}

	async getById(id: string) {
		const { data } = await axiosClassic<IColor>({
			url: API_URL.colors(`/by-id/${id}`),
			method: 'GET'
		})

		return data
	}
	async create(data: IColorInput, storeId: string) {
		const { data: createdColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors(`/${storeId}`),
			method: 'POST',
			data
		})

		return createdColor
	}

	async update(id: string, data: IColorInput) {
		const { data: updatedColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors(`/${id}`),
			method: 'PATCH',
			data
		})

		return updatedColor
	}

	async delete(id: string) {
		const { data: deletedColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors(`/${id}`),
			method: 'DELETE'
		})

		return deletedColor
	}
}

export const colorService = new ColorService()
