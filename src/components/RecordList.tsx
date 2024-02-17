import { Suspense } from 'preact/compat'
import { useAtom } from 'jotai'
// import DeleteButton from 'components/DeleteButton'
import SearchField from 'components/SearchField'
// import TextField from 'components/TextField'
// import deleteRecord from 'helpers/deleteRecord'
// import newRecord from 'helpers/newRecord'
import { Record } from 'types/Record'
import recordList from 'atoms/recordList'
// import recordSearchInfo from 'atoms/recordSearchInfo'
import updateRecord from 'helpers/updateRecord'
// import updateRecord from 'helpers/updateRecord'

export default function () {
  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th children={<SearchField p="User" d="user" />} />
          <th children={<SearchField p="Book" d="book" />} />
          <th children={<SearchField p="LendDate" d="book" />} />
          <th children={<SearchField p="TimeToReturn" d="book" />} />
        </tr>
      </thead>
      <Suspense fallback={<p>Loading...</p>}>
        <List />
      </Suspense>
    </table>
  )
}

function List() {
  const [recordListData] = useAtom(recordList)
  const filteredRecordList = recordListData.map((record) => ({
    userToken: record.user.token || '',
    bookToken: record.book.token || '',
    returnDate: record.returnDate,
    retrievalDate: record.retrievalDate || '',
    token: record.token,
  }))
  return (
    <tbody>
      {filteredRecordList.map((record, id) => RecordRow(id, record))}
    </tbody>
  )
}

function RecordRow(
  id: number,
  book: {
    userToken: string
    bookToken: string
    returnDate: string
    retrievalDate: string
    token: string
  }
) {
  const { token } = book
  // const [recInf, setRecInf] = useAtom(recordSearchInfo)
  // const [recLst] = useAtom(recordList)

  // const getCellIndex = (e: Event) =>
  //   ((e.target as HTMLElement).parentElement as HTMLTableCellElement).cellIndex
  // const getPlaceholder = ({ e, i }: { e: Event; i?: number }) =>
  //   (
  //     (e.currentTarget as HTMLElement).offsetParent?.children[0].children[0]
  //       .children[i || getCellIndex(e)].childNodes[0] as HTMLInputElement
  //   ).attributes.getNamedItem('data')?.value
  // const val = ({ e, i }: { e: Event; i?: number }) =>
  //   i
  //     ? (
  //         (e.currentTarget as HTMLElement).childNodes[i]
  //           .childNodes[0] as HTMLInputElement
  //       ).value
  //     : (e.target as HTMLInputElement).value
  // const key = ({ e, i }: { e: Event; i?: number }) =>
  //   getPlaceholder(i ? { e, i } : { e })

  return (
    <tr
      className="hover"
      onChange={
        async (/*e*/) => {
          const record: Record = Object.fromEntries(
            [1, 2].map((/*i*/) => []) //[key({ e, i }), val({ e, i })])
          )
          await updateRecord(token, record)
        }
      }
    >
      <td className="text-center">{id + 1}</td>
      {/* <TextField p={} />
      <TextField p={book.author} />
      <DeleteButton
        fn={async (e) => {
          await deleteRecord(
            recLst[
              Number(
                (
                  (e.currentTarget as HTMLElement).parentElement?.parentElement
                    ?.firstChild as HTMLElement
                ).textContent
              ) - 1
            ].token
          )
          setRecInf(recInf)
        }}
      /> */}
    </tr>
  )
}
