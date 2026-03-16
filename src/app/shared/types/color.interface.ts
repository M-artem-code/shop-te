export interface IColor {
	id: string
	name: string
	value: string
	storeId: string
	createdAt: Date
}

export interface IColorInput extends Pick<IColor, 'name' | 'value'> {}
