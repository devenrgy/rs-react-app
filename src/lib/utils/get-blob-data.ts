import type { DownloadData } from '@/types'

import { convertToCSV } from './convert-to-csv'

export function getBlobData<T extends Record<string, unknown>>(
	data: DownloadData<T>,
	format: string,
	onCreateBlob?: (data: DownloadData<T>, format: string) => Blob
): Blob {
	if (onCreateBlob) {
		return onCreateBlob(data, format)
	}

	if (Array.isArray(data)) {
		const csvString = convertToCSV(data)
		return new Blob([csvString], { type: format })
	}

	return new Blob([data as BlobPart], { type: format })
}
