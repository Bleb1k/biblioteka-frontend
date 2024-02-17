export default async function (token: string) {
  const data = await (
    await fetch(`http://127.0.0.1:1337/user/${token}`, {
      method: 'DELETE',
    })
  ).json()

  return data as {
    firstName: string
    lastName: string
    patronymic?: string
    class?: string
    token: string
  }
}
