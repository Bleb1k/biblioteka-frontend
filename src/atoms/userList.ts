import { atom } from 'jotai'
import searchUsers from 'helpers/searchUsers'

export default atom(searchUsers({}))
