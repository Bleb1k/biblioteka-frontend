import { Book } from 'types/Book'
import { User } from 'types/User'

export default async function (recordInfo: {
  userToken: string
  bookToken: string
  returnDate: string
  retrievalDate?: string
}) {
  const data = await (
    await fetch('http://127.0.0.1:1337/reecord/new', {
      method: 'POST',
      body: JSON.stringify(recordInfo),
    })
  ).json()

  return data as {
    user: User
    book: Book
    returnDate: string
    retrievalDate?: string
    token: string
  }
}
