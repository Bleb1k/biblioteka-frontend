import { User } from 'types/User'
import { useAtom } from 'jotai'
import deleteUser from 'helpers/deleteUser'
import updateUser from 'helpers/updateUser'
import userInfo from 'atoms/userInfo'
import userList from 'atoms/userList'

export default function UserRow(
  id: number,
  user: {
    firstName: string
    lastName: string
    patronymic: string
    class: string
    token: string
  }
) {
  const { token } = user
  // const getUserId = (e: Event) =>
  //   Number((e.currentTarget as HTMLElement).firstElementChild?.textContent) - 1
  // const getUser = (e: Event) => filteredUserList[getUserId(e)] as User
  const getCellIndex = (e: Event) =>
    ((e.target as HTMLElement).parentElement as HTMLTableCellElement).cellIndex
  const getPlaceholder = ({ e, i }: { e: Event; i?: number }) =>
    (
      (e.currentTarget as HTMLElement).offsetParent?.children[0].children[0]
        .children[i || getCellIndex(e)].childNodes[0] as HTMLInputElement
    ).attributes.getNamedItem('data')?.value

  const key = ({ e, i }: { e: Event; i?: number }) =>
    getPlaceholder(i ? { e, i } : { e })
  const val = ({ e, i }: { e: Event; i?: number }) =>
    i
      ? (
          (e.currentTarget as HTMLElement).childNodes[i]
            .childNodes[0] as HTMLInputElement
        ).value
      : (e.target as HTMLInputElement).value

  return (
    <tr
      className="hover"
      onChange={async (e) => {
        const user: User = Object.fromEntries(
          [1, 2, 3, 4].map((i) => [key({ e, i }), val({ e, i })])
        )
        await updateUser(token, user)
      }}
    >
      <td className="text-center">{id + 1}</td>
      <TextField p={user.firstName} />
      <TextField p={user.lastName} />
      <TextField p={user.patronymic} />
      <TextField p={user.class} />
      <DeleteButton />
    </tr>
  )
}

function DeleteButton() {
  const [usrInf, setUsrInf] = useAtom(userInfo)
  const [usrLst] = useAtom(userList)
  return (
    <td>
      <button
        className="btn btn-ghost btn-xs h-min"
        onClick={async (e) => {
          await deleteUser(
            usrLst[
              Number(
                (
                  (e.currentTarget as HTMLElement).parentElement?.parentElement
                    ?.firstChild as HTMLElement
                ).textContent
              ) - 1
            ].token
          )
          setUsrInf({ ...usrInf })
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 12L12 4M4 4l8 8"
          />
        </svg>
      </button>
    </td>
  )
}

function TextField({ p = '' }: { p?: string }) {
  return (
    <td className="min-w-fit">
      <input
        type="text"
        defaultValue={p}
        className={'input input-xs w-full max-w-xs bg-transparent '}
      />
    </td>
  )
}
