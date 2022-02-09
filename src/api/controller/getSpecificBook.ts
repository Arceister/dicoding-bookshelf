import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";
import { data } from "../../data/data";
import { BookTypeDefinition } from "../interface";
import { returnResponse } from "./responseReturner";

//Responses

const returnSuccessResponse = (bookData: BookTypeDefinition, h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: 'success',
    data: {
      book: bookData
    }
  }
  return returnResponse(responseMessage, 200, h)
}

const returnNotFoundResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Buku tidak ditemukan"
  }
  return returnResponse(responseMessage, 404, h)
}

export const getSpecificBookHandler = async (request: Request, h: ResponseToolkit) => {
  const { bookId } = request.params
  const bookSearchById = await searchForBookWithId(bookId)

  if (bookSearchById !== null)
    return returnSuccessResponse(bookSearchById, h)
  return returnNotFoundResponse(h)
}

const searchForBookWithId = (id: string): BookTypeDefinition | null => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i]
    }
  }
  return null
}

