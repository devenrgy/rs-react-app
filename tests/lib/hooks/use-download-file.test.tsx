import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import { useDownloadFile } from '@/lib/hooks/use-download-file'
import * as getBlobData from '@/lib/utils/get-blob-data'

const mockBlob = new Blob(['test data'], { type: 'text/csv' })
const mockFileName = 'test-file'
const mockFormat = 'text/csv'
const mockData = [{ id: 1, name: 'Test' }]
const mockEvent = {
	currentTarget: {
		href: '',
		download: ''
	},
	preventDefault: vi.fn()
} as unknown as React.MouseEvent<HTMLAnchorElement>

describe('useDownloadFile', () => {
	const getBlobDataMock = vi.spyOn(getBlobData, 'getBlobData').mockImplementation(() => mockBlob)
	const createObjectURLMock = vi.spyOn(URL, 'createObjectURL').mockReturnValue('mock-url')
	const revokeObjectURLMock = vi.spyOn(URL, 'revokeObjectURL').mockReturnValue()

	it('should generate blob URL when data is provided', async () => {
		const { result } = renderHook(() =>
			useDownloadFile({
				fileName: mockFileName,
				format: mockFormat,
				data: mockData
			})
		)

		await waitFor(() => {
			expect(getBlobDataMock).toHaveBeenCalledWith(mockData, mockFormat, undefined)
		})

		expect(createObjectURLMock).toHaveBeenCalledWith(mockBlob)
		expect(result.current.downloadLinkProps.href).toBe('mock-url')
	})

	it('should set download attributes when downloadFile is called', async () => {
		const { result } = renderHook(() =>
			useDownloadFile({
				fileName: mockFileName,
				format: mockFormat,
				data: mockData
			})
		)

		await waitFor(() => {
			result.current.downloadFile(mockEvent)

			expect(mockEvent.currentTarget.href).toBe('mock-url')
		})

		expect(mockEvent.currentTarget.download).toBe(mockFileName)
		expect(mockEvent.preventDefault).not.toHaveBeenCalled()
	})

	it('should revoke URL on unmount', async () => {
		const { unmount } = renderHook(() =>
			useDownloadFile({
				fileName: mockFileName,
				format: mockFormat,
				data: mockData
			})
		)

		await waitFor(() => {
			expect(createObjectURLMock).toHaveBeenCalled()
		})

		unmount()
		expect(revokeObjectURLMock).toHaveBeenCalledWith('mock-url')
	})
})
