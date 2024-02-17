import { atom } from 'jotai'
import recordSearchInfo from 'atoms/recordSearchInfo'
import searchRecords from 'helpers/searchRecords'

export default atom((get) => searchRecords(get(recordSearchInfo)))
