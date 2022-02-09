import { postBookshelfHandler } from "../controller/insertBook"
import { getAllBooksHandler } from "../controller/getAllBooks"
import { getSpecificBookHandler } from "../controller/getSpecificBook"
import { changeBookDataHandler } from "../controller/changeBookData"
import { deleteSpecificBookHandler } from "../controller/deleteSpecificBook"

export const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  }, 
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getSpecificBookHandler
  }, 
  {
    method: 'POST',
    path: '/books',
    handler: postBookshelfHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: changeBookDataHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteSpecificBookHandler
  }
]