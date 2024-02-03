import { Suspense } from 'preact/compat'
import { User } from 'types/User'
import { useAtom } from 'jotai'
import UserComp from 'components/User'
import userInfo from 'atoms/userInfo'
import userList from 'atoms/userList'

export default function () {
  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>
            <SearchField placeholder="firstName" />
          </th>
          <th>
            <SearchField placeholder="lastName" />
          </th>
          <th>
            <SearchField placeholder="patronymic" />
          </th>
          <th>
            <SearchField placeholder="class" />
          </th>
        </tr>
      </thead>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
    </table>
  )
}

function List() {
  const [userListData] = useAtom(userList)
  const filteredUserList = userListData.map((user) => {
    // eslint-disable-next-line prefer-const
    let { firstName, lastName, patronymic, class: userClass } = user
    patronymic = patronymic || ''
    userClass = userClass || ''
    return {
      firstName,
      lastName,
      patronymic,
      class: userClass,
    }
  })
  return <tbody>{filteredUserList.map((user, id) => UserComp(id, user))}</tbody>
}

function SearchField({ placeholder }: { placeholder: keyof User }) {
  let timing: number = 0
  const [usrInf, setUsrInf] = useAtom(userInfo)

  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-xs w-full max-w-xs"
      onInput={(e) => {
        timing = e.timeStamp
        setTimeout(() => {
          if (timing != e.timeStamp) return ''
          const { placeholder, value } = e.target as HTMLInputElement

          setUsrInf({ ...usrInf, [placeholder]: value })
        }, 300)
      }}
    />
  )
}
