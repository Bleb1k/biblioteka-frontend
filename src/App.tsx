import { Route, Router } from 'preact-router'
import { Suspense } from 'preact/compat'
import BookList from 'components/BookList'
import Navbar from 'components/Navbar'
import UserList from 'components/UserList'

export default function () {
  return (
    <div>
      <Navbar />
      <div className="container max-w-2xl mx-auto p-10">
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Route path="/users" component={UserList} />
            <Route path="/records" component={UserList} />
            <Route path="/books" component={BookList} />
          </Router>
        </Suspense>
      </div>
    </div>
  )
}
