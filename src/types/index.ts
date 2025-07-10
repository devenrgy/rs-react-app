export type Photo = {
	id: string
	slug: string
	width: number
	height: number
	color: string
	blur_hash: string
	description: string | null
	alt_description: string
	likes: number
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		small_s3: string
		thumb: string
	}
}

export type SearchPhotosResponse = {
	results: Photo[]
	total: number
	total_pages: number
}
