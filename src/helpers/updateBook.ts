import { Book } from 'types/Book'

export default async function (token: string, bookInfo: Book) {
  const data = await (
    await fetch(`http://127.0.0.1:1337/book/${token}`, {
      method: 'PUT',
      body: JSON.stringify(bookInfo),
    })
  ).json()

  return data as {
    name: string
    author?: string
    token: string
  }
}
