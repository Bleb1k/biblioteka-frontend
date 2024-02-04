import { User } from 'types/User'

export default async function (token: string, userInfo: User) {
  const data = await (
    await fetch(`http://127.0.0.1:1337/user/${token}`, {
      method: 'PUT',
      body: JSON.stringify(userInfo),
    })
  ).json()

  return data as {
    name: string
    author?: string
    token: string
  }
}
