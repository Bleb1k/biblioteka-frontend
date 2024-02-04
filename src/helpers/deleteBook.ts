export default async function (token: string) {
  const data = await (
    await fetch(`http://127.0.0.1:1337/book/${token}`, {
      method: 'DELETE',
    })
  ).json()

  return data as {
    name: string
    author?: string
    token: string
  }
}
