import { getBlobData } from '@/shared/lib/get-blob-data'

export const POST = async (req: Request) => {
	const res = await req.json() as { data: [] | string | BlobPart, format: string } | null

	if (!res) {
		throw new Response(null, {
			status: 400,
		})
	}

	const blob = getBlobData(res.data, res.format)

	return new Response(blob)
}
