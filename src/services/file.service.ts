import { axiosWithAuth } from '@/api/api.interceptors'

interface IFile {
	url: string
	name: string
}

class FileService {
	async upload(file: IFile, folder?: string) {
		const { data } = await axiosWithAuth<IFile[]>({
			url: `/files`,
			method: 'POST',
			data: file,
			params: { folder },
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		return data
	}
}

export const fileService = new FileService()
