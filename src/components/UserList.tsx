import { Suspense } from 'preact/compat'
import { User } from 'types/User'
import { useAtom } from 'jotai'
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

function SearchField({
  p: placeholder,
  d: data,
}: {
  p?: string
  d?: keyof User
}) {
  let timing: number = 0
  const [usrInf, setUsrInf] = useAtom(userInfo)

  return (
    <input
      type="text"
      placeholder={placeholder}
      data={data}
      className="input input-xs w-full max-w-xs"
      onInput={(e) => {
        timing = e.timeStamp
        setTimeout(() => {
          if (timing != e.timeStamp) return ''
          const { value } = e.target as HTMLInputElement

          setUsrInf(filterOutValues({ ...usrInf, [data as string]: value }))
        }, 300)
      }}
    />
  )
}
