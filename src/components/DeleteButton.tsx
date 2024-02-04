import { useAtom } from 'jotai'
import deleteUser from 'helpers/deleteUser'
import userInfo from 'atoms/userInfo'
import userList from 'atoms/userList'

export default function () {
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
