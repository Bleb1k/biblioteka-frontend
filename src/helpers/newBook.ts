import { Book } from 'types/Book'

export default async function (bookInfo: Book) {
  const data = await (
    await fetch('http://127.0.0.1:1337/book/new', {
      method: 'POST',
      body: JSON.stringify(bookInfo),
    })
  ).json()

  return data as {
    name: string
    author?: string
    token: string
  }
}
