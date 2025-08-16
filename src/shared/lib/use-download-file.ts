import type { MouseEvent } from 'react'

import { useCallback, useEffect, useState } from 'react'
import { getBlobData } from './get-blob-data'

export type DownloadData<T> = T[] | string | BlobPart

type Props<T> = {
	fileName: string
	format: string
	data: DownloadData<T>
	onCreateBlob?: (data: DownloadData<T>, format: string) => Blob
}

export function useDownloadFile<T extends Record<string, unknown>>({ fileName, format, data, onCreateBlob }: Props<T>) {
	const [blobUrl, setBlobUrl] = useState<string>('')

	useEffect(() => {
		if (!data) {
			return
		}

		const blob = getBlobData(data, format, onCreateBlob)
		const url = URL.createObjectURL(blob)
		setBlobUrl(url)

		return () => URL.revokeObjectURL(url)
	}, [data, format, onCreateBlob])

	const downloadFile = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			if (!blobUrl) {
				event.preventDefault()
				return
			}

			const anchor = event.currentTarget
			anchor.href = blobUrl
			anchor.download = fileName
		},
		[blobUrl, fileName],
	)

	const downloadLinkProps = {
		download: fileName,
		href: blobUrl,
	}

	return {
		downloadFile,
		downloadLinkProps,
	}
}
