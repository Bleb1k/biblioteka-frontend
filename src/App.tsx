import { Suspense } from 'preact/compat'
import UserList from 'components/UserList'

export default function () {
  return (
    <div className="container mx-auto max-w-prose p-10 prose">
      <h1>Frontend template</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UserList />
      </Suspense>
    </div>
  )
}
