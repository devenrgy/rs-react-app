import { http } from '@/shared/api'

export const getPhotoById = async ({ id }: { id: string }) => http('/photos/:id', { params: { id } })
