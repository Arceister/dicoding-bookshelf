import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";
import { data } from "../../data/data";
import { returnResponse } from "./responseReturner";

type BookData = {
  id: string
  name: string
  publisher: string
}

const returnSuccessResponse = (h: ResponseToolkit, 
  queryParameter: string, 
  parameterData: string | number): Lifecycle.ReturnValue => {
  const responseMessage = {
    "status": "success",
    "data": {books: showAllBooksData(queryParameter, parameterData)}
  }
  return returnResponse(responseMessage, 200, h)
}

export const getAllBooksHandler = (request: Request, h: ResponseToolkit): Lifecycle.ReturnValue => {
  const { name, reading, finished } = request.query
  if (typeof name !== "undefined")
    return returnSuccessResponse(h, "name", name)
  if (typeof reading !== "undefined")
    return returnSuccessResponse(h, "reading", reading)
  if (typeof finished !== "undefined")
    return returnSuccessResponse(h, "finished", finished)
  
  return returnSuccessResponse(h, "none", "none")
}

const showAllBooksData = (queryParameter: string, parameterData: string | number): BookData[] => {
  if (data.length === 0) return []
  else {
    switch (queryParameter) {
      case "name":
        return getBooksDataWithIncludeNameSearch(parameterData as string)
      case "reading":
        return getBooksDataWithReadingSearch(parameterData as number)
      case "finished":
        return getBooksDataWithFinishedSearch(parameterData as number)
      default:
        return getBooksData()
    }
  }
}

const getBooksData = (): BookData[] => {
  const allBookDataToReturn: BookData[] = []
  for (let i = 0; i < data.length; i++) {
    allBookDataToReturn.push({
      "id": data[i].id,
      "name": data[i].name as string,
      "publisher": data[i].publisher
    })
  }
  return allBookDataToReturn
}

const getBooksDataWithIncludeNameSearch = (name: string): BookData[] => {
  const allBookDataToReturn: BookData[] = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].name?.toLowerCase().includes(name.toLowerCase()))
      allBookDataToReturn.push({
        "id": data[i].id,
        "name": data[i].name as string,
        "publisher": data[i].publisher
      })
  }
  return allBookDataToReturn
}

const getBooksDataWithReadingSearch = (choice: number): BookData[] => {
  const allBookDataToReturn: BookData[] = []
  const userChoiceToBoolean: boolean = (Number(choice) === 0) ? false : true
  if (userChoiceToBoolean)
    for (let i = 0; i < data.length; i++) {
      if (data[i].reading === userChoiceToBoolean)
        allBookDataToReturn.push({
          "id": data[i].id,
          "name": data[i].name as string,
          "publisher": data[i].publisher
        })
    }

  if (!userChoiceToBoolean)
    for (let i = 0; i < data.length; i++) {
      if (data[i].reading === userChoiceToBoolean)
        allBookDataToReturn.push({
          "id": data[i].id,
          "name": data[i].name as string,
          "publisher": data[i].publisher
        })
    }
  return allBookDataToReturn
}

const getBooksDataWithFinishedSearch = (choice: number): BookData[] => {
  const allBookDataToReturn: BookData[] = []
  const userChoiceToBoolean: boolean = (Number(choice) === 0) ? false : true
  if (userChoiceToBoolean)
    for (let i = 0; i < data.length; i++) {
      if (data[i].finished === userChoiceToBoolean)
        allBookDataToReturn.push({
          "id": data[i].id,
          "name": data[i].name as string,
          "publisher": data[i].publisher
        })
    }

  if (!userChoiceToBoolean)
    for (let i = 0; i < data.length; i++) {
      if (data[i].finished === userChoiceToBoolean)
        allBookDataToReturn.push({
          "id": data[i].id,
          "name": data[i].name as string,
          "publisher": data[i].publisher
        })
    }
  return allBookDataToReturn
}