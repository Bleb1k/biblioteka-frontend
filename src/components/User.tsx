export default function UserComp(
  id: number,
  user: {
    firstName: string
    lastName: string
    patronymic: string
    class: string
  }
) {
  return (
    <tr className="hover">
      <td>{id + 1}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.patronymic}</td>
      <td>{user.class}</td>
    </tr>
  )
}
