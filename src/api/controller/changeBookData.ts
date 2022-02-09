import { Request, ResponseToolkit, Lifecycle } from "@hapi/hapi"
import { data } from "../../data/data"
import { BookTypeDefinition, UserPayload } from "../interface"
import { returnResponse } from "./responseReturner"

//Response

const returnSuccessResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }
  return returnResponse(responseMessage, 200, h)
}

const returnFailResponseBecauseNoName = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Gagal memperbarui buku. Mohon isi nama buku"
  }
  return returnResponse(responseMessage, 400, h)
}

const returnFailResponseBecauseWrongReadPage = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
  }
  return returnResponse(responseMessage, 400, h)
}

const returnNotFoundResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan"
  }
  return returnResponse(responseMessage, 404, h)
}

export const changeBookDataHandler = async (request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue> => {
  const payloadFromBody: UserPayload = request.payload as UserPayload
  const { bookId } = request.params
  const bookIdDataIndex = await searchForBookWithId(bookId)
  if (typeof payloadFromBody.name !== "string")  
    return returnFailResponseBecauseNoName(h)

  if (payloadFromBody.readPage > payloadFromBody.pageCount) 
    return returnFailResponseBecauseWrongReadPage(h)

  if (bookIdDataIndex === null)
    return returnNotFoundResponse(h)

  const updatedAt: string = new Date().toISOString()
  data[bookIdDataIndex] = changedPayload(payloadFromBody, data[bookIdDataIndex], updatedAt)
  return returnSuccessResponse(h)
}

const searchForBookWithId = (id: string): number | null => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return i
    }
  }
  return null
}

const changedPayload = (payload: UserPayload, 
  bookData: BookTypeDefinition,
  updatedAt: string): BookTypeDefinition => {
  bookData = {
    ...bookData,
    ...payload,
    "updatedAt": updatedAt
  }
  return bookData
}