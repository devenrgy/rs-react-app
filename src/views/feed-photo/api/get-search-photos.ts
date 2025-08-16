import { http } from '@/shared/api'

export const getSearchPhotos = async ({ query, page }: { query: string, page: number }) => http('/search/photos', { query: { query, page } })
