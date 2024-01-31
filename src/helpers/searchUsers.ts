export default async function (userInfo: {
  token?: string
  firstName?: string
  lastName?: string
  patronymic?: string
  class?: string
}) {
  let data = await (
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
