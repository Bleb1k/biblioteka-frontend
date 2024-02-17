import { Suspense } from 'preact/compat'
import { useAtomValue } from 'jotai'
import DatePicker from 'components/DatePicker'
import bookChosen from 'atoms/bookChosen'
import userChosen from 'atoms/userChosen'

export default function () {
  const user = useAtomValue(userChosen)
  const book = useAtomValue(bookChosen)
  return (
    <Suspense fallback={<p />}>
      <div className="card w-96 bg-neutral text-neutral-content mx-auto mb-8">
        <div className="card-body">
          <h2 className="card-title">{`${book.name || 'Select the book'}${book.author ? ' by ' + book.author : ''}`}</h2>
          <p>{`${user.firstName || 'Select the user'} ${user.lastName || ''} ${user.patronymic || ''}`}</p>
          <p>
            <DatePicker />
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
