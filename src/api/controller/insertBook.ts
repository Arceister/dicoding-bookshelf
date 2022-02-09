import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi"
import { nanoid } from "nanoid"
import { data } from "../../data/data"
import { BookTypeDefinition, UserPayload } from "../interface"
import { returnResponse } from "./responseReturner"

//Responses

const returnSuccessResponse = (bookId: string, h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: bookId
    }
  }
  return returnResponse(responseMessage, 201, h)
}

const returnFailResponseBecauseNoName = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Gagal menambahkan buku. Mohon isi nama buku"
  }
  return returnResponse(responseMessage, 400, h)
}

const returnFailResponseBecauseWrongReadPage = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
  }
  return returnResponse(responseMessage, 400, h)
}

const returnGenericFailResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "error",
    message: "Buku gagal ditambahkan"
  }
  return returnResponse(responseMessage, 500, h)
}

// Bookshelf Handler for POST Request

export const postBookshelfHandler = async(request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue> => {
  const payloadFromBody: UserPayload = request.payload as UserPayload
  if (typeof payloadFromBody.name !== "string")  
    return returnFailResponseBecauseNoName(h)

  if (payloadFromBody.readPage > payloadFromBody.pageCount) 
    return returnFailResponseBecauseWrongReadPage(h)

  const [id, insertedAt, updatedAt] = insertIdAndDateToPayload()

  const payloadToServer: BookTypeDefinition = await generatePayloadToPost(payloadFromBody, id, insertedAt, updatedAt)
  await pushPayloadToServer(payloadToServer)

  if (checkDataAndPayload(payloadToServer))
    return returnSuccessResponse(id, h)
  return returnGenericFailResponse(h)  
}

//Misc Functions

const insertIdAndDateToPayload = (): string[] => {
  const id: string = nanoid(16)
  const insertedAt: string = new Date().toISOString()
  const updatedAt: string = insertedAt

  return [id, insertedAt, updatedAt]
}

const generatePayloadToPost = (payload: UserPayload, 
  id: string, 
  insertedAt: string, 
  updatedAt: string): BookTypeDefinition => {
  const payloadToPostToServer: BookTypeDefinition = {
    id: id,
    name: payload.name as string,
    year: payload.year,
    author: payload.author,
    summary: payload.summary,
    publisher: payload.publisher,
    pageCount: payload.pageCount,
    readPage: payload.readPage,
    finished: payload.pageCount === payload.readPage,
    reading: payload.reading,
    insertedAt: insertedAt,
    updatedAt: updatedAt
  }

  return payloadToPostToServer
}

const pushPayloadToServer = (payload: BookTypeDefinition): void => {
  data.push(payload)
}

const checkDataAndPayload = (payload: BookTypeDefinition): boolean => {
  return payload === data.slice(-1)[0]
}