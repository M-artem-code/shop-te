import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/app/config/api.config'
import {
	IStore,
	IStoreCreate,
	IStoreEdit
} from '@/app/shared/types/store.inteface'

class StoreService {
	async getAllStores() {
		const { data } = await axiosClassic<IStore[]>({
			url: API_URL.stores(),
			method: 'GET'
		})

		return data
	}

	async getById(id: string) {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/by-id/${id}`),
			method: 'GET'
		})

		return data
	}
	async create(data: IStoreCreate) {
		const { data: createdStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/create`),
			method: 'POST',
			data
		})

		return createdStore
	}

	async update(id: string, data: IStoreEdit) {
		const { data: updatedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/${id}`),
			method: 'PATCH',
			data
		})

		return updatedStore
	}

	async delete(id: string) {
		const { data: deletedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`/${id}`),
			method: 'DELETE'
		})

		return deletedStore
	}
}

export const storeService = new StoreService()
