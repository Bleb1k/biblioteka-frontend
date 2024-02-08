import { atom } from 'jotai'
import bookSearchInfo from 'atoms/userSearchInfo'
import searchUsers from 'helpers/searchUsers'

export default atom((get) => searchUsers(get(bookSearchInfo)))
