export type Collection = {
	id: string
	title: string
	description: string | null
	published_at: string
	updated_at: string
	curated: boolean
	featured: boolean
	total_photos: number
	private: boolean
	share_key: string
}

export type Breadcrumb = {
	slug: string
	title: string
	index: number
	type: string
}

export type User = {
	id: string
	username: string
	name: string
	first_name: string
	last_name: string | null
	bio: string
	location: string
	portfolio_url: string
	instagram_username: string
	twitter_username: string
	total_collections: number
	total_likes: number
	total_photos: number
	total_promoted_photos: number
	accepted_tos: boolean
	for_hire: boolean
	profile_image: {
		small: string
		medium: string
		large: string
	}
	links: {
		self: string
		html: string
		photos: string
		likes: string
		portfolio: string
	}
	social: {
		instagram_username: string
		portfolio_url: string
		twitter_username: string
		paypal_email: string | null
	}
}

export type PhotoLinks = {
	self: string
	html: string
	download: string
	download_location: string
}

export type Sponsorship = {
	impression_urls: string[]
	tagline: string
	tagline_url: string
	sponsor: User
}

export type TopicSubmissions = {
	travel?: {
		status: string
		approved_on: string
	}
}

export type Photo = {
	id: string
	slug: string
	created_at: string
	updated_at: string
	promoted_at: string | null
	width: number
	height: number
	color: string
	blur_hash: string
	description: string
	alt_description: string
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		thumb: string
		small_s3: string
	}
	links: PhotoLinks
	likes: number
	liked_by_user: boolean
	current_user_collections: Collection[]
	sponsorship: Sponsorship
	topic_submissions: TopicSubmissions
	user: User
	breadcrumbs: Breadcrumb[]
	asset_type: string
	alternative_slugs: {
		en: string
		es: string
		ja: string
		fr: string
		it: string
		ko: string
		de: string
		pt: string
		id: string
	}
}

export type SearchPhotosResponse = {
	total: number
	total_pages: number
	results: Photo[]
}

export type PhotoResponse = {
	data: Photo
}

export type PhotoErrorResponse = {
	errors: string[]
}

export type PhotoApiResponse = PhotoResponse | PhotoErrorResponse

export type FavoritePhoto = Pick<Photo, 'id' | 'alt_description'> & {
	isFavorite: boolean
}

export type DownloadData<T> = T[] | string | BlobPart
