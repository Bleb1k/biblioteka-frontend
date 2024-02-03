import { atom } from 'jotai'
import searchUsers from 'helpers/searchUsers'
import userInfo from 'atoms/userInfo'

export default atom((get) => searchUsers(get(userInfo)))
