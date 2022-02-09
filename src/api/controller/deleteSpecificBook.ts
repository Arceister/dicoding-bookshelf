import { Request, Lifecycle, ResponseToolkit } from "@hapi/hapi"
import { data } from "../../data/data"
import { returnResponse } from "./responseReturner"

//Responses

const returnSuccessResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: 'success',
    message: 'Buku berhasil dihapus',
  }
  return returnResponse(responseMessage, 200, h)
}

const returnNotFoundResponse = (h: ResponseToolkit): Lifecycle.ReturnValue => {
  const responseMessage = {
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan"
  }
  return returnResponse(responseMessage, 404, h)
}

export const deleteSpecificBookHandler = async (request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValue> => {
  const { bookId } = request.params
  const bookIdIndex = await searchForBookWithId(bookId)
  if (bookIdIndex === null)
    return returnNotFoundResponse(h)
  
  await deleteBookData(bookIdIndex)
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

const deleteBookData = (bookIndex: number): void => {
  data.splice(bookIndex, 1)
}