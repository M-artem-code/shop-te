export interface ICategory {
	id: string
	title: string
	description: string
	storeId: string
	createdAt: Date
}

export interface ICategoryInput extends Pick<ICategory, 'title' | 'description'> {}
