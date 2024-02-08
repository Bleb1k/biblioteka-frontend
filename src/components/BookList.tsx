import { Book } from 'types/Book'
import { Suspense } from 'preact/compat'
import { useAtom } from 'jotai'
import DeleteButton from 'components/DeleteButton'
import SearchField from 'components/SearchField'
import TextField from 'components/TextField'
import bookInfo from 'atoms/bookInfo'
import bookList from 'atoms/bookList'
import deleteBook from 'helpers/deleteBook'
import newBook from 'helpers/newBook'
import updateBook from 'helpers/updateBook'

export default function () {
  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th children={<AddBook />} />
          <th children={<SearchField p="Name" d="name" />} />
          <th children={<SearchField p="Author" d="author" />} />
        </tr>
      </thead>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
    </table>
  )
}

function List() {
  const [bookListData] = useAtom(bookList)
  const filteredBookList = bookListData.map((book) => ({
    name: book.name,
    author: book.author || '',
    token: book.token,
  }))
  return <tbody>{filteredBookList.map((book, id) => BookRow(id, book))}</tbody>
}

function BookRow(
  id: number,
  book: { name: string; author: string; token: string }
) {
  const { token } = book
  const [bookInf, setBookInf] = useAtom(bookInfo)
  const [bookLst] = useAtom(bookList)

  const getCellIndex = (e: Event) =>
    ((e.target as HTMLElement).parentElement as HTMLTableCellElement).cellIndex
  const getPlaceholder = ({ e, i }: { e: Event; i?: number }) =>
    (
      (e.currentTarget as HTMLElement).offsetParent?.children[0].children[0]
        .children[i || getCellIndex(e)].childNodes[0] as HTMLInputElement
    ).attributes.getNamedItem('data')?.value
  const val = ({ e, i }: { e: Event; i?: number }) =>
    i
      ? (
          (e.currentTarget as HTMLElement).childNodes[i]
            .childNodes[0] as HTMLInputElement
        ).value
      : (e.target as HTMLInputElement).value
  const key = ({ e, i }: { e: Event; i?: number }) =>
    getPlaceholder(i ? { e, i } : { e })

  return (
    <tr
      className="hover"
      onChange={async (e) => {
        const book: Book = Object.fromEntries(
          [1, 2].map((i) => [key({ e, i }), val({ e, i })])
        )
        await updateBook(token, book)
      }}
    >
      <td className="text-center">{id + 1}</td>
      <TextField p={book.name} />
      <TextField p={book.author} />
      <DeleteButton
        fn={async (e) => {
          await deleteBook(
            bookLst[
              Number(
                (
                  (e.currentTarget as HTMLElement).parentElement?.parentElement
                    ?.firstChild as HTMLElement
                ).textContent
              ) - 1
            ].token
          )
          setBookInf(bookInf)
        }}
      />
    </tr>
  )
}

function AddBook() {
  const [, setBookInf] = useAtom(bookInfo)
  return (
    <button
      className="btn btn-xs"
      onClick={async (e) => {
        const getInput = (i: number) =>
          (e.currentTarget as HTMLElement).parentElement?.parentElement
            ?.children[i].firstChild as HTMLInputElement
        const user = Object.fromEntries(
          [1, 2].map((i) => {
            const input = getInput(i)
            const a = [
              input.attributes.getNamedItem('data')?.value,
              input.value,
            ]
            input.value = ''
            return a
          })
        )

        await newBook(user)
        setBookInf({})
      }}
    >
      Add
    </button>
  )
}
