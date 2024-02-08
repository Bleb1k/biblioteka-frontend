import { User } from 'types/User'
import { useAtom } from 'jotai'
import DeleteButton from 'components/DeleteButton'
import TextField from 'components/TextField'
import bookSearchInfo from 'atoms/userSearchInfo'
import deleteUser from 'helpers/deleteUser'
import updateUser from 'helpers/updateUser'
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
  const [usrInf, setUsrInf] = useAtom(bookSearchInfo)
  const [usrLst] = useAtom(userList)

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
      <DeleteButton
        fn={async (e) => {
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
      />
    </tr>
  )
}
