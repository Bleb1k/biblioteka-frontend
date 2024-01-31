export default async function (userInfo: {
  firstName: string
  lastName: string
  patronymic?: string
  class?: string
}) {
  let data = await (
    await fetch('http://127.0.0.1:1337/user/new', {
      method: 'POST',
      body: JSON.stringify(userInfo),
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
