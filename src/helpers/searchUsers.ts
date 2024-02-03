import { User } from 'types/User'

export default async function (userInfo: User) {
  console.log(userInfo)
  const data = await (
    await fetch(
      'http://127.0.0.1:1337/user/search?' +
        new URLSearchParams(userInfo).toString(),
      {
        method: 'GET',
      }
    )
  ).json()

  return data as {
    firstName: string
    lastName: string
    patronymic?: string
    class?: string
    token: string
  }[]
}
