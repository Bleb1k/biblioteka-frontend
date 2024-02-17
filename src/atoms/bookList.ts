import { atom } from 'jotai'
import bookSearchInfo from 'atoms/bookSearchInfo'
import searchBooks from 'helpers/searchBooks'

export default atom((get) => searchBooks(get(bookSearchInfo)))
