export type Photo = {
	id: string
	width: number
	height: number
	alt_description: string
	urls: {
		regular: string
	}
}

export type SearchPhotosResponse = {
	results: Photo[]
	total: number
	total_pages: number
}
