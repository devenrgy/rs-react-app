'use client'

import { useCallback } from 'react'

export type DownloadData<T> = T[] | string | BlobPart

type Props<T> = {
	fileName: string
	format: string
	data: DownloadData<T>
	onCreateBlob?: (data: DownloadData<T>, format: string) => Blob
}

export function useDownloadFile<T extends Record<string, unknown>>({ fileName, format, data }: Props<T>) {
	const downloadFile = useCallback(
		async () => {
			const blob = await fetch('/api/download-csv', { body: JSON.stringify({ data, format }), method: 'POST' }).then(res => res.blob())
			const blobUrl = URL.createObjectURL(blob)

			const anchor = document.createElement('a')
			anchor.href = blobUrl
			anchor.download = fileName
			anchor.click()

			return () => URL.revokeObjectURL(blobUrl)
		},
		[format, data],
	)

	const downloadLinkProps = {
		download: fileName,
	}

	return {
		downloadFile,
		downloadLinkProps,
	}
}
