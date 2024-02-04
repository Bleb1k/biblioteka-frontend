import { atom } from 'jotai'
import bookInfo from 'atoms/bookInfo'
import searchBooks from 'helpers/searchBooks'

export default atom((get) => searchBooks(get(bookInfo)))
