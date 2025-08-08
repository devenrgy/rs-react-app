import { useSuspenseQuery } from '@tanstack/react-query'

import { getPhotoByIdQuery } from '../api/requests/get-photo-by-id'

export const usePhotoDetails = (id: string) => {
	const { data } = useSuspenseQuery(getPhotoByIdQuery(id))
	return data
}
