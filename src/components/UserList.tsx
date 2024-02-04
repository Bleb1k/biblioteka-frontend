import { Suspense } from 'preact/compat'
import { useAtom } from 'jotai'
import SearchField from 'components/SearchField'
import UserRow from 'components/User'
import filterOutValues from 'helpers/filterOutValues'
import newUser from 'helpers/newUser'
import userInfo from 'atoms/userInfo'
import userList from 'atoms/userList'

export default function () {
  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th children={<AddUser />} />
          <th children={<SearchField p="Name" d="firstName" />} />
          <th children={<SearchField p="Surname" d="lastName" />} />
          <th children={<SearchField p="Patronymic" d="patronymic" />} />
          <th children={<SearchField p="Class" d="class" />} />
        </tr>
      </thead>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
    </table>
  )
}

function AddUser() {
  const [, setUsrInf] = useAtom(userInfo)
  return (
    <button
      className="btn btn-xs"
      onClick={async (e) => {
        const getInput = (i: number) =>
          (e.currentTarget as HTMLElement).parentElement?.parentElement
            ?.children[i].firstChild as HTMLInputElement
        const user = Object.fromEntries(
          [1, 2, 3, 4].map((i) => {
            const input = getInput(i)
            const a = [
              input.attributes.getNamedItem('data')?.value,
              input.value,
            ]
            input.value = ''
            return a
          })
        )

        await newUser(user)
        setUsrInf(filterOutValues({}))
      }}
    >
      Add
    </button>
  )
}

function List() {
  const [userListData] = useAtom(userList)
  const filteredUserList = userListData.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic || '',
    class: user.class || '',
    token: user.token,
  }))

  // this is awful, i need to sleep ...

  return <tbody>{filteredUserList.map((user, id) => UserRow(id, user))}</tbody>
}
