export type BookTypeDefinition = {
  id: string
  name?: string | null
  year: number
  author: string
  summary: string
  publisher: string
  pageCount: number
  readPage: number
  finished: boolean
  reading: boolean
  insertedAt: string
  updatedAt: string
}

export type UserPayload = {
  name?: string | null
  year: number
  author: string
  summary: string
  publisher: string
  pageCount: number
  readPage: number
  reading: boolean
}