import { z } from 'zod'

const AlternativeSlugsSchema = z.object({
	en: z.string(),
	es: z.string(),
	ja: z.string(),
	fr: z.string(),
	it: z.string(),
	ko: z.string(),
	de: z.string(),
	pt: z.string(),
	id: z.string(),
})

const UrlsSchema = z.object({
	raw: z.url(),
	full: z.url(),
	regular: z.url(),
	small: z.url(),
	thumb: z.url(),
	small_s3: z.url(),
})

const LinksSchema = z.object({
	self: z.url(),
	html: z.url(),
	download: z.url().optional(),
	download_location: z.url().optional(),
})

const ProfileImageSchema = z.object({
	small: z.string(),
	medium: z.string(),
	large: z.string(),
})

const SocialSchema = z.object({
	instagram_username: z.string().nullable(),
	portfolio_url: z.string().nullable(),
	twitter_username: z.string().nullable(),
	paypal_email: z.string().nullable(),
})

const UserSchema = z.object({
	id: z.string(),
	updated_at: z.string(),
	username: z.string(),
	name: z.string(),
	first_name: z.string(),
	last_name: z.string().nullable(),
	twitter_username: z.string().nullable(),
	portfolio_url: z.string().nullable(),
	bio: z.string().nullable(),
	location: z.string().nullable(),
	links: LinksSchema,
	profile_image: ProfileImageSchema,
	instagram_username: z.string().nullable(),
	total_collections: z.number(),
	total_likes: z.number(),
	total_photos: z.number(),
	total_promoted_photos: z.number(),
	total_illustrations: z.number(),
	total_promoted_illustrations: z.number(),
	accepted_tos: z.boolean(),
	for_hire: z.boolean(),
	social: SocialSchema,
})

const SponsorshipSchema = z.object({
	impression_urls: z.array(z.string()).nullable(),
	tagline: z.string(),
	tagline_url: z.string(),
	sponsor: UserSchema,
})

const PositionSchema = z.object({
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
})

const LocationSchema = z.object({
	name: z.string().nullable(),
	city: z.string().nullable(),
	country: z.string().nullable(),
	position: PositionSchema,
})

const ExifSchema = z.object({
	make: z.string().nullable(),
	model: z.string().nullable(),
	name: z.string().nullable(),
	exposure_time: z.string().nullable(),
	aperture: z.string().nullable(),
	focal_length: z.string().nullable(),
	iso: z.number().nullable(),
})

const MetaSchema = z.object({
	index: z.boolean(),
})

const PreviewPhotoSchema = z.object({
	id: z.string(),
	slug: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
	blur_hash: z.string(),
	asset_type: z.string(),
	urls: UrlsSchema,
})

const RelatedCollectionLinksSchema = z.object({
	self: z.string(),
	html: z.string(),
	photos: z.string(),
	related: z.string(),
})

const RelatedCollectionSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	published_at: z.string(),
	last_collected_at: z.string(),
	updated_at: z.string(),
	featured: z.boolean(),
	total_photos: z.number(),
	private: z.boolean(),
	share_key: z.string(),
	links: RelatedCollectionLinksSchema,
	user: UserSchema,
	cover_photo: z.any(),
	preview_photos: z.array(PreviewPhotoSchema),
})

const RelatedCollectionsSchema = z.object({
	total: z.number(),
	type: z.string(),
	results: z.array(RelatedCollectionSchema),
})

const CollectionSchema = z.object({
	id: z.union([z.number(), z.string()]),
	title: z.string(),
	published_at: z.string(),
	last_collected_at: z.string(),
	updated_at: z.string(),
	cover_photo: z.any(),
	user: UserSchema.nullable(),
})

const PhotoSchema = z.object({
	id: z.string(),
	slug: z.string(),
	alternative_slugs: AlternativeSlugsSchema,
	created_at: z.string(),
	updated_at: z.string(),
	promoted_at: z.string().nullable(),
	width: z.number(),
	height: z.number(),
	color: z.string(),
	blur_hash: z.string(),
	description: z.string().nullable(),
	alt_description: z.string(),
	breadcrumbs: z.array(z.unknown()),
	urls: UrlsSchema,
	links: LinksSchema,
	likes: z.number(),
	liked_by_user: z.boolean(),
	current_user_collections: z.array(CollectionSchema),
	sponsorship: SponsorshipSchema.nullable(),
	topic_submissions: z.unknown(),
	asset_type: z.string(),
	user: UserSchema,
})

const PhotoByIdSchema = z.object({
	...PhotoSchema.shape,
	exif: ExifSchema,
	location: LocationSchema.nullable(),
	meta: MetaSchema,
	public_domain: z.boolean(),
	tags: z.array(z.unknown()),
	views: z.number(),
	downloads: z.number(),
	topics: z.array(z.unknown()),
	related_collections: RelatedCollectionsSchema,
})

const PhotoByIdResponseSchema = PhotoByIdSchema

const PhotosResponseSchema = z.array(PhotoSchema)

const SearchPhotosResponseSchema = z.object({
	total: z.number(),
	total_pages: z.number(),
	results: PhotosResponseSchema,
})

export {
	PhotoByIdResponseSchema,
	PhotosResponseSchema,
	SearchPhotosResponseSchema,
}
