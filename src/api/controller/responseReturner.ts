import { Lifecycle, ResponseToolkit } from "@hapi/hapi"

export const returnResponse = (responseMessage: object, 
  statusCode: number, 
  h: ResponseToolkit): Lifecycle.ReturnValue => {
  const response = h.response(responseMessage)
  response.code(statusCode)
  return response
}