import { useAtom } from 'jotai'
import userList from 'atoms/userList'

export default function () {
  const [fetchedUserList] = useAtom(userList)
  console.log(fetchedUserList)

  return (
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Patronymic</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {fetchedUserList.map((user) => (
          <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.patronymic}</td>
            <td>{user.class}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
