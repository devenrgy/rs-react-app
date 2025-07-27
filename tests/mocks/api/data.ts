import type {
	Breadcrumb,
	Collection,
	Photo,
	PhotoLinks,
	SearchPhotosResponse,
	Sponsorship,
	TopicSubmissions,
	User
} from '@/types'

export const mockCollection: Collection = {
	id: 'coll_123',
	title: 'Nature Landscapes',
	description: 'A collection of stunning nature photos',
	published_at: '2025-01-01T12:00:00Z',
	updated_at: '2025-07-01T12:00:00Z',
	curated: true,
	featured: false,
	total_photos: 50,
	private: false,
	share_key: 'abc123'
}

export const mockBreadcrumb: Breadcrumb = {
	slug: 'nature',
	title: 'Nature',
	index: 0,
	type: 'landing_page'
}

export const mockUser: User = {
	id: 'user_456',
	username: 'john_doe',
	name: 'John Doe',
	first_name: 'John',
	last_name: 'Doe',
	bio: 'Amateur photographer capturing the beauty of the world',
	location: 'New York, NY',
	portfolio_url: 'https://johndoe.com',
	instagram_username: 'john_doe_photos',
	twitter_username: 'john_doe',
	total_collections: 10,
	total_likes: 200,
	total_photos: 150,
	total_promoted_photos: 5,
	accepted_tos: true,
	for_hire: true,
	profile_image: {
		small: 'https://example.com/profile/small.jpg',
		medium: 'https://example.com/profile/medium.jpg',
		large: 'https://example.com/profile/large.jpg'
	},
	links: {
		self: 'https://api.example.com/users/john_doe',
		html: 'https://example.com/john_doe',
		photos: 'https://api.example.com/users/john_doe/photos',
		likes: 'https://api.example.com/users/john_doe/likes',
		portfolio: 'https://johndoe.com'
	},
	social: {
		instagram_username: 'john_doe_photos',
		portfolio_url: 'https://johndoe.com',
		twitter_username: 'john_doe',
		paypal_email: null
	}
}

export const mockPhotoLinks: PhotoLinks = {
	self: 'https://api.example.com/photos/photo_789',
	html: 'https://example.com/photos/photo_789',
	download: 'https://example.com/photos/photo_789/download',
	download_location: 'https://api.example.com/photos/photo_789/download_location'
}

export const mockSponsorship: Sponsorship = {
	impression_urls: ['https://example.com/sponsor/impression1', 'https://example.com/sponsor/impression2'],
	tagline: 'Sponsored by Example Brand',
	tagline_url: 'https://example.com',
	sponsor: mockUser
}

export const mockTopicSubmissions: TopicSubmissions = {
	travel: {
		status: 'approved',
		approved_on: '2025-06-01T12:00:00Z'
	}
}

export const mockPhoto: Photo = {
	id: 'photo_789',
	slug: 'beautiful-landscape',
	created_at: '2025-02-01T10:00:00Z',
	updated_at: '2025-07-01T10:00:00Z',
	promoted_at: '2025-02-02T12:00:00Z',
	width: 1920,
	height: 1080,
	color: '#40C4FF',
	blur_hash: 'L9D#k@of00R*~qWBRjRj00M{xuWC',
	description: 'A stunning mountain landscape at sunset',
	alt_description: 'mountain landscape at sunset',
	urls: {
		raw: 'https://example.com/photos/photo_789/raw',
		full: 'https://example.com/photos/photo_789/full',
		regular: 'https://example.com/photos/photo_789/regular',
		small: 'https://example.com/photos/photo_789/small',
		thumb: 'https://example.com/photos/photo_789/thumb',
		small_s3: 'https://s3.example.com/photos/photo_789/small'
	},
	links: mockPhotoLinks,
	likes: 150,
	liked_by_user: false,
	current_user_collections: [mockCollection],
	sponsorship: mockSponsorship,
	topic_submissions: mockTopicSubmissions,
	user: mockUser,
	breadcrumbs: [mockBreadcrumb],
	asset_type: 'photo',
	alternative_slugs: {
		en: 'beautiful-landscape',
		es: 'paisaje-hermoso',
		ja: '美しい風景',
		fr: 'paysage-magnifique',
		it: 'paesaggio-bellissimo',
		ko: '아름다운-풍경',
		de: 'wunderschöne-landschaft',
		pt: 'paisagem-linda',
		id: 'pemandangan-indah'
	}
}

export const mockPhoto2: Photo = {
	id: 'photo_456',
	slug: 'ocean-waves',
	created_at: '2025-03-15T14:30:00Z',
	updated_at: '2025-07-20T09:00:00Z',
	promoted_at: null,
	width: 2560,
	height: 1440,
	color: '#0288D1',
	blur_hash: 'L5H2#7t7M{j[00WBaxof00R*xuRj',
	description: 'Waves crashing on a rocky shore',
	alt_description: 'ocean waves on rocky shore',
	urls: {
		raw: 'https://example.com/photos/photo_456/raw',
		full: 'https://example.com/photos/photo_456/full',
		regular: 'https://example.com/photos/photo_456/regular',
		small: 'https://example.com/photos/photo_456/small',
		thumb: 'https://example.com/photos/photo_456/thumb',
		small_s3: 'https://s3.example.com/photos/photo_456/small'
	},
	links: {
		self: 'https://api.example.com/photos/photo_456',
		html: 'https://example.com/photos/photo_456',
		download: 'https://example.com/photos/photo_456/download',
		download_location: 'https://api.example.com/photos/photo_456/download_location'
	},
	likes: 85,
	liked_by_user: true,
	current_user_collections: [],
	sponsorship: {
		impression_urls: ['https://example.com/sponsor/impression3'],
		tagline: 'Sponsored by Coastal Brand',
		tagline_url: 'https://coastalbrand.com',
		sponsor: mockUser
	},
	topic_submissions: {
		travel: {
			status: 'pending',
			approved_on: ''
		}
	},
	user: mockUser,
	breadcrumbs: [mockBreadcrumb],
	asset_type: 'photo',
	alternative_slugs: {
		en: 'ocean-waves',
		es: 'olas-del-oceano',
		ja: '海の波',
		fr: 'vagues-de-locean',
		it: 'onde-delloceano',
		ko: '바다-파도',
		de: 'ozeanwellen',
		pt: 'ondas-do-oceano',
		id: 'ombak-laut'
	}
}

export const mockSearchPhotosResponse: SearchPhotosResponse = {
	total: 100,
	total_pages: 10,
	results: [mockPhoto, mockPhoto2]
}
