import { ICategory } from "./category.interface"
import { IColor } from "./color.interface"
import { IReview } from "./review.interface"
import { IStore } from "./store.inteface"

export interface IProduct {
	id: string
	name: string
	description: string
	price: number
	images: string[]
	category: ICategory
	rewiews: IReview[]
	color: IColor
	store: IStore
}

export interface IProductInput {
	name: string
	description: string
	price: number
	images: string[]
	categoryId: string
	colorId: string
}
